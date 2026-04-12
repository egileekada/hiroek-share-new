export interface IPayment {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    event: string,
    amount: any
  }

  export interface IEventPayment {
    eventId: string,
    ticketTypeId: string,
    numberOfTickets: number,
    amount: any
  }
  