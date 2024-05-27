import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box, Paper, Grid, Autocomplete, FormControl, FormHelperText } from '@mui/material';
import { apiService } from '../../apiService';

const BaggageForm = ({ baggage, setBaggage, handleSubmit, title, submitButtonLabel }) => {
  const [passengers, setPassengers] = useState([]);
  const [flights, setFlights] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await apiService.get('/private/passengers');
        if (Array.isArray(response)) {
          setPassengers(response);
        } else {
          console.error('Unexpected format for passengers:', response);
        }
      } catch (error) {
        console.error('There was an error fetching the passengers!', error);
      }
    };

    const fetchFlights = async () => {
      try {
        const response = await apiService.get('/public/flights');
        if (Array.isArray(response)) {
          setFlights(response);
        } else {
          console.error('Unexpected format for flights:', response);
        }
      } catch (error) {
        console.error('There was an error fetching the flights!', error);
      }
    };

    fetchPassengers();
    fetchFlights();
  }, []);

  const handleChange = (e, newValue, name) => {
    const value = name ? newValue : e.target.value;
    const fieldName = name || e.target.name;
    let valid = true;
    
    if (fieldName === 'weight' && value < 0) {
      valid = false;
      setErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: 'Weight cannot be negative'
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: !value
      }));
    }

    if (valid) {
      setBaggage(prevBaggage => ({
        ...prevBaggage,
        [fieldName]: value
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!baggage.passengerId) newErrors.passengerId = 'Passenger ID is required';
    if (!baggage.flightId) newErrors.flightId = 'Flight ID is required';
    if (!baggage.weight) {
      newErrors.weight = 'Weight is required';
    } else if (baggage.weight < 0) {
      newErrors.weight = 'Weight cannot be negative';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit();
    }
  };

  return (
    <Container className='home' maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.passengerId}>
                <Autocomplete
                  id="passengerId"
                  options={passengers}
                  getOptionLabel={(option) => `${option.passengerId} - ${option.name}`}
                  renderInput={(params) => <TextField {...params} label="Passenger" />}
                  value={passengers.find(p => p.passengerId === baggage.passengerId) || null}
                  onChange={(e, newValue) => handleChange(e, newValue ? newValue.passengerId : '', 'passengerId')}
                />
                {!!errors.passengerId && <FormHelperText>{errors.passengerId}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.flightId}>
                <Autocomplete
                  id="flightId"
                  options={flights}
                  getOptionLabel={(option) => `${option.flightId} - ${option.flightNumber}`}
                  renderInput={(params) => <TextField {...params} label="Flight" />}
                  value={flights.find(f => f.flightId === baggage.flightId) || null}
                  onChange={(e, newValue) => handleChange(e, newValue ? newValue.flightId : '', 'flightId')}
                />
                {!!errors.flightId && <FormHelperText>{errors.flightId}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="weight"
                label="Weight (kg)"
                value={baggage.weight || ''}
                onChange={handleChange}
                fullWidth
                type="number"
                inputProps={{ step: "0.01" }}
                error={!!errors.weight}
                helperText={errors.weight}
              />
            </Grid>
          </Grid>
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button type="submit" variant="contained" color="primary" sx={{ zIndex: 1 }}>
              {submitButtonLabel}
            </Button>
            <Link to="/baggages" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="secondary" style={{ marginRight: '10px' }}>
                Go Back
              </Button>
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default BaggageForm;