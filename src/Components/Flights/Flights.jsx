import { useEffect, useState } from "react";
import DataTable from '../../util/DataTable';
import { format } from 'date-fns';
import { Container } from "@mui/material";

const columns = [
    { field: 'flightId', headerName: 'Flight ID' },
    { field: 'flightNumber', headerName: 'Flight Number', width : '150'},
    {
        field: 'departureAirport.name',
        headerName: 'Departure Airport',
        width: 150,
        valueGetter: params => params.row.departureAirport.name
    },
    {
        field: 'arrivalAirport.name',
        headerName: 'Arrival Airport',
        width: 200,
        valueGetter: params => params.row.arrivalAirport.name
    },
    {
        field: 'departureTime',
        headerName: 'Departure Time',
        width: 200,
        valueGetter: params => new Date(params.row.departureTime),
        valueFormatter: params => format(params.value, 'yyyy-MM-dd HH:mm')
    },
    {
        field: 'arrivalTime',
        headerName: 'Arrival Time',
        width: 200,
        valueGetter: params => new Date(params.row.arrivalTime),
        valueFormatter: params => format(params.value, 'yyyy-MM-dd HH:mm')
    },
    { field: 'aricraft.tailNumber', headerName: 'Arrival Airport', width: 200, valueGetter: params => params.row.aircraft.tailNumber }
];


export default function Flights() {

    const [loadedFlights, setLoadedFlights] = useState([]);

    useEffect(() => {
        async function fetchFlights() {

            const response = await fetch("/api/public/flights")
            if (!response.ok) {
                // .. 
            }

            const flights = await response.json();


            setLoadedFlights(flights);
        }

        fetchFlights();

    }, []);

    return (
        <Container 
            className="home"
            maxWidth = "xl">
            <h1 style={{paddingBottom: "8px"}}>Flights</h1>
            {
                <DataTable
                    rows={loadedFlights}
                    columns={columns}
                    loading={!loadedFlights.length}
                    sx={{ m: 1 }}
                />
            }
        </Container>
    )
}