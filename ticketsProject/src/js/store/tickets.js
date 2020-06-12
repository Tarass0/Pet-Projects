import locations from "../store/locations";

class FavouriteTickets {
  constructor() {
      this.favouriteTickets = [];
  }

  getIdentificatorTicket(el) {
    let ticket = this.getTicketContainer(el);
    
    let ticketIdentifikator = ticket.dataset.expires_at;
    
    return ticketIdentifikator;
  }

  getTicketContainer(el){
    let isFavouriteTicketBth = el.classList.contains("add-favorite");
    if (!isFavouriteTicketBth) return;

    let ticket = el.closest(".ticket-card");

    return ticket;
  }

  getObjectTicket(el) {
    let ticketIdentifikator = this.getIdentificatorTicket(el);
    let tickets = locations.lastSearch;
    
    let favouriteTicket = tickets.find(
      (ticket) => ticket.expires_at === ticketIdentifikator
    );

    if(!favouriteTicket.favorite){
      this.favouriteTickets.push(favouriteTicket);
    }
    console.log(this.favouriteTickets);
    
    return favouriteTicket;
  }

}

let favouriteTickets = new FavouriteTickets();

export default favouriteTickets;
