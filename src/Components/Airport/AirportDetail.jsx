import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box, Grid } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';

const AirportDetail = ({ isOpen, onClose, airport }) => {
  if (!airport) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <LocalAirportIcon style={{ marginRight: '10px' }} />
        {airport.name}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Airport Code:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {airport.code}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              <LocationCityIcon style={{ marginRight: '5px' }} />
              City:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {airport.locationCity}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              <PublicIcon style={{ marginRight: '5px' }} />
              Country:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {airport.locationCountry}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3} textAlign="right">
          <Button variant="contained" color="primary" onClick={onClose} style={{ marginLeft: '10px' }}>
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AirportDetail;
