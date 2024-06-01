import React, { useState, useEffect } from 'react';
import { useParams, Link, useRouteLoaderData } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Container, Paper, Grid } from '@mui/material';
import { apiService } from '../../util/apiService';

const BoardingPassDetail = () => {
    const [boardingPass, setBoardingPass] = useState(null);
    const { boardingPassId } = useParams();
    const auth = useRouteLoaderData('root');

    useEffect(() => {
        loadBoardingPass(boardingPassId);
    }, [boardingPassId]);

    const loadBoardingPass = async (id) => {
        try {
            const data = await apiService.get(`/private/boarding_passes/${id}`);
            setBoardingPass(data);
        } catch (error) {
            console.error('There was an error fetching the boarding pass details!', error);
            alert(`There was an error fetching the boarding pass details! ${error.message}`);
        }
    };

    if (!boardingPass) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="sm">
            <Paper style={{ padding: '16px', marginTop: '32px' }}>
                <Card>
                    <CardContent>
                        <Grid container direction="column" alignItems="center" spacing={2}>
                            <Grid item>
                                <Typography variant="h6" component="div" align="center">
                                    Boarding Pass ID: {boardingPass.boardingPassId}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" color="textSecondary" align="center">
                                    Gate: {boardingPass.gate}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" color="textSecondary" align="center">
                                    Boarding Time: {new Date(boardingPass.boardingTime).toLocaleString()}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" color="textSecondary" align="center">
                                    Ticket ID: {boardingPass.ticket.ticketId}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" color="textSecondary" align="center">
                                    Seat Number: {boardingPass.ticket.seatNumber}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" color="textSecondary" align="center">
                                    Class: {boardingPass.ticket._class}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Box mt={2}>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item>
                                            {auth && (auth.role === "ADMIN" || auth.role === "EMPLOYEE") && (
                                                <Link to={`/boarding_passes/${boardingPass.boardingPassId}/edit`} style={{ textDecoration: 'none' }}>
                                                    <Button variant="contained" color="primary">
                                                        Edit
                                                    </Button>
                                                </Link>
                                            )}
                                        </Grid>
                                        <Grid item>
                                            <Link to=".." style={{ textDecoration: 'none' }}>
                                                <Button variant="contained" color="secondary">
                                                    Back
                                                </Button>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Paper>
        </Container>
    );
};

export default BoardingPassDetail;