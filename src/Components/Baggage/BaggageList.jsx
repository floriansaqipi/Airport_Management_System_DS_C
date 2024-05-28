import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../util/DataTable'; // Adjust the path based on your directory structure
import { Container, Box, Typography, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiService } from '../../util/apiService';

export default function BaggageList() {
  const [baggages, setBaggages] = useState([]);

  useEffect(() => {
    loadBaggages();
  }, []);

  const loadBaggages = async () => {
    try {
      const data = await apiService.get('/private/baggage');
      setBaggages(data);
    } catch (error) {
      console.error('There was an error fetching the baggages!', error);
      alert('There was an error fetching the baggages! Check the console for more details.');
    }
  };

  const handleDeleteBaggage = async (id) => {
    try {
      await apiService.delete('/private/baggage/' + id);
      setBaggages(baggages.filter(baggage => baggage.baggageId !== id));
    } catch (error) {
      console.error('There was an error deleting the baggage!', error);
      alert('There was an error deleting the baggage! Check the console for more details.');
    }
  };

  const columns = [
    { field: 'baggageId', headerName: 'ID', width: 100 },
    {
      field: 'passenger',
      headerName: 'Passenger',
      width: 290,
      renderCell: (params) => {
        const passenger = params.row.passenger;
        const passengerDisplay = passenger 
          ? `${passenger.passengerId} - ${passenger.name}`
          : 'N/A';
        return (
          <Link to={`/baggage-passenger-details/${passenger ? passenger.passengerId : ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {passengerDisplay}
          </Link>
        );
      }
    },
    {
      field: 'flight',
      headerName: 'Flight',
      width: 200,
      valueGetter: (params) => {
        const flight = params.row.flight;
        console.log('Flight:', flight); // Debug log
        return flight 
          ? `${flight.flightId} - ${flight.flightNumber}`
          : 'N/A';
      }
    },
    { field: 'weight', headerName: 'Weight', width: 150 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <Link to={`/edit-baggage/${params.row.baggageId}`} style={{ textDecoration: 'none' }}>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        </Link>
      )
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <IconButton
          color="secondary"
          onClick={() => handleDeleteBaggage(params.row.baggageId)}
        >
          <DeleteIcon />
        </IconButton>
      )
    }
  ];

  return (
    <Container
      className='home'
      maxWidth="lg">
      <Box textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Baggages
        </Typography>
        <Link to="/add-baggage" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Add Baggage
          </Button>
        </Link>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        <Box sx={{ width: '100%', maxWidth: 1000 }}>
          <DataTable
            rows={baggages}
            columns={columns}
            loading={!baggages.length}
            sx={{ m: 1, width: '100%' }}
            id="baggageId"
          />
        </Box>
      </Box>
    </Container>
  );
}