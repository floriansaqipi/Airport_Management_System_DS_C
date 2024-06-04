import React, { useState } from 'react';
import styles from "./TicketCard.module.css"; 
import FlightIcon from "@mui/icons-material/Flight";
import logo from "../../assets/logo.png";
import Grid from "@mui/material/Grid";
import dateFormatter from "../../util/dateFormatter";
import QRCode from "react-qr-code";
import EditTicket from './EditTicket'; 
import AddTicketButton from './AddTicketButton';

const AddTicketCard = ({ onAdd }) => {
  return (
    <>
      <main className={styles["ticket-system"]}>
        <div className={styles["receipts-wrapper"]}>
          <div className={styles.receipts} >
            <div className={styles.receipt}>
              <div className={styles["image-container"]}>
                <img src={logo} className={styles["airliner-logo"]} alt="Airline logo" />
              </div>
              <div className={styles.route}>
                <h2>DEP</h2>
                <FlightIcon className={styles["flight-icon"]} />
                <h2>ARR</h2>
              </div>
              <AddTicketButton onAdd={onAdd}/>
            </div>
            
          </div>
        </div>
      </main>
    </>
  );
};

export default AddTicketCard;
