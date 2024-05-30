import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { apiService } from '../../services/apiService';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FlightsList({ selectedFlight, onFlightChange, style }) {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    try {
      const data = await apiService.get('/public/flights');
      setFlights(data);
    } catch (error) {
      console.error('There was an error fetching the flights!', error);
      alert('There was an error fetching the flights! Check the console for more details.');
    }
  };

  return (
    <FormControl fullWidth sx={{ mt: 2 }} style={style}>
      <InputLabel id="flightId-label">Flight</InputLabel>
      <Select
        labelId="flightId-label"
        id="flightId"
        value={selectedFlight}
        onChange={(e) => onFlightChange(e.target.value)}
        input={<OutlinedInput label="Flight" />}
        MenuProps={MenuProps}
      >
        {flights.map((flight) => (
          <MenuItem key={flight.flightId} value={flight.flightId}>
            {flight.flightId} / {flight.flightNumber}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
