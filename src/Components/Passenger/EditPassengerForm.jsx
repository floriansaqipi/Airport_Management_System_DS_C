import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link, useRouteLoaderData } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box, Paper, Grid } from '@mui/material';
import { apiService } from '../../util/apiService';

const EditPassengerForm = () => {
  const [passenger, setPassenger] = useState({
    name: '',
    passportNumber: '',
    nationality: '',
    contactDetails: '',
    username: '',
    password: ''
  });
  const { passengerId } = useParams();
  const navigate = useNavigate();
  const auth = useRouteLoaderData('root');

  useEffect(() => {
    if (passengerId) {
      loadPassenger(passengerId);
    }
  }, [passengerId]);

  const loadPassenger = async (id) => {
    try {
      const data = await apiService.get('/private/passengers/' + id);
      setPassenger(data);
    } catch (error) {
      console.error('There was an error fetching the passenger!', error);
      alert('There was an error fetching the passenger! Check the console for more details.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassenger(prevPassenger => ({
      ...prevPassenger,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.put(`/private/passengers`, passenger);
      navigate('..');
    } catch (error) {
      console.error('There was an error saving the passenger!', error);
      alert('There was an error saving the passenger! Check the console for more details.');
    }
  };

  return (
    <Container
      maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Passenger
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                value={passenger.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="passportNumber"
                label="Passport Number"
                value={passenger.passportNumber}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="nationality"
                label="Nationality"
                value={passenger.nationality}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="contactDetails"
                label="Contact Details"
                value={passenger.contactDetails}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="username"
                label="Username"
                value={passenger.username}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                value={passenger.password}
                onChange={handleChange}
                fullWidth
                required={false}
              />
            </Grid>
          </Grid>
          <Box mt={3} display="flex" justifyContent="space-between">
            {auth && (
              <Button type="submit" variant="contained" color="primary">
                Update Passenger
              </Button>
            )}
            <Link to={`../..`} style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="secondary">
                Go Back
              </Button>
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default EditPassengerForm;