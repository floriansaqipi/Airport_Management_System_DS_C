import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button, TextField, Box, Typography, FormControl, FormHelperText } from '@mui/material';

import { apiService } from '../apiService';

Modal.setAppElement('#root'); 


const AirportModal = ({ isOpen, onClose, onSave, airportData }) => {
  const [airport, setAirport] = useState({
    airportId: airportData?.airportId || '',
    name: airportData?.name || '',
    code: airportData?.code || '',
    locationCity: airportData?.locationCity || '',
    locationCountry: airportData?.locationCountry || '',
  });

  useEffect(() => {
    setAirport({
      airportId: airportData?.airportId || '',
      name: airportData?.name || '',
      code: airportData?.code || '',
      locationCity: airportData?.locationCity || '',
      locationCountry: airportData?.locationCountry || '',
    });
  }, [airportData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAirport(prevAirport => ({
      ...prevAirport,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  
        if (airport.airportId) {
          await apiService.put('/private/airports', airport);
        } else {
          await apiService.post('/private/airports', airport);
        }
        onSave(airport);
      } catch (error) {
        console.error('There was an error saving the airport!', error);
        alert('There was an error saving the airport! Check the console for more details.');
      }
    
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
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Airport Modal" style={customStyles}>
      <Box p={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          {airportData ? 'Edit' : 'Add'} Airport
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            value={airport.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="code"
            label="Code"
            value={airport.code}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="locationCity"
            label="Location City"
            value={airport.locationCity}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="locationCountry"
            label="Location Country"
            value={airport.locationCountry}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              {airportData ? 'Update' : 'Add'} Airport
            </Button>
            <Button onClick={onClose} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AirportModal;
