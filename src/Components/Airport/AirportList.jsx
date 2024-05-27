import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import AirportModal from './AirportModal';
import { apiService } from '../../services/apiService';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

const AirportList = () => {
  const [airport, setAirport] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentAirport, setCurrentAirport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [airportToDelete, setAirportToDelete] = useState(null);
  const itemsPerPage = 5;


  const loadAirport = async () => {
    try {
      const data = await apiService.get('/public/airports');
      setAirport(data);
    } catch (error) {
      console.error('There was an error fetching the airports!', error);
      alert('There was an error fetching the airports! Check the console for more details.');
    }
  };

  useEffect(() => {
    loadAirport();
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
      await apiService.delete(`/private/airports/${airportToDelete}`)
      setAirport(airport.filter(airport => airport.airportId !== airportToDelete));
    } catch (error) {
      console.error('There was an error deleting the airport!', error);
      alert('There was an error deleting the airport! Check the console for more details.');
    }
    setDeleteDialogOpen(false);
  };

  const handleSaveAirport = async () => {
    setModalIsOpen(false);
    await loadAirport();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredAirports = airport.filter(airport =>
    airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.locationCity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAirports = filteredAirports.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
      <h1>Airports List</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <Button variant="contained" color="primary" onClick={handleAddAirport}>
          Add Airport
        </Button>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          size="small"
          style={{ width: '250px' }}
        />
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Location City</TableCell>
            <TableCell>Location Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedAirports.map(airport => (
            <TableRow key={airport.airportId}>
              <TableCell>{airport.airportId}</TableCell>
              <TableCell>
                <Link to={`/detail/${airport.airportId}`}>
                  {airport.name}
                </Link>
              </TableCell>
              <TableCell>{airport.code}</TableCell>
              <TableCell>{airport.locationCity}</TableCell>
              <TableCell>{airport.locationCountry}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEditAirport(airport)}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDeleteAirport(airport.airportId)} style={{ marginLeft: '10px' }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Pagination
          count={Math.ceil(filteredAirports.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
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
    </div>
  );
};

export default AirportList;
