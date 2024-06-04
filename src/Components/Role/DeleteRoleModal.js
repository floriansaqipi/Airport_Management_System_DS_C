import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };

const DeleteRoleModal = ({open, handleClose, handleDeleteClick, id}) => {

    const handleDeleteCloseClick = () => {
      handleDeleteClick(id);
      handleClose();
    }

    return (
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete this ticket
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this ticket?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 5 }}>
          <Button variant="outlined" onClick={handleDeleteCloseClick}>
            Yes
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
    );
}

export default DeleteRoleModal;