import Card from '@mui/material/Card';
import React, { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditTicket from './EditTicket';

const AddTicketButton = ({ onAdd }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  
  const handleAddTicket = () => {
    setCurrentTicket(null);
    setModalIsOpen(true);
  };
  const handleSaveTicket = async () => {
    setModalIsOpen(false);
  };
  
  return (
    <>
    <Card variant="outlined">
      <CardContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:'20px',
          minHeight: '200px', // Set a minimum height to ensure the content is vertically centered
        }}
      >
        <Typography variant="h5" component="div">
          Add a New Ticket
        </Typography>
        <Typography variant="body2">
          Click the button below to add a new ticket.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={onAdd}
          startIcon={<AddCircleIcon sx={{ fontSize: 300 }} />} // Increase the fontSize for a larger circle
          sx={{
            height: '200px', // Adjust the height for a larger circle
            width: '200px', // Adjust the width for a larger circle
            marginTop: '50px',
            marginBottom:'50px',
            borderRadius: '5px', // Make the button square by setting borderRadius to 0
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          Add Ticket
        </Button>
      </CardContent>
    </Card>
    <EditTicket 
    isOpen={modalIsOpen} 
    onClose={() => setModalIsOpen(false)} 
    onSave={handleSaveTicket}
    ticketData={currentTicket}
    />
    </>
  );
};

export default AddTicketButton;
