import React, { useState, useEffect } from 'react';
import { NavLink, useRouteLoaderData } from 'react-router-dom';
import DataTable from '../../util/DataTable'; // Adjust the path based on your directory structure
import { Container, Box, Typography, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiService } from '../../util/apiService';

export default function PassengerList() {
  const [passengers, setPassengers] = useState([]);
  const auth = useRouteLoaderData('root');

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
        auth ? (
          <NavLink
            to={`${params.row.passengerId}`}
            state={{ from: '/passengers' }}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {params.row.name}
          </NavLink>
        ) : (<span>{params.row.name}</span>)
      )
    },
    { field: 'passportNumber', headerName: 'Passport Number', width: 200 },
    { field: 'nationality', headerName: 'Nationality', width: 150 },
    { field: 'contactDetails', headerName: 'Contact Details', width: 250 },
  ];

  if (auth && (auth.role === "ADMIN" || auth.role === "EMPLOYEE")) {
    columns.push(
      {
        field: 'edit',
        headerName: 'Edit',
        width: 100,
        renderCell: (params) => (
          <NavLink to={`${params.row.passengerId}/edit`} style={{ textDecoration: 'none' }}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </NavLink>
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
    );
  }

  return (
    <Container
      maxWidth="lg">
      <Box textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Passenger List
        </Typography>
        {auth && (auth.role === "ADMIN" || auth.role === "EMPLOYEE") && (
          <NavLink
            to={`new`}
            style={{ textDecoration: 'none' }}
          >
            <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
              Add Passenger
            </Button>
          </NavLink>
        )}
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