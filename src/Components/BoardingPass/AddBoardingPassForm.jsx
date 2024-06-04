import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box, Paper, Grid, Autocomplete, FormControl, FormHelperText } from '@mui/material';
import { apiService } from '../../util/apiService';

const AddBoardingPassForm = () => {
  const [boardingPass, setBoardingPass] = useState({ gate: '', boardingTime: '', ticketId: '' });
  const [tickets, setTickets] = useState([]);
  const [boardingPasses, setBoardingPasses] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await apiService.get('/private/tickets');
        if (Array.isArray(response)) {
          setTickets(response);
        } else {
          console.error('Unexpected format for tickets:', response);
        }
      } catch (error) {
        console.error('There was an error fetching the tickets!', error);
      }
    };

    const fetchBoardingPasses = async () => {
      try {
        const response = await apiService.get('/private/boarding_passes');
        if (Array.isArray(response)) {
          setBoardingPasses(response);
        } else {
          console.error('Unexpected format for boarding passes:', response);
        }
      } catch (error) {
        console.error('There was an error fetching the boarding passes!', error);
      }
    };

    fetchTickets();
    fetchBoardingPasses();
  }, []);

  const handleChange = (e, newValue, name) => {
    const value = name ? newValue : e.target.value;
    const fieldName = name || e.target.name;

    if (fieldName === 'boardingTime') {
      const currentTime = new Date().toISOString().slice(0, -8);
      const selectedDateTime = new Date(value).toISOString().slice(0, -8);

      if (selectedDateTime < currentTime) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [fieldName]: 'Boarding Time cannot be in the past'
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          [fieldName]: ''
        }));
      }
    } else if (fieldName === 'ticketId') {
      if (boardingPasses.some(bp => bp.ticket.ticketId === value)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [fieldName]: 'This ticket ID already has a boarding pass'
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          [fieldName]: ''
        }));
      }
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: !value ? 'This field is required' : ''
      }));
    }

    setBoardingPass(prevBoardingPass => ({
      ...prevBoardingPass,
      [fieldName]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!boardingPass.gate) newErrors.gate = 'Gate is required';
    if (!boardingPass.boardingTime) {
      newErrors.boardingTime = 'Boarding Time is required';
    } else {
      const currentTime = new Date().toISOString().slice(0, -8);
      const selectedDateTime = new Date(boardingPass.boardingTime).toISOString().slice(0, -8);

      if (selectedDateTime < currentTime) {
        newErrors.boardingTime = 'Boarding Time cannot be in the past';
      }
    }
    if (!boardingPass.ticketId) {
      newErrors.ticketId = 'Ticket ID is required';
    } else if (boardingPasses.some(bp => bp.ticket.ticketId === boardingPass.ticketId)) {
      newErrors.ticketId = 'This ticket ID already has a boarding pass';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await apiService.post('/private/boarding_passes', {
          ...boardingPass,
          ticket: { ticketId: boardingPass.ticketId } // Adjust the payload to match your API's expected structure
        });
        alert("Boarding pass added successfully!");
        navigate('/boarding_passes');
      } catch (error) {
        console.error('There was an error saving the boarding pass!', error);
        alert('There was an error saving the boarding pass! Check the console for more details.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Boarding Pass
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="gate"
                label="Gate"
                value={boardingPass.gate}
                onChange={handleChange}
                fullWidth
                error={!!errors.gate}
                helperText={errors.gate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="boardingTime"
                label="Boarding Time"
                type="datetime-local"
                value={boardingPass.boardingTime}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.boardingTime}
                helperText={errors.boardingTime}
                inputProps={{
                  min: new Date().toISOString().slice(0, -8)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.ticketId}>
                <Autocomplete
                  id="ticketId"
                  options={tickets}
                  getOptionLabel={(option) => `${option.ticketId} - ${option.flight?.flightNumber}`}
                  renderInput={(params) => <TextField {...params} label="Ticket" />}
                  value={tickets.find(t => t.ticketId === boardingPass.ticketId) || null}
                  onChange={(e, newValue) => handleChange(e, newValue ? newValue.ticketId : '', 'ticketId')}
                />
                {!!errors.ticketId && <FormHelperText>{errors.ticketId}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button type="submit" variant="contained" color="primary">
              Add Boarding Pass
            </Button>
            <Button
              onClick={() => navigate('..')}
              variant="contained"
              color="secondary"
            >
              Go Back
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddBoardingPassForm;