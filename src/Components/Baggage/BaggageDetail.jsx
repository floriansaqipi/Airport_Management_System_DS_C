import React, { useState, useEffect } from 'react';
import { useParams, Link, useRouteLoaderData } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Container, Paper, Grid } from '@mui/material';
import { apiService } from '../../util/apiService';

const BaggageDetail = () => {
  const [baggage, setBaggage] = useState(null);
  const { baggageId } = useParams();
  const auth = useRouteLoaderData('root');

  useEffect(() => {
    loadBaggage(baggageId);
  }, [baggageId]);

  const loadBaggage = async (id) => {
    try {
      const data = await apiService.get(`/private/baggage/${id}`);
      setBaggage(data);
    } catch (error) {
      console.error('There was an error fetching the baggage details!', error);
      alert(`There was an error fetching the baggage details! ${error.message}`);
    }
  };

  if (!baggage) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      maxWidth="sm">
      <Paper style={{ padding: '16px', marginTop: '32px' }}>
        <Card>
          <CardContent>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <Typography variant="h6" component="div" align="center">
                  Baggage ID: {baggage.baggageId}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textSecondary" align="center">
                  Passenger ID: {baggage.passenger.passengerId}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textSecondary" align="center">
                  Passenger name: {baggage.passenger.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textSecondary" align="center">
                  Flight ID: {baggage.flight.flightId}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textSecondary" align="center">
                  Flight number: {baggage.flight.flightNumber}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textSecondary" align="center">
                  Baggage weight: {baggage.weight} kg
                </Typography>
              </Grid>
              <Grid item>
                <Box mt={2}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      {auth && (auth.role === "ADMIN" || auth.role === "EMPLOYEE") && (
                        <Link to={`/baggage/${baggage.baggageId}/edit`} style={{ textDecoration: 'none' }}>
                          <Button variant="contained" color="primary">
                            Edit
                          </Button>
                        </Link>
                      )}
                    </Grid>
                    <Grid item>
                      <Link to=".." style={{ textDecoration: 'none' }}>
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

export default BaggageDetail;