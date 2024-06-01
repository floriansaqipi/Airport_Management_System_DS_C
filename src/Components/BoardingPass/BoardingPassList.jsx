import React, { useState, useEffect } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import DataTable from '../../util/DataTable';
import { Container, Box, Typography, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiService } from '../../util/apiService';

export default function BoardingPassList() {
    const [boardingPasses, setBoardingPasses] = useState([]);
    const auth = useRouteLoaderData('root');

    useEffect(() => {
        loadBoardingPasses();
    }, []);

    const loadBoardingPasses = async () => {
        try {
            const data = await apiService.get('/private/boarding_passes');
            setBoardingPasses(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('There was an error fetching the boarding passes!', error);
            alert('There was an error fetching the boarding passes! Check the console for more details.');
        }
    };

    const handleDeleteBoardingPass = async (id) => {
        try {
            await apiService.delete('/private/boarding_passes/' + id);
            setBoardingPasses(boardingPasses.filter(boardingPass => boardingPass.boardingPassId !== id));
        } catch (error) {
            console.error('There was an error deleting the boarding pass!', error);
            alert('There was an error deleting the boarding pass! Check the console for more details.');
        }
    };

    const columns = [
        {
            field: 'boardingPassId',
            headerName: 'ID',
            width: 100,
            renderCell: (params) => (
                auth ? (
                    <Link to={`${params.row.boardingPassId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {params.row.boardingPassId}
                    </Link>
                ) : (
                    <span>{params.row.boardingPassId}</span>
                )
            )
        },
        {
            field: 'gate',
            headerName: 'Gate',
            width: 150
        },
        {
            field: 'boardingTime',
            headerName: 'Boarding Time',
            width: 300,
            valueGetter: (params) => {
                const boardingTime = params.row.boardingTime;
                return boardingTime ? new Date(boardingTime).toLocaleString() : 'N/A';
            }
        },
        {
            field: 'ticket',
            headerName: 'Ticket ID',
            width: 200,
            renderCell: (params) => {
                const ticket = params.row.ticket;
                const ticketDisplay = ticket ? `${ticket.ticketId}` : 'N/A';
                return auth ? (
                    ticket ? (
                        <Link
                            to={`../tickets/${ticket.ticketId}`}
                            state={{ from: '/boarding_passes' }}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            {ticketDisplay}
                        </Link>
                    ) : (
                        <span>{ticketDisplay}</span>
                    )
                ) : (
                    <span>{ticketDisplay}</span>
                );
            }
        }
    ];

    if (auth) {
        columns.push(
            {
                field: 'edit',
                headerName: 'Edit',
                width: 97,
                renderCell: (params) => (
                    <Link to={`${params.row.boardingPassId}/edit`} style={{ textDecoration: 'none' }}>
                        <IconButton color="primary">
                            <EditIcon />
                        </IconButton>
                    </Link>
                )
            },
            {
                field: 'delete',
                headerName: 'Delete',
                width: 97,
                renderCell: (params) => (
                    <IconButton
                        color="secondary"
                        onClick={() => handleDeleteBoardingPass(params.row.boardingPassId)}
                    >
                        <DeleteIcon />
                    </IconButton>
                )
            }
        );
    }

    return (
        <Container maxWidth="lg">
            <Box textAlign="center">
                <Typography variant="h4" component="h1" gutterBottom>
                    Boarding Passes
                </Typography>
                {auth && (
                    <Link to="new" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                            Add Boarding Pass
                        </Button>
                    </Link>
                )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
                <Box sx={{ width: '100%', maxWidth: 1000 }}>
                    <DataTable
                        rows={boardingPasses}
                        columns={columns}
                        loading={!boardingPasses.length}
                        sx={{ m: 1, width: '100%' }}
                        id="boardingPassId"
                    />
                </Box>
            </Box>
        </Container>
    );
}