import React from "react";
import TicketCard from "./TicketCard";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import AddTicketCard from "./AddTicketCard";
import { useRouteLoaderData } from "react-router-dom";

const TicketGrid = ({ tickets, onAdd, onEdit }) => {
  const ticketsList = tickets.map((ticket, index) => (
    <Grid item xs={12} sm={12} md={6} lg={4} key={ticket.ticketId}>
      <TicketCard ticket={ticket} onEdit={onEdit} />
    </Grid>
  ));
  const auth = useRouteLoaderData("root");
  const lastIndex = tickets.length;
  if (tickets.length >= 0 && auth && auth.role !== "PASSENGER") {
    ticketsList[lastIndex] = (
      <>
        {ticketsList[lastIndex]}
        <Grid key={crypto.randomUUID()} item xs={12} sm={12} md={6} lg={4}>
          <AddTicketCard onAdd={onAdd} />
        </Grid>
      </>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1 }} my={4}>
        <Grid container spacing={{ xs: 2, md: 3, lg: 6 }}>
          {ticketsList}
        </Grid>
      </Box>
    </Container>
  );
};

export default TicketGrid;
