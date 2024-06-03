import { useState, useEffect, Fragment } from "react";
import TicketGrid from "./TicketGrid";
import EditTicket from "./EditTicket";
import { apiService } from "../../util/apiService";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Box } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const Tickets = () => {
  const [reload, setReload] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await apiService.get('/private/tickets');
      setTickets(data);
    } catch (error) {
      console.error('There was an error fetching the tickets!', error);
      alert('There was an error fetching the tickets! Check the console for more details.');
    }
  };

  const handleReload = () => {
    setReload(!reload);
  }

  const handleAddTicket = () => {
    setCurrentTicket(null);
    setModalIsOpen(true);
  };
  const handleSave = async () => {
    setModalIsOpen(false);
  };

  const handleEditTicket = (ticket) => {
    setCurrentTicket(ticket);
    setModalIsOpen(true);
  };

  const handleDeleteTicket = (id) => {
    setTicketToDelete(id);
    setDeleteDialogOpen(true);
  };

  const updateArrayStateHandler = (ticket) => {
    const ticketIndex = tickets.findIndex(element => element.ticketId === ticket.ticketId);
    const newArray = [...tickets.slice(0, ticketIndex), ticket, ...tickets.slice(ticketIndex + 1)]
    setTickets(newArray);
  }

  const handleSaveTicket = async (ticket) => {
    try {
      if (ticket.ticketId) {
        const dbTicket = await apiService.put('/private/tickets', ticket);
        console.log(dbTicket)
        updateArrayStateHandler(dbTicket);
      } else {
        await apiService.post('/private/tickets', ticket);
        await loadTickets();
      }
      setModalIsOpen(false);
    } catch (error) {
      console.error('There was an error saving the ticket!', error);
      alert('There was an error saving the ticket! Check the console for more details.');
    }
  };

  const confirmDeleteTicket = async () => {
    try {
      if (ticketToDelete) {
        await apiService.delete(`/private/tickets/${ticketToDelete}`);
        setDeleteDialogOpen(false);
        setModalIsOpen(false);
        setTicketToDelete(null);
        loadTickets();
      }
    } catch (error) {
      console.error('There was an error deleting the ticket!', error);
      alert('There was an error deleting the ticket! Check the console for more details.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTickets = tickets.filter((ticket) =>
    ticket.passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Fragment>
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <h1 style={{ paddingBottom: "8px", paddingRight: "800px", textAlign: "center", margin: "25px 0" }}>Tickets</h1>
        <TextField
          label="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: 'action.active', cursor: 'pointer' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TicketGrid
        tickets={filteredTickets}
        onAdd={handleAddTicket}
        onEdit={handleEditTicket}
      />
      {modalIsOpen && (
        <EditTicket
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          onSave={handleSaveTicket}
          ticketData={currentTicket}
          onDelete={handleDeleteTicket}
          onReload={() => setReload(!reload)}
        />
      )}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this ticket?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={confirmDeleteTicket} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default Tickets;
