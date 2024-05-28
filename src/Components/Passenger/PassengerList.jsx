import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../util/DataTable'; // Adjust the path based on your directory structure
import { Container, Box, Typography, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiService } from '../../util/apiService';

export default function PassengerList() {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    loadPassengers();
  }, []);

  const loadPassengers = async () => {
    try {
      const data = await apiService.get('/private/passengers');
      setPassengers(data);
    } catch (error) {
      console.error('There was an error fetching the passengers!', error);
      alert('There was an error fetching the passengers! Check the console for more details.');
    }
  };

  const handleDeletePassenger = async (id) => {
    try {
      await apiService.delete('/private/passengers/' + id);
      setPassengers(passengers.filter(passenger => passenger.passengerId !== id));
    } catch (error) {
      console.error('There was an error deleting the passenger!', error);
      alert('There was an error deleting the passenger! Check the console for more details.');
    }
  };

  const columns = [
    { field: 'passengerId', headerName: 'ID', width: 83 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <Link to={`/passenger-details/${params.row.passengerId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {params.row.name}
        </Link>
      )
    },
    { field: 'passportNumber', headerName: 'Passport Number', width: 200 },
    { field: 'nationality', headerName: 'Nationality', width: 150 },
    { field: 'contactDetails', headerName: 'Contact Details', width: 250 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
          <Link to={`/edit-passenger/${params.row.passengerId}`} style={{ textDecoration: 'none' }}>
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
            onClick={() => handleDeletePassenger(params.row.passengerId)}
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
      <Box textAlign="center"> {/*mt={5} mb={2}*/}
        <Typography variant="h4" component="h1" gutterBottom>
          Passenger List
        </Typography>
        <Link to={`/register-passenger`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Add Passenger
          </Button>
        </Link>
      </Box>
      <DataTable
        rows={passengers}
        columns={columns}
        loading={!passengers.length}
        sx={{ m: 1 }}
        id="passengerId"
      />
    </Container>
  );
}