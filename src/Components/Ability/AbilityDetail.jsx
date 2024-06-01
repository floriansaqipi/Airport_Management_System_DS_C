import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { apiService } from '../../util/apiService';


const AbilityDetail = () => {
  const [ability, setAbility] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    loadAbility(id);
  }, [id]);

  const loadAbility = async (id) => {
    try {
      const data = await apiService.get(`/private/abilities/${id}`);
      setAbility(data);
    } catch (error) {
      console.error('There was an error fetching the ability details!', error);
      alert('There was an error fetching the ability details! Check the console for more details.');
    }
  };

  if (!ability) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {ability.entity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Entity: {ability.entity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Verb: {ability.verb}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Field: {ability.field}
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

export default AbilityDetail;
