import React, { useEffect, useState } from "react";
import DataTable from "../../util/DataTable";
import { format } from 'date-fns';
import { Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel, Checkbox, ListItemText } from "@mui/material";
import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiService } from "../../util/apiService";
import { useRouteLoaderData } from "react-router-dom";
import FlightsModal from "./FlightsModal";

const Flights = () => {
    const [rows, setRows] = useState([]);
    const [airports, setAirports] = useState([]);
    const [aircrafts, setAircrafts] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRow, setCurrentRow] = useState({
        flightNumber: '',
        departureAirport: '',
        arrivalAirport: '',
        departureTime: '',
        arrivalTime: '',
        aircraft: '',
        employees: []
    });
    const [errors, setErrors] = useState({});
    const auth = useRouteLoaderData("root");

    useEffect(() => {
        async function fetchFlights() {
            try {
                const response = await apiService.get("/public/flights");
                const flights = response;
                console.log("Fetched flights:", flights);
                setRows(flights);
            } catch (error) {
                console.error("Error fetching flights:", error);
            }
        }

        fetchFlights();
    }, []);

    const fetchAirports = async () => {
        try {
            const response = await apiService.get("/public/airports");
            const airportsData = response;
            console.log("Fetched airports:", airportsData);
            setAirports(airportsData);
        } catch (error) {
            console.error("Error fetching airports:", error);
        }
    };

    const fetchAircrafts = async () => {
        try {
            const response = await apiService.get("/private/aircrafts");
            const aircraftsData = response;
            console.log("Fetched aircrafts:", aircraftsData);
            setAircrafts(aircraftsData);
        } catch (error) {
            console.error("Error fetching aircrafts:", error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await apiService.get("/private/employees");
            const employeesData = response;
            console.log("Fetched employees:", employeesData);
            setEmployees(employeesData);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const handleEditClick = (id) => async () => {
        const rowToEdit = rows.find((row) => row.flightId === id);
        setCurrentRow({
            ...rowToEdit,
            employees: rowToEdit.employees || []
        });
        setIsEditing(true);
        setOpenModal(true);
        await fetchAircrafts();
        await fetchAirports();
        await fetchEmployees();

    };

    const handleAddClick = async () => {
        setCurrentRow({
            flightNumber: '',
            departureAirport: '',
            arrivalAirport: '',
            departureTime: '',
            arrivalTime: '',
            aircraft: '',
            employees: []
        });
        setIsEditing(false);
        setOpenModal(true);
        await fetchAirports();
        await fetchAircrafts();
        await fetchEmployees();
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setCurrentRow({
            flightNumber: '',
            departureAirport: '',
            arrivalAirport: '',
            departureTime: '',
            arrivalTime: '',
            aircraft: '',
            employees: []
        });
        setErrors({});
    };

    const validateInput = (row) => {
        const newErrors = {};

        if (!row.flightNumber || row.flightNumber.length > 10) {
            newErrors.flightNumber = "Flight Number is required and should not exceed 10 characters.";
        }

        if (!row.departureAirport || !row.departureAirport.airportId) {
            newErrors.departureAirport = "Departure Airport is required.";
        }

        if (!row.arrivalAirport || !row.arrivalAirport.airportId) {
            newErrors.arrivalAirport = "Arrival Airport is required.";
        }

        if (!row.aircraft || !row.aircraft.aircraftId) {
            newErrors.aircraft = "Aircraft is required.";
        }

        if (!row.employees || row.employees.length === 0) {
            newErrors.employees = "At least one employee is required.";
        }

        const departureTime = new Date(row.departureTime);
        const arrivalTime = new Date(row.arrivalTime);

        if (!row.departureTime || isNaN(departureTime.getTime())) {
            newErrors.departureTime = "Valid Departure Time is required.";
        }

        if (!row.arrivalTime || isNaN(arrivalTime.getTime())) {
            newErrors.arrivalTime = "Valid Arrival Time is required.";
        }

        if (departureTime >= arrivalTime) {
            newErrors.time = "Departure Time must be earlier than Arrival Time.";
        }

        return newErrors;
    };

    const handleSaveClick = async () => {
        const newErrors = validateInput(currentRow);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const updatedRow = { ...currentRow };
        const formattedDepartureTime = updatedRow.departureTime ? new Date(new Date(currentRow.departureTime).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : '';
        const formattedArrivalTime = updatedRow.arrivalTime ? new Date(new Date(currentRow.arrivalTime).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : '';

        const flightDto = {
            flightNumber: updatedRow.flightNumber,
            departureAirportId: updatedRow.departureAirport.airportId,
            arrivalAirportId: updatedRow.arrivalAirport.airportId,
            departureTime: formattedDepartureTime,
            arrivalTime: formattedArrivalTime,
            aircraftId: updatedRow.aircraft.aircraftId,
            employeeIds: updatedRow.employees ? updatedRow.employees.map(emp => emp.employeeId) : []
        };

        try {
            if (isEditing) {
                await apiService.put(`/private/flights`, { ...flightDto, flightId: updatedRow.flightId });
                setRows(rows.map((row) => (row.flightId === updatedRow.flightId ? updatedRow : row)));
            } else {
                const response = await apiService.post(`/private/flights`, flightDto);
                setRows([...rows, response]);
            }
            handleModalClose();
        } catch (error) {
            console.error("Error saving the flight:", error);
        }
    };

    const handleDeleteClick = (id) => () => {
        apiService.delete(`/private/flights/${id}`);
        setRows(rows.filter((row) => row.flightId !== id));
    };

    const handleInputChange = (field) => (event) => {
        setCurrentRow({ ...currentRow, [field]: event.target.value });
    };

    const handleAirportChange = (field) => (event) => {
        const airport = airports.find(airport => airport.airportId === event.target.value);
        setCurrentRow({ ...currentRow, [field]: airport });
    };

    const handleAircraftChange = (field) => (event) => {
        const aircraft = aircrafts.find(aircraft => aircraft.aircraftId === event.target.value);
        setCurrentRow({ ...currentRow, [field]: aircraft });
    };

    const handleEmployeeChange = (event) => {
        const value = event.target.value;
        const selectedEmployees = value.map(id => employees.find(emp => emp.employeeId === id));
        setCurrentRow({
            ...currentRow,
            employees: selectedEmployees,
        });
    };

    const columns = [
        { field: 'flightId', headerName: 'Flight ID', editable: true },
        { field: 'flightNumber', headerName: 'Flight Number', width: 150, editable: true },
        {
            field: 'departureAirportId',
            headerName: 'Departure Airport',
            width: 150,
            valueGetter: params => {
                const airport = params.row.departureAirport;
                return airport ? airport.name : '';
            },
        },
        {
            field: 'arrivalAirportId',
            headerName: 'Arrival Airport',
            width: 200,
            valueGetter: params => {
                const airport = params.row.arrivalAirport;
                return airport ? airport.name : '';
            },
        },
        {
            field: 'aircraftId',
            headerName: 'Aircraft',
            width: 200,
            valueGetter: params => {
                const aircraft = params.row.aircraft;
                return aircraft ? aircraft.tailNumber : '';
            },
        },
        {
            field: 'departureTime',
            headerName: 'Departure Time',
            width: 210,
            valueGetter: params => new Date(params.row.departureTime),
            valueFormatter: params => params.value ? format(params.value, 'yyyy-MM-dd HH:mm:ss') : '',
        },
        {
            field: 'arrivalTime',
            headerName: 'Arrival Time',
            width: 210,
            valueGetter: params => new Date(params.row.arrivalTime),
            valueFormatter: params => params.value ? format(params.value, 'yyyy-MM-dd HH:mm:ss') : '',
        },
    ];

    if (auth && auth.role !== "PASSENGER") {
        columns.push(
            {
                field: 'employees',
                headerName: 'Employees',
                width: 300,
                valueGetter: params => {
                    return params.row.employees ? params.row.employees.map(emp => emp.name).join(', ') : '';
                },
            },
            {
                field: 'actions',
                type: 'actions',
                headerName: 'Actions',
                width: 100,
                cellClassName: 'actions',
                getActions: ({ id }) => {
                    return [
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleEditClick(id)}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(id)}
                            color="inherit"
                        />,
                    ];
                },
            });
    }

    return (
        <Container className="home" maxWidth="xl">
            <h1 style={{ paddingBottom: "8px" }}>Flights</h1>
            {auth && (auth.role === "ADMIN" || auth.role === "EMPLOYEE") && (
                <Button variant="contained" color="primary" onClick={handleAddClick}>
                    Add New Flight
                </Button>
            )}
            <DataTable
                rows={rows}
                columns={columns}
                loading={!rows.length}
                sx={{ m: 1 }}
                id="flightId"
            />
            <FlightsModal
                currentRow={currentRow}
                isEditing={isEditing}
                openModal={openModal}
                handleInputChange={handleInputChange}
                errors={errors}
                handleAirportChange={handleAirportChange}
                handleAircraftChange={handleAircraftChange}
                handleEmployeeChange={handleEmployeeChange}
                airports={airports}
                aircrafts={aircrafts}
                employees={employees}
                handleModalClose={handleModalClose}
                handleSaveClick={handleSaveClick}
            />
        </Container>
    );
}

export default Flights;