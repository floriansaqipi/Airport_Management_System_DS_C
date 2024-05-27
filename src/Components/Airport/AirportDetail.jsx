import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { apiService } from '../../services/apiService';


const AirportDetail = () => {
  const [airport, setAirport] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    loadAirport(id);
  }, [id]);

  const loadAirport = async (id) => {
    try {
      const data = await apiService.get(`/public/airports/${id}`);
      setAirport(data);
    } catch (error) {
      console.error('There was an error fetching the airport details!', error);
      alert('There was an error fetching the airport details! Check the console for more details.');
    }
  };

  if (!airport) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {airport.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Airport Code: {airport.code}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          City: {airport.locationCity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Country: {airport.locationCountry}
        </Typography>
        <Box mt={2}>
          <Link to="/">
            <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
              Back
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AirportDetail;
