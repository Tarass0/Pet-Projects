import currencyUI from "./currency";
import favouriteTickets from "../store/tickets";

class FavouriteTicketsUI {
  constructor(currency) {
    this.containerFavouriteTickets = document.querySelector(
      ".favorites .dropdown-content"
    );
    this.getСurrencySymbol = currency.getСurrencySymbol.bind(currency);
  }

  deletefavoriteTicketFromHTML(el) {
    let isFavouriteTicketBth = el.classList.contains("delete-favorite");
    if (!isFavouriteTicketBth) return;

    let ticket = el.closest(".favorite-item");

    ticket.remove();

    let ticketIdentificator = ticket.dataset.expires_at;
    return ticketIdentificator;
  }

  deleteObjfavoriteTicket(el){
    let objIdentificator = this.deletefavoriteTicketFromHTML(el);
     let ticketsFromStoreFavouriteTickets = favouriteTickets.favouriteTickets;
    let favouriteTicket = ticketsFromStoreFavouriteTickets.find(
      (ticket) => ticket.expires_at === objIdentificator
    );
    let indexTicket = ticketsFromStoreFavouriteTickets.indexOf(favouriteTicket);
    ticketsFromStoreFavouriteTickets.splice(indexTicket, 1);

    // console.log('---------------');
    // console.log(favouriteTicket);
    delete favouriteTicket.favorite;
    // console.log(favouriteTicket);
  }

  renderFavouriteTicket(ticket, ticketContainer) {
    let currency = this.getСurrencySymbol();
    console.log(ticket);

    if (!ticket.favorite) {
      let template = FavouriteTicketsUI.favouriTicketTemplate(ticket, currency);
      this.containerFavouriteTickets.insertAdjacentHTML("afterbegin", template);
      ticket.favorite = true;
    } else {
      let templateMsg = FavouriteTicketsUI.showMsgTicketAlreadyAdded();
      ticketContainer.insertAdjacentHTML("afterbegin", templateMsg);
      (function () {
        setTimeout(() => {
          ticketContainer.firstChild.remove();
        }, 3000);
      })();
    }
  }

  static showMsgTicketAlreadyAdded() {
    return `<div class="ticke-already-added">Ваш квиток вже був доданий до розідлу "FAVORITES"</div>`;
  }

  static favouriTicketTemplate(ticket, currency) {
    return `
    <div class="favorite-item  d-flex align-items-start" data-expires_at = "${ticket.expires_at}">
      <img src="${ticket.airline_logo}" class="favorite-item-airline-img" />
      <div class="favorite-item-info d-flex flex-column">
        <div class="favorite-item-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="favorite-item-city">${ticket.origin_name} </span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="favorite-item-city">${ticket.destination_name}</span>
        </div>
      </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div> 
        <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</a>
      </div>
    </div>
    `;
  }
}

const favouriteTicketsUI = new FavouriteTicketsUI(currencyUI);

export default favouriteTicketsUI;
