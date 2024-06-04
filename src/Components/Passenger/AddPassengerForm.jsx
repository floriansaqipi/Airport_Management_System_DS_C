import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box, Paper, Grid } from '@mui/material';
import { apiService } from '../../util/apiService';

const AddPassengerForm = () => {
  const [passenger, setPassenger] = useState({ name: '', passportNumber: '', nationality: '', contactDetails: '', username: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassenger(prevPassenger => ({
      ...prevPassenger,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!passenger.name) newErrors.name = 'Name is required';
    if (!passenger.passportNumber) newErrors.passportNumber = 'Passport Number is required';
    if (!passenger.nationality) newErrors.nationality = 'Nationality is required';
    if (!passenger.contactDetails) newErrors.contactDetails = 'Contact Details are required';
    if (!passenger.username) newErrors.username = 'Username is required';
    if (!passenger.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await apiService.post('/public/auth/passengers/register', passenger);
      navigate('/passengers');
    } catch (error) {
      console.log("Here is the error: " + error);
      setErrors({ ...errors, passportNumber: 'The passport number already exists!', username: 'The username already exists' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Passenger
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
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="passportNumber"
                label="Passport Number"
                value={passenger.passportNumber}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.passportNumber)}
                helperText={errors.passportNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="nationality"
                label="Nationality"
                value={passenger.nationality}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.nationality)}
                helperText={errors.nationality}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="contactDetails"
                label="Contact Details"
                value={passenger.contactDetails}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.contactDetails)}
                helperText={errors.contactDetails}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="username"
                label="Username"
                value={passenger.username}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.username)}
                helperText={errors.username}
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
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
          {errors.form && (
            <Box mt={2}>
              <Typography color="error">{errors.form}</Typography>
            </Box>
          )}
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button type="submit" variant="contained" color="primary">
              Add Passenger
            </Button>
            <Button
              onClick={() => navigate('..')}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddPassengerForm;