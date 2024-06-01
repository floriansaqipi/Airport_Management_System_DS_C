import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, FormControl, InputLabel, Select, Checkbox, ListItemText } from "@mui/material";


const FlightsModal = ({
    currentRow,
    isEditing,
    openModal,
    handleInputChange,
    errors,
    handleAirportChange,
    handleAircraftChange,
    handleEmployeeChange,
    airports,
    aircrafts,
    employees,
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
                            value={currentRow.flightNumber}
                            onChange={handleInputChange('flightNumber')}
                            error={!!errors.flightNumber}
                            helperText={errors.flightNumber}
                        />
                        <TextField
                            margin="dense"
                            label="Departure Airport"
                            select
                            fullWidth
                            value={currentRow.departureAirport.airportId}
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
                            value={currentRow.arrivalAirport.airportId}
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
                            label="Aircraft"
                            select
                            fullWidth
                            value={currentRow.aircraft.aircraftId}
                            onChange={handleAircraftChange('aircraft')}
                            error={!!errors.aircraft}
                            helperText={errors.aircraft}
                        >
                            {aircrafts.map((aircraft) => (
                                <MenuItem key={aircraft.aircraftId} value={aircraft.aircraftId}>
                                    {aircraft.tailNumber}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormControl fullWidth margin="dense" error={!!errors.employees}>
                            <InputLabel>Employees</InputLabel>
                            <Select
                                multiple
                                value={currentRow.employees.map(emp => emp.employeeId)}
                                onChange={handleEmployeeChange}
                                renderValue={(selected) => employees.filter(emp => selected.includes(emp.employeeId)).map(emp => emp.name).join(', ')}
                            >
                                {employees.map((employee) => (
                                    <MenuItem key={employee.employeeId} value={employee.employeeId}>
                                        <Checkbox checked={currentRow.employees.some(emp => emp.employeeId === employee.employeeId)} />
                                        <ListItemText primary={employee.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.employees && <p style={{ color: 'red', fontSize: '12px' }}>{errors.employees}</p>}
                        </FormControl>
                        <TextField
                            margin="dense"
                            label="Departure Time"
                            InputLabelProps={{shrink: true}}
                            type="datetime-local"
                            fullWidth
                            value={currentRow.departureTime ? new Date(new Date(currentRow.departureTime).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
                            onChange={handleInputChange('departureTime')}
                            error={!!errors.departureTime || !!errors.time}
                            helperText={errors.departureTime || errors.time}
                        />
                        <TextField
                            margin="dense"
                            label="Arrival Time"
                            InputLabelProps={{shrink: true}}
                            type="datetime-local"
                            fullWidth
                            value={currentRow.arrivalTime ? new Date(new Date(currentRow.arrivalTime).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
                            onChange={handleInputChange('arrivalTime')}
                            error={!!errors.arrivalTime || !!errors.time}
                            helperText={errors.arrivalTime || errors.time}
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

export default FlightsModal