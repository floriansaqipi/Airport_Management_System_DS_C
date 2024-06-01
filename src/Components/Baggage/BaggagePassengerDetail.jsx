import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Container, Paper, Grid } from '@mui/material';
import { apiService } from '../../util/apiService';

const BaggagePassengerDetail = () => {
  const [passenger, setPassenger] = useState(null);
  const [error, setError] = useState(null);
  const { passengerId } = useParams();

  useEffect(() => {
    loadPassenger(passengerId);
  }, [passengerId]);

  const loadPassenger = async (id) => {
    try {
      const data = await apiService.get('/private/passengers/' + id);
      setPassenger(data);
    } catch (error) {
      console.error('There was an error fetching the passenger details!', error);
      setError(error.message);
      alert('There was an error fetching the passenger details! Check the console for more details.');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!passenger) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '16px', marginTop: '32px' }}>
        <Card>
          <CardContent>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <Typography variant="h6" component="div" align="center">
                  {passenger.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textSecondary" align="center">
                  PassportNumber: {passenger.passportNumber}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textSecondary" align="center">
                  Nationality: {passenger.nationality}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textSecondary" align="center">
                  Contact Details: {passenger.contactDetails}
                </Typography>
              </Grid>
              <Grid item>
                <Box mt={2}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <Link to="/baggage" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="secondary">
                          Back
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default BaggagePassengerDetail;