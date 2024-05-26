import { useState, Fragment } from "react";

import TicketGrid from "./TicketGrid";

const DUMMY_TICKETS = [
  {
    ticketId: 1,
    seatNumber: "23",
    _class: "Economy",
    price: 220.0,
    passenger: null,
    flight: {
      flightId: 1,
      flightNumber: "1234",
      departureTime: "2024-05-01T00:06:43",
      arrivalTime: "2024-05-01T00:06:43",
    },
    boardingPass: {
      boardingPassId: 3,
      gate: "24F",
      boardingTime: "2024-01-01T12:52:11",
    },
  },
  {
    ticketId: 2,
    seatNumber: "28",
    _class: "Bussiness",
    price: 250.0,
    passenger: null,
    flight: {
      flightId: 1,
      flightNumber: "1234",
      departureTime: "2024-05-01T00:06:43",
      arrivalTime: "2024-05-01T00:06:43",
    },
    boardingPass: {
      boardingPassId: 5,
      gate: "24F",
      boardingTime: "2024-01-01T12:52:11",
    },
  },
  {
    ticketId: 4,
    seatNumber: "28",
    _class: "Economy",
    price: 505.23,
    passenger: null,
    flight: {
      flightId: 1,
      flightNumber: "1234",
      departureTime: "2024-05-01T00:06:43",
      arrivalTime: "2024-05-01T00:06:43",
    },
    boardingPass: {
      boardingPassId: 2,
      gate: "3A",
      boardingTime: "2024-01-01T12:52:11",
    },
  },
  {
    ticketId: 5,
    seatNumber: "2",
    _class: "First",
    price: 505.23,
    passenger: {
      passengerId: 10,
      name: "John Doe",
      passportNumber: "A12345678",
      nationality: "American",
      contactDetails: "johndoe@example.com",
    },
    flight: {
      flightId: 1,
      flightNumber: "1234",
      departureTime: "2024-05-01T00:06:43",
      arrivalTime: "2024-05-01T00:06:43",
    },
    boardingPass: {
      boardingPassId: 7,
      gate: "24F",
      boardingTime: "2024-01-01T12:52:11",
    },
  },
];

const Tickets = () => {
  const [tickets, setTickets] = useState(DUMMY_TICKETS);

  return (
    <Fragment>
      <TicketGrid tickets={tickets} />
    </Fragment>
  );
};

export default Tickets;
