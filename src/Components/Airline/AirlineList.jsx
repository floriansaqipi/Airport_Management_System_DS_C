import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../util/DataTable'; // Adjust the path based on your directory structure
import { Container, Box, Typography, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiService } from '../../apiService';

export default function AirlineList() {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    loadAirlines();
  }, []);

  const loadAirlines = async () => {
    try {
      const data = await apiService.get('/public/airlines');
      setAirlines(data);
    } catch (error) {
      console.error('There was an error fetching the airlines!', error);
      alert('There was an error fetching the airlines! Check the console for more details.');
    }
  };

  const handleDeleteAirline = async (id) => {
    try {
      await apiService.delete('/private/airlines/' + id);
      setAirlines(airlines.filter(airline => airline.airlineId !== id));
    } catch (error) {
      console.error('There was an error deleting the airline!', error);
      alert('There was an error deleting the airline! Check the console for more details.');
    }
  };

  const columns = [
    { field: 'airlineId', headerName: 'ID', width: 140 },
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
      renderCell: (params) => (
        <Link to={`/airline-details/${params.row.airlineId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {params.row.name}
        </Link>
      )
    },
    { field: 'code', headerName: 'Code', width: 240 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 130,
      renderCell: (params) => (
        <>
          <Link to={`/edit-airline/${params.row.airlineId}`} style={{ textDecoration: 'none' }}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
        </>
      )
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton
            color="secondary"
            onClick={() => handleDeleteAirline(params.row.airlineId)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <Container
      className='home'
      maxWidth="lg">
      <Box textAlign="center"> {/* mt={5} mb={2} */}
        <Typography variant="h4" component="h1" gutterBottom>
          Airlines
        </Typography>
        <Link to={`/add-airline`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Add Airline
          </Button>
        </Link>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        <Box sx={{ width: '100%', maxWidth: 1000 }}>
          <DataTable
            rows={airlines}
            columns={columns}
            loading={!airlines.length}
            sx={{ m: 1, width: '100%' }}
            id="airlineId"
          />
        </Box>
      </Box>
    </Container>
  );
}