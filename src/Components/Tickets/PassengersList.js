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

export default function PassengersList({ style }) {
  const [passengers, setPassengers] = useState([]);
  const [selectedPassengers, setSelectedPassengers] = useState([]);

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

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedPassengers(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} style={style}>
        <InputLabel id="passengerId" name="passengerId" value={passengers.passengerId}>Passenger</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedPassengers}
          onChange={handleChange}
          input={<OutlinedInput label="Passenger" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {passengers.map((passenger) => (
            <MenuItem key={passenger.passengerId} value={passenger.passengerId}>
              <Checkbox checked={selectedPassengers.indexOf(passenger.name) > -1} />
              <ListItemText primary={passenger.passengerId}  />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
