import React from 'react';
import { Button, TextField, Container, Typography, Box, Paper, Grid } from '@mui/material';
import { Link, useRouteLoaderData } from 'react-router-dom';

const AirlineForm = ({ airline, setAirline, handleSubmit, title, submitButtonLabel, errors, setErrors }) => {
  const auth = useRouteLoaderData('root');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAirline(prevAirline => ({
      ...prevAirline,
      [name]: value
    }));

    if (name === 'code') {
      if (value.length !== 5) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: 'Code must be exactly 5 characters'
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: ''
        }));
      }
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!airline.name) {
      newErrors.name = 'Name is required';
    }
    if (!airline.code) {
      newErrors.code = 'Code is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit(e);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                value={airline.name}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="code"
                label="Code"
                value={airline.code}
                onChange={handleChange}
                fullWidth
                error={Boolean(errors.code)}
                helperText={errors.code}
              />
            </Grid>
          </Grid>
          <Box mt={3} display="flex" justifyContent="space-between">
            {auth && (
              <Button type="submit" variant="contained" color="primary">
                {submitButtonLabel}
              </Button> 
            )}
            <Link to={`/airlines`} style={{ textDecoration: 'none' }}>
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

export default AirlineForm;