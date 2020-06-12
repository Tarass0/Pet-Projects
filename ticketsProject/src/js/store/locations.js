import api from "../services/apiService";
import { formatDate } from "../helpers/date";

class Locations {
  constructor(api,helpers) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null
    this.airlines = null
    this.lastSearch = null
    this.formatDate = helpers.formatDate;
  }
  async init() {
    let response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);

    let [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortList(this.cities);
    this.airlines = this.serializeAirlines(airlines);
    return response;
  }

  getCityCodeByKey(inputValue) {
    let city = Object.values(this.cities).find((item) => {
      return item.full_name === inputValue;
    });
    return city.code;
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : "";
  }

  getAirlineLogoByCode(code) {
    return this.airlines[code] ? this.airlines[code].logo : "";
  }

  createShortList(cities) {
    //{'City,Country': null}
    // Object.entries => [key,value]
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.full_name] = null;
      return acc;
    }, {});
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, airline) => {
      airline.logo = `http://pics.avs.io/200/200/${airline.code}.png`;
      airline.name = airline.name || airline.name_translations.en;
      acc[airline.code] = airline;
      return acc;
    }, {});
  }

  serializeCountries(countries) {
    //{'Country code': {...}}
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  serializeCities(cities) {
    //{'City name, Country name': {...}}
    return cities.reduce((acc, city) => {
      let country_name = this.getCountryNameByCode(city.country_code);
      city.name = city.name || city.name_translations.en;
      let full_name = `${city.name},${country_name}`;
      acc[city.code] = {
        ...city,
        country_name,
        full_name,
      };
      return acc;
    }, {});
  }

  getCountryNameByCode(code) {
    //{'Country code': {...}}
    return this.countries[code].name;
  }

  async fetchTickets(params) {
    let response = await this.api.prices(params);
    console.log(response.data);
    this.lastSearch = this.serializeTickets(response.data);
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map((ticket) => {
      return {
        ...ticket,
        origin_name: this.getCityNameByCode(ticket.origin),
        destination_name: this.getCityNameByCode(ticket.destination),
        airline_logo: this.getAirlineLogoByCode(ticket.airline),
        airline_name: this.getAirlineNameByCode(ticket.airline),
        departure_at: this.formatDate(ticket.departure_at,'dd MMM yyyy hh:mm '),
        return_at: this.formatDate(ticket.return_at,'dd MMM yyyy hh:mm '),
      };
    });
  }
}

let locations = new Locations(api, { formatDate });

export default locations;
