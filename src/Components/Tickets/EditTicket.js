import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button, TextField, Box, Typography, FormHelperText } from '@mui/material';
import PassengersList from './PassengersList';
import FlightsList from './FlightsList';


Modal.setAppElement('#root');

const isEmpty = (value) => String(value).trim() === '';
const isMoreThanSixChars = (value) => String(value).trim().length > 6;
const isMoreThanSixteenChars = (value) => String(value).trim().length > 16;
const isPriceValid = (value) => {
  const trimmedValue = String(value).trim(); 
  const decimalCount = (trimmedValue.match(/\./g) || []).length;
  if (decimalCount !== 1) {
    return false; 
  }
  return /^\d{1,6}(\.\d{1,2})?$/.test(trimmedValue);
};

const validateField = (field) => {
  const valid = !isEmpty(field) && !isMoreThanSixteenChars(field);
  const message = isEmpty(field) ? 'Field is required!' : 
                  isMoreThanSixteenChars(field) ? 'Field should not exceed 16 characters!' : '';
  return { valid, message };
};

const validateSeatNumber = (field) => {
  const valid = !isEmpty(field) && !isMoreThanSixChars(field);
  const message = isEmpty(field) ? 'Field is required!' : 
                  isMoreThanSixChars(field) ? 'Field should not exceed 6 characters!' : '';
  return { valid, message };
};

const validatePrice = (field) => {
  const valid = !isEmpty(field) && isPriceValid(field);
  const message = isEmpty(field) ? 'Field is required!' : 
                  !isPriceValid(field) ? 'Entered value is not valid!' : '';
  return { valid, message };
};

const EditTicket = ({ isOpen, onClose, onSave, ticketData, onReload, onDelete }) => {

  const [ticket, setTicket] = useState({
    ticketId: '',
    flightId: '',
    passengerId: '',
    seatNumber: '',
    _class: '',
    price: ''
  });

  const [formInputsValidity, setFormInputsValidity] = useState({
    flightId: { valid: true, message: '' },
    passengerId: { valid: true, message: '' },
    seatNumber: { valid: true, message: '' },
    _class: { valid: true, message: '' },
    price: { valid: true, message: '' }
  });

  useEffect(() => {
    if (ticketData) {
      setTicket({
        ticketId: ticketData.ticketId || '',
        flightId: ticketData.flightId || '',
        passengerId: ticketData.passengerId || '',
        seatNumber: ticketData.seatNumber || '',
        _class: ticketData._class || '',
        price: ticketData.price || ''
      });
    }
  }, [ticketData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value
    }));
  };

  const handleFlightChange = (flightId) => {
    setTicket((prevTicket) => ({
      ...prevTicket,
      flightId
    }));
  };

  const handlePassengerChange = (passengerId) => {
    setTicket((prevTicket) => ({
      ...prevTicket,
      passengerId
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const flightIdValidation = validateField(ticket.flightId);
    const passengerIdValidation = validateField(ticket.passengerId);
    const seatNumberValidation = validateSeatNumber(ticket.seatNumber);
    const classValidation = validateField(ticket._class);
    const priceValidation = validatePrice(ticket.price);

    setFormInputsValidity({
      flightId: flightIdValidation,
      passengerId: passengerIdValidation,
      seatNumber: seatNumberValidation,
      _class: classValidation,
      price: priceValidation
    });

    const isFormValid = flightIdValidation.valid && 
                        passengerIdValidation.valid && 
                        seatNumberValidation.valid && 
                        classValidation.valid &&
                        priceValidation.valid;

    if (isFormValid) {
      onSave(ticket);
    }
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
            {formInputsValidity.seatNumber.message && <FormHelperText error>{formInputsValidity.seatNumber.message}</FormHelperText>}
            
            <TextField
              name="_class"
              label="Class"
              value={ticket._class}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {formInputsValidity._class.message && <FormHelperText error>{formInputsValidity._class.message}</FormHelperText>}
            
            <TextField
              name="price"
              label="Price"
              value={ticket.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {formInputsValidity.price.message && <FormHelperText error>{formInputsValidity.price.message}</FormHelperText>}
            
            <FlightsList selectedFlight={ticket.flightId} onFlightChange={handleFlightChange} />
            {formInputsValidity.flightId.message && <FormHelperText error>{formInputsValidity.flightId.message}</FormHelperText>}
            
            <PassengersList selectedPassenger={ticket.passengerId} onPassengerChange={handlePassengerChange} />
            {formInputsValidity.passengerId.message && <FormHelperText error>{formInputsValidity.passengerId.message}</FormHelperText>}
            
            <Box mt={2} style={{display : 'flex', justifyContent : 'row'}}>
              <Button type="submit" variant="contained" color="primary">
                {ticketData ? 'Update' : 'Add'} Ticket
              </Button>
              {ticketData && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDeleteClick}
                  style={{ marginLeft: '10px' }}
                >
                  Delete Ticket
                </Button>
              )}
              <Button onClick={onClose} variant="contained" color="secondary" style={{ marginLeft: '35px' }}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    
  );
};

export default EditTicket;
