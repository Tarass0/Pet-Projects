import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import currencyUI from "./views/currency";
import favouriteTickets from "./store/tickets";
import favouriteTicketsUI from "./views/favouriteTickets";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  let form = formUI.form;

  let ticketContainer = ticketsUI.container;

  let favoriteTicketsConatiner = favouriteTicketsUI.containerFavouriteTickets;

  // Events
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  ticketContainer.addEventListener("click", ({ target }) => {
    if (!favouriteTickets.getTicketContainer(target)) return;
    let ticketContainer = favouriteTickets.getTicketContainer(target);
    let objFavouriteTicket = favouriteTickets.getObjectTicket(target);
    favouriteTicketsUI.renderFavouriteTicket(
      objFavouriteTicket,
      ticketContainer
    );
  });

  favoriteTicketsConatiner.addEventListener("click", ({ target }) => {
    if(!favouriteTicketsUI.deletefavoriteTicketFromHTML(target)) return;
    favouriteTicketsUI.deletefavoriteTicketFromHTML(target);
    favouriteTicketsUI.deleteObjfavoriteTicket(target);
    // console.log(favouriteTickets.favouriteTickets);
  });

  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    //зібрати данні з input
    let origin = locations.getCityCodeByKey(formUI.originValue);
    let destination = locations.getCityCodeByKey(formUI.destinationValue);
    let depart_date = formUI.departDateValue;
    let return_date = formUI.returnDateValue;
    let currency = currencyUI.currencyValue;
    //CODE, CODE, 2019-09, 2019-10
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });
    ticketsUI.renderTickets(locations.lastSearch);
    console.log(locations.lastSearch);
  }
});
