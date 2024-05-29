import { useState, useEffect, Fragment } from "react";
import TicketGrid from "./TicketGrid";
import EditTicket from "./EditTicket";
import { apiService } from "../../services/apiService";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const Tickets = () => {
  const [reload, setReload]=useState(false);
  const [tickets, setTickets] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);

  useEffect(() => {
    loadTickets();
  }, [reload]);

  const loadTickets = async () => {
    try {
      const data = await apiService.get('/private/tickets');
      setTickets(data);
    } catch (error) {
      console.error('There was an error fetching the tickets!', error);
      alert('There was an error fetching the tickets! Check the console for more details.');
    }
  };

  const handleReload = ()=>{
    setReload(!reload);
  }

  const handleAddTicket = () => {
    setCurrentTicket(null);
    setModalIsOpen(true);
  };
  const handleSave= async () => {
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
  
  const handleSaveTicket = async (ticket) => {
    try {
      if (ticket.ticketId) {
        await apiService.put('/private/tickets', ticket);
      } else {
        await apiService.post('/private/tickets', ticket);
      }
      setModalIsOpen(false);
      loadTickets();
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

  return (
    <Fragment>
      <TicketGrid 
        tickets={tickets} 
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
