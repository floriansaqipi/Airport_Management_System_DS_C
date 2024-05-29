import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button, TextField, Box, Typography } from '@mui/material';
import { apiService } from '../../services/apiService';
import PassengersList from './PassengersList'
import FlightsList from './FlightsList'
Modal.setAppElement('#root');

 
const EditTicket = ({ isOpen, onClose, onSave, ticketData,onReload, onDelete }) => {
  const [ticket, setTicket] = useState({
    ticketId: ticketData?.ticketId || '',
    flightId: ticketData?.flightId || '',
    passengerId: ticketData?.passengerId || '',
    seatNumber: ticketData?.seatNumber || '',
    _class: ticketData?._class || '',
    price: ticketData?.price || ''
  });

  useEffect(() => {
    setTicket({
      ticketId: ticketData?.ticketId || '',
      flightId: ticketData?.flightId || '',
      passengerId: ticketData?.passengerId || '',
      seatNumber: ticketData?.seatNumber || '',
      _class: ticketData?._class || '',
      price: ticketData?.price || ''
    });
  }, [ticketData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(ticket);
  };

 
  const handleDeleteClick = (e) => {
    e.stopPropagation(); 
    onDelete(ticket.ticketId);
  };
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
      maxHeight: '90vh',
      overflowY: 'auto'
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Edit Ticket" style={customStyles}>
      <Box p={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          {ticketData ? 'Edit' : 'Add'} Ticket
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="seatNumber"
            label="Seat Number"
            value={ticket.seatNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="_class"
            label="Class"
            value={ticket._class}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="price"
            label="Price"
            value={ticket.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="passengerId"
            label="Passenger"
            value={ticket.passengerId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="flightId"
            label="Flight"
            value={ticket.flightId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box mt={2}>
            <Button type="submit" onClick={onReload} variant="contained" color="primary">
              {ticketData ? 'Update' : 'Add'} Ticket
            </Button>
            {ticketData ? (
            <Button
               variant="contained"
               color="primary"
               onClick={handleDeleteClick}
               style={{ marginLeft: '10px' }}
             >
               Delete Ticket
             </Button>
            ) : null}
            <Button onClick={onClose} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditTicket;
