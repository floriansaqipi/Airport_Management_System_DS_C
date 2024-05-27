import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Container, Paper, Grid } from '@mui/material';
import { apiService } from '../../apiService';

const BaggageDetail = () => {
  const [baggage, setBaggage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    loadBaggage(id);
  }, [id]);

  const loadBaggage = async (id) => {
    try {
      const data = await apiService.get('/public/baggages/' + id);
      setBaggage(data);
    } catch (error) {
      console.error('There was an error fetching the baggage details!', error);
      alert('There was an error fetching the baggage details! Check the console for more details.');
    }
  };

  if (!baggage) {
    return <div>Loading...</div>;
  }

  return (
    <Container 
    className='home'
    maxWidth="sm">
      <Paper style={{ padding: '16px', marginTop: '32px' }}>
        <Card>
          <CardContent>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <Typography variant="h6" component="div" align="center">
                  {baggage.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textSecondary" align="center">
                  Code: {baggage.code}
                </Typography>
              </Grid>
              <Grid item>
                <Box mt={2}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <Link to={`/edit-baggage/${baggage.baggageId}`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary">
                          Edit
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to="/baggages" style={{ textDecoration: 'none' }}>
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