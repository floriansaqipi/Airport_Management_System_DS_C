import React, { useEffect, useState } from 'react';
import styles from "./TicketCard.module.css";
import FlightIcon from "@mui/icons-material/Flight";
import logo from "../../assets/logo.png";
import Grid from "@mui/material/Grid";
import dateFormatter from "../../util/dateFormatter";
import QRCode from "react-qr-code";
import { useRouteLoaderData } from 'react-router-dom';

const TicketCard = ({ ticket, onEdit }) => {
  const auth = useRouteLoaderData("root");
  const [currentTicket, setCurrentTicket] = useState(ticket);

  const departureTime = dateFormatter(currentTicket?.flight?.departureTime);
  const arrivalTime = dateFormatter(currentTicket?.flight?.arrivalTime);

  const handleCardClick = () => {
    if (auth && auth.role == "PASSENGER") {
      return;
    }
    onEdit(ticket);
  };

  useEffect(() => {
    setCurrentTicket(ticket)
  }, [ticket])

  return (
    <main className={styles["ticket-system"]} onClick={handleCardClick}>
      <div className={styles["receipts-wrapper"]}>
        <div className={styles.receipts}>
          <div className={styles.receipt}>
            <div className={styles["image-container"]}>
              <img src={logo} className={styles["airliner-logo"]} alt="Airline logo" />
            </div>
            <div className={styles.route}>
              <h2>DEP</h2>
              <FlightIcon className={styles["flight-icon"]} />
              <h2>ARR</h2>
            </div>
            <div className={styles.details}>
              <Grid container>
                <Grid item xs={6}>
                  <div className={styles.item}>
                    <span>Passenger</span>
                    <h3>{currentTicket?.passenger ? currentTicket.passenger.name : "N/A"}</h3>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={styles.item}>
                    <span>Flight No.</span>
                    <h3>{currentTicket?.flight ? currentTicket.flight.flightNumber : "N/A"}</h3>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={styles.item}>
                    <span>Departure</span>
                    <h3>{departureTime}</h3>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={styles.item}>
                    <span>Arrival</span>
                    <h3>{arrivalTime}</h3>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={styles.item}>
                    <span>Gate</span>
                    <h3>{currentTicket?.boardingPass ? currentTicket.boardingPass.gate : "N/A"}</h3>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={styles.item}>
                    <span>Class</span>
                    <h3>{currentTicket?._class}</h3>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={styles.item}>
                    <span>Seat</span>
                    <h3>{currentTicket?.seatNumber}</h3>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={styles.item}>
                    <span>Price</span>
                    <h3>{currentTicket?.price}</h3>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className={`${styles.receipt} ${styles["qr-code"]}`}>
            <QRCode value={`${JSON.stringify(currentTicket)}`} className={styles.qr} />
            <div className={styles.description}>
              <p>Show QR-code when requested</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TicketCard;
