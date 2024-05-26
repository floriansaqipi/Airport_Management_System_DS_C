

import TicketCard from "./TicketCard";


import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";


const TicketGrid = ({ tickets }) => {

  const ticketsList = tickets.map((ticket, index) => (
    <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
      
        <TicketCard key={ticket.ticketId} ticket={ticket} />
      
    </Grid>
  ));


  return (
    <Container className="home" maxWidth="xl">

      <Box sx={{ flexGrow: 1 }}  my={4}  >
        <Grid
          container
          spacing={{ xs: 2, md: 3 , lg: 6}}
        >
          {ticketsList}
        </Grid>
      </Box>
    </Container>
  );
};

export default TicketGrid;
