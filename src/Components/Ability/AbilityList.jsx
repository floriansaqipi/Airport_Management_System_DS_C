import React, { useState, useEffect } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import AbilityModal from './AbilityModal';
import { apiService } from '../../util/apiService';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const AbilityList = () => {
    const [ability, setAbility] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentAbility, setCurrentAbility] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [abilityToDelete, setAbilityToDelete] = useState(null);
    const itemsPerPage = 5;
    const auth = useRouteLoaderData("root");

    const loadAbility = async () => {
        try {
            const data = await apiService.get('/private/abilities');
            setAbility(data);
        } catch (error) {
            console.error('There was an error fetching the abilities!', error);
            alert('There was an error fetching the abilities! Check the console for more details.');
        }
    };

    useEffect(() => {
        loadAbility();
    }, []);

    const handleAddAbility = () => {
        setCurrentAbility(null);
        setModalIsOpen(true);
    };

    const handleEditAbility = (ability) => {
        setCurrentAbility(ability);
        setModalIsOpen(true);
        return;
    };

    const handleDeleteAbility = (id) => {
        setAbilityToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await apiService.delete(`/private/abilities/${abilityToDelete}`)
            setAbility(ability.filter(ability => ability.abilityId !== abilityToDelete));
        } catch (error) {
            console.error('There was an error deleting the ability!', error);
            alert('There was an error deleting the ability! Check the console for more details.');
        }
        setDeleteDialogOpen(false);
    };

    const handleSaveAbility = async () => {
        setModalIsOpen(false);
        await loadAbility();
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const filteredAbilities = ability.filter(ability =>
        ability.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ability.verb.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedAbilities = filteredAbilities.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div style={{ margin: '0 auto', maxWidth: '80%', textAlign: 'center' }}>
            <h1>Abilities List</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Button variant="contained" color="primary" onClick={handleAddAbility}>
                    Add Ability
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
            <Table style={{ margin: '0 auto', width: '100%', maxWidth: '100%', }}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Entity</TableCell>
                        <TableCell>Verb</TableCell>
                        <TableCell>Field</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedAbilities.map(ability => (
                        <TableRow key={ability.abilityId}>
                            <TableCell>{ability.abilityId}</TableCell>
                            <TableCell>{ability.entity}</TableCell>
                            <TableCell>{ability.verb}</TableCell>
                            <TableCell>{ability.field}</TableCell>
                            <TableCell style={{ textAlign: 'right' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleEditAbility(ability)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDeleteAbility(ability.abilityId)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <Pagination
                    count={Math.ceil(filteredAbilities.length / itemsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Delete Ability</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this ability?
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
            <AbilityModal
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                onSave={handleSaveAbility}
                abilityData={currentAbility}
            />
        </div>
    );
};

export default AbilityList;

