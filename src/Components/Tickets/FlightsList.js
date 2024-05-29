import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
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

export default function FlightsList({ style }) {
  const [flights, setFlights] = useState([]);
  const [selectedFlights, setSelectedFlights] = useState([]);

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

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedFlights(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} style={style}>
        <InputLabel id="flightId" name="flightId" value={flights.flightId}>Flight</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedFlights}
          onChange={handleChange}
          input={<OutlinedInput label="Flight" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {flights.map((flight) => (
            <MenuItem key={flight.flightId} value={flight.flightId}>
              <Checkbox checked={selectedFlights.indexOf(flight.flightNumber) > -1} />
              <ListItemText primary={flight.flightId} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}