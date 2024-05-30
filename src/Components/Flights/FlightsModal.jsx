import { Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from "@mui/material";

const FlightsModal = ({
    currentRow,
    isEditing,
    openModal,
    handleInputChange,
    errors,
    handleAirportChange,
    airports,
    handleModalClose,
    handleSaveClick
}) => {

    return (
        <Dialog open={openModal} onClose={handleModalClose}>
            <DialogTitle>{isEditing ? "Edit Flight" : "Add Flight"}</DialogTitle>
            <DialogContent>
                {currentRow && (
                    <>
                        <TextField
                            margin="dense"
                            label="Flight Number"
                            type="text"
                            fullWidth
                            value={currentRow.flightNumber || ''}
                            onChange={handleInputChange('flightNumber')}
                            error={!!errors.flightNumber}
                            helperText={errors.flightNumber}
                        />
                        <TextField
                            margin="dense"
                            label="Departure Airport"
                            select
                            fullWidth
                            value={currentRow.departureAirport?.airportId || ''}
                            onChange={handleAirportChange('departureAirport')}
                            error={!!errors.departureAirport}
                            helperText={errors.departureAirport}
                        >
                            {airports.map((airport) => (
                                <MenuItem key={airport.airportId} value={airport.airportId}>
                                    {airport.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            margin="dense"
                            label="Arrival Airport"
                            select
                            fullWidth
                            value={currentRow.arrivalAirport?.airportId || ''}
                            onChange={handleAirportChange('arrivalAirport')}
                            error={!!errors.arrivalAirport}
                            helperText={errors.arrivalAirport}
                        >
                            {airports.map((airport) => (
                                <MenuItem key={airport.airportId} value={airport.airportId}>
                                    {airport.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            margin="dense"
                            label="Departure Time"
                            type="datetime-local"
                            fullWidth
                            value={currentRow.departureTime ? new Date(currentRow.departureTime).toISOString().slice(0, 16) : ''}
                            onChange={handleInputChange('departureTime')}
                            error={!!errors.departureTime || !!errors.time}
                            helperText={errors.departureTime || errors.time}
                        />
                        <TextField
                            margin="dense"
                            label="Arrival Time"
                            type="datetime-local"
                            fullWidth
                            value={currentRow.arrivalTime ? new Date(currentRow.arrivalTime).toISOString().slice(0, 16) : ''}
                            onChange={handleInputChange('arrivalTime')}
                            error={!!errors.arrivalTime || !!errors.time}
                            helperText={errors.arrivalTime || errors.time}
                        />
                        <TextField
                            margin="dense"
                            label="Tail Number"
                            type="text"
                            fullWidth
                            value={currentRow.aircraft?.tailNumber || ''}
                            onChange={handleInputChange('aircraft')}
                        />
                        <TextField
                            margin="dense"
                            label="Model"
                            type="text"
                            fullWidth
                            value={currentRow.aircraft?.model || ''}
                            onChange={handleInputChange('aircraft')}
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleModalClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSaveClick} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FlightsModal;
