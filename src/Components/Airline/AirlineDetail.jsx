import React, { useState, useEffect } from 'react';
import { useParams, Link, useRouteLoaderData } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Container, Paper, Grid } from '@mui/material';
import { apiService } from '../../util/apiService';

const AirlineDetail = () => {
  const [airline, setAirline] = useState(null);
  const { airlineId } = useParams();
  const auth = useRouteLoaderData('root');

  useEffect(() => {
    loadAirline(airlineId);
  }, [airlineId]);

  const loadAirline = async (id) => {
    try {
      const data = await apiService.get('/public/airlines/' + id);
      setAirline(data);
    } catch (error) {
      console.error('There was an error fetching the airline details!', error);
      alert('There was an error fetching the airline details! Check the console for more details.');
    }
  };

  if (!airline) {
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
                  {airline.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textSecondary" align="center">
                  Code: {airline.code}
                </Typography>
              </Grid>
              <Grid item>
                <Box mt={2}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      {auth && (
                        <Link to={`edit`} style={{ textDecoration: 'none' }}>
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

export default AirlineDetail;