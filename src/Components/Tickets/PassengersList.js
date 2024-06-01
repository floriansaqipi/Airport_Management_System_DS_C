import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { apiService } from '../../util/apiService';

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

export default function PassengersList({ selectedPassenger, onPassengerChange, style }) {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    loadPassengers();
  }, []);

  const loadPassengers = async () => {
    try {
      const data = await apiService.get('/private/passengers');
      setPassengers(data);
    } catch (error) {
      console.error('There was an error fetching the passengers!', error);
      alert('There was an error fetching the passengers! Check the console for more details.');
    }
  };

  return (
    <FormControl fullWidth sx={{ mt: 2 }} style={style}>
      <InputLabel id="passengerId-label">Passenger</InputLabel>
      <Select
        labelId="passengerId-label"
        id="passengerId"
        value={selectedPassenger}
        onChange={(e) => onPassengerChange(e.target.value)}
        input={<OutlinedInput label="Passenger" />}
        MenuProps={MenuProps}
        >
          {passengers.map((passenger) => (
            <MenuItem key={passenger.passengerId} value={passenger.passengerId}>
              {passenger.passengerId} / {passenger.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
  
