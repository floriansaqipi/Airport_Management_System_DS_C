import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button, TextField, Box, Typography, FormHelperText } from '@mui/material';

import { apiService } from '../../apiService';

Modal.setAppElement('#root'); 

const isEmpty = (value) => value.trim() === '';
const isMoreThanFiveChars = (value) => value.trim().length > 5;
const isMoreThanFiftyChars = (value) => value.trim().length > 50;
const specialCharPattern = /[^a-zA-Z0-9 ]/;
const containsSpecialCharacters = (value) => specialCharPattern.test(value);

const validateField = (field) => {
  const valid = !isEmpty(field) && !isMoreThanFiftyChars(field) && !containsSpecialCharacters(field);
  const message = isEmpty(field) ? 'Field is required' : 
  isMoreThanFiftyChars(field) ? 'Field should not exceed 50 characters' : 
  containsSpecialCharacters(field)?'Field should not contain special characters':'';
  return { valid, message };
};

const validateCode = (code) => {
  const valid = !isEmpty(code) && !isMoreThanFiveChars(code) && !containsSpecialCharacters(code);
  const message = isEmpty(code) ? 'Field is required' : 
  isMoreThanFiveChars(code) ? 'Field should not exceed 5 characters' :
  containsSpecialCharacters(code)?'Field should not contain special characters':'';
  return { valid, message };
};


const AirportModal = ({ isOpen, onClose, onSave, airportData }) => {
  const [airport, setAirport] = useState({
    airportId: airportData?.airportId || '',
    name: airportData?.name || '',
    code: airportData?.code || '',
    locationCity: airportData?.locationCity || '',
    locationCountry: airportData?.locationCountry || '',
  });

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: { valid: true, message: '' },
    code: { valid: true, message: '' },
    locationCity: { valid: true, message: '' },
    locationCountry: { valid: true, message: '' }
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

    const nameValidation = validateField(airport.name);
    const codeValidation = validateCode(airport.code);
    const locationCityValidation = validateField(airport.locationCity);
    const locationCountryValidation = validateField(airport.locationCountry);

    setFormInputsValidity({
      name: nameValidation,
      code: codeValidation,
      locationCity: locationCityValidation,
      locationCountry: locationCountryValidation
    });

    const isFormValid = nameValidation.valid && codeValidation.valid && locationCityValidation.valid && locationCountryValidation.valid;

    const checkCodeExists = async (code) => {
      try {
        const response = await apiService.get(`/public/airports`);
        if(response !=null){
          const codeExists = response.some(airport => airport.code === code);
           return codeExists;
        }
      } catch (error) {
        console.error('Error checking code existence:', error);
        return true;
      }
    };
    

    if (isFormValid) {
      try {
        const codeExists = await checkCodeExists(airport.code);
        if (codeExists) {
          setFormInputsValidity(prevState => ({
            ...prevState,
            code: { valid: false, message: 'Code already exists' }
          }));
          return; 
        }
  
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
          {formInputsValidity.name.message && <FormHelperText error>{formInputsValidity.name.message}</FormHelperText>}
          <TextField
            name="code"
            label="Code"
            value={airport.code}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {formInputsValidity.code.message && <FormHelperText error>{formInputsValidity.code.message}</FormHelperText>}
          <TextField
            name="locationCity"
            label="Location City"
            value={airport.locationCity}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {formInputsValidity.locationCity.message && <FormHelperText error>{formInputsValidity.locationCity.message}</FormHelperText>}
          <TextField
            name="locationCountry"
            label="Location Country"
            value={airport.locationCountry}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {formInputsValidity.locationCountry.message && <FormHelperText error>{formInputsValidity.locationCountry.message}</FormHelperText>}
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
