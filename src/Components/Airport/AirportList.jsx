import React, { useState, useEffect } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Box, Typography, Container } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import AirportModal from './AirportModal';
import AirportDetail from './AirportDetail';
import { apiService } from '../../util/apiService';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const AirportList = () => {
  const [airports, setAirports] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentAirport, setCurrentAirport] = useState(null);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [airportToDelete, setAirportToDelete] = useState(null);
  const itemsPerPage = 5;
  const auth = useRouteLoaderData("root");

  const loadAirports = async () => {
    try {
      const data = await apiService.get('/public/airports');
      setAirports(data);
    } catch (error) {
      console.error('There was an error fetching the airports!', error);
      alert('There was an error fetching the airports! Check the console for more details.');
    }
  };

  useEffect(() => {
    loadAirports();
  }, []);

  const handleAddAirport = () => {
    setCurrentAirport(null);
    setModalIsOpen(true);
  };

  const handleEditAirport = (airport) => {
    setCurrentAirport(airport);
    setModalIsOpen(true);
  };

  const handleDeleteAirport = (id) => {
    setAirportToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await apiService.delete(`/private/airports/${airportToDelete}`);
      setAirports(airports.filter(airport => airport.airportId !== airportToDelete));
    } catch (error) {
      console.error('There was an error deleting the airport!', error);
      alert('There was an error deleting the airport! Check the console for more details.');
    }
    setDeleteDialogOpen(false);
  };

  const handleSaveAirport = async () => {
    setModalIsOpen(false);
    await loadAirports();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleViewDetails = (airport) => {
    setCurrentAirport(airport);
    setDetailModalIsOpen(true);
  };

  const filteredAirports = airports.filter(airport =>
    airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.locationCity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAirports = filteredAirports.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Airports List
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={3}>
          {auth && (auth.role === "ADMIN" || auth.role === "EMPLOYEE") && (
            <Button variant="contained" color="primary" onClick={handleAddAirport}>
              Add Airport
            </Button>
          )}
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            style={{ width: '250px' }}
          />
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Location City</TableCell>
              <TableCell>Location Country</TableCell>
              {auth && (auth.role === "ADMIN" || auth.role === "EMPLOYEE") && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAirports.map(airport => (
              <TableRow key={airport.airportId}>
                <TableCell>{airport.airportId}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleViewDetails(airport)}>
                    {airport.name}
                  </Button>
                </TableCell>
                <TableCell>{airport.code}</TableCell>
                <TableCell>{airport.locationCity}</TableCell>
                <TableCell>{airport.locationCountry}</TableCell>
                {auth && (auth.role === "ADMIN" || auth.role === "EMPLOYEE") && (
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEditAirport(airport)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteAirport(airport.airportId)} style={{ marginLeft: '10px' }}>
                      Delete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={Math.ceil(filteredAirports.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Airport</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this airport?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <AirportModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          onSave={handleSaveAirport}
          airportData={currentAirport}
        />
        <AirportDetail
          isOpen={detailModalIsOpen}
          onClose={() => setDetailModalIsOpen(false)}
          airport={currentAirport}
        />
      </Box>
    </Container>
  );
};

export default AirportList;
