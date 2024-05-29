import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Container, Modal, Paper } from '@mui/material';
import DataTable from '../../util/DataTable';
import EmployeeModal from './EmployeeModal';
import { apiService } from '../../util/apiService';
import { useRouteLoaderData } from 'react-router-dom';

const EmployeeList = () => {
    const auth = useRouteLoaderData("root");

    const [employees, setEmployees] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [modalMode, setModalMode] = useState('add');
    const [searchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const apiUrl = '/private/employees';

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            setLoading(true);
            const data = await apiService.get(apiUrl);
            setEmployees(data);
            setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the employees!', error);
            alert('There was an error fetching the employees! Check the console for more details.');
            setLoading(false);
        }
    };

    const handleAddEmployee = () => {
        setCurrentEmployee(null);
        setModalMode('add');
        setModalIsOpen(true);
    };

    const handleEditEmployee = (employee) => {
        setCurrentEmployee(employee);
        setModalMode('edit');
        setModalIsOpen(true);
    };

    const handleViewEmployee = (employee) => {
        setCurrentEmployee(employee);
        setModalMode('view');
        setModalIsOpen(true);
    };

    const handleDeleteEmployee = async (id) => {
        try {
            await apiService.delete(`${apiUrl}/${id}`);
            setEmployees(employees.filter(employee => employee.employeeId !== id));
            setDeleteModalIsOpen(false);
        } catch (error) {
            console.error('There was an error deleting the employee!', error);
            alert('There was an error deleting the employee! Check the console for more details.');
        }
    };

    const handleSaveEmployee = async () => {
        setModalIsOpen(false);
        await loadEmployees();
    };

    const handleOpenDeleteModal = (id) => {
        setEmployeeToDelete(id);
        setDeleteModalIsOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setEmployeeToDelete(null);
        setDeleteModalIsOpen(false);
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns = [
        { field: 'employeeId', headerName: 'Employee ID', width: 150 },
        {
          field: 'name',
          headerName: 'Name',
          width: 200,
          renderCell: (params) => (
            <Button 
              onClick={() => handleViewEmployee(params.row)} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {params.row.name}
            </Button>
          )
        },
        { field: 'role', headerName: 'Role', width: 200 },
        { field: 'contactInfo', headerName: 'Contact Info', width: 250 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            renderCell: (params) => (
                auth.role === 'ADMIN' && (
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEditEmployee(params.row)}
                            size="medium"
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleOpenDeleteModal(params.row.employeeId)}
                            style={{ marginLeft: '10px' }}
                            size="medium"
                        >
                            Delete
                        </Button>
                    </div>
                )
            ),
        },
    ];

    const customStyles = {
        modalContent: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '2rem',
            outline: 'none',
            width: '450px',
        },
        dataTable: {
            height: '500px',
            width: '100%',
            margin: '1rem 0',
        },
    };

    return (
        <Container maxWidth="lg">
            <Box textAlign="center" mb={2}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Employee
                </Typography>
                {auth.role === 'ADMIN' && (
                    <Button variant="contained" color="primary" onClick={handleAddEmployee}>
                        Add Employee
                    </Button>
                )}
            </Box>
            <Box sx={customStyles.dataTable}>
                <DataTable
                    rows={filteredEmployees}
                    columns={columns}
                    loading={loading}
                    sx={{ m: 1 }}
                    id="employeeId"
                />
            </Box>
            <EmployeeModal
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                onSave={handleSaveEmployee}
                employeeData={currentEmployee}
                mode={modalMode}
                existingUsernames={employees.map(employee => employee.username)}
            />
            <Modal
                open={deleteModalIsOpen}
                onClose={handleCloseDeleteModal}
                aria-labelledby="delete-confirmation-title"
                aria-describedby="delete-confirmation-description"
            >
                <Paper style={customStyles.modalContent}>
                    <Typography id="delete-confirmation-title" variant="h6" component="h2">
                        Confirm Deletion
                    </Typography>
                    <Typography id="delete-confirmation-description" variant="body1">
                        Are you sure you want to delete this employee?
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleCloseDeleteModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDeleteEmployee(employeeToDelete)}
                        >
                            Confirm
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </Container>
    );
};

export default EmployeeList;
