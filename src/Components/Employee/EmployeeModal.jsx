import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button, TextField, Box, Typography } from '@mui/material';
import { apiService } from '../../util/apiService';
import { useRouteLoaderData } from 'react-router-dom';

Modal.setAppElement('#root');

const EmployeeModal = ({ isOpen, onClose, onSave, employeeData, mode, existingUsernames }) => {
    const [employee, setEmployee] = useState({
        employeeId: employeeData?.employeeId || '',
        name: employeeData?.name || '',
        role: employeeData?.role || '',
        contactInfo: employeeData?.contactInfo || '',
        username: employeeData?.username || '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const auth = useRouteLoaderData("root"); // Get auth state from router loader

    useEffect(() => {
        setEmployee({
            employeeId: employeeData?.employeeId || '',
            name: employeeData?.name || '',
            role: employeeData?.role || '',
            contactInfo: employeeData?.contactInfo || '',
            username: employeeData?.username || '',
            password: '',
        });
    }, [employeeData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevEmployee => ({
            ...prevEmployee,
            [name]: value
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (employee.employeeId) {
                await apiService.put('/private/employees', employee);
            } else {
                await apiService.post('/private/auth/employees/register', employee);
            }
            onSave(employee);
        } catch (error) {
            console.error('There was an error saving the employee!', error);
            alert('There was an error saving the employee! Check the console for more details.');
        }
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '500px', // Adjust the width as needed
            maxHeight: '90vh', // Adjust the max height
            overflowY: 'auto' // Allow scrolling if content overflows
        },
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Employee Modal" style={customStyles}>
            <Box p={3}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {mode === 'view' ? 'Employee Details' : (employeeData ? 'Edit Employee' : 'Add Employee')}
                </Typography>
                {auth && auth.role === 'ADMIN' && mode !== 'view' && (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="name"
                            label="Name"
                            value={employee.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="role"
                            label="Role"
                            value={employee.role}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="contactInfo"
                            label="Contact Info"
                            value={employee.contactInfo}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="username"
                            label="Username"
                            value={employee.username}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            value={employee.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <Box mt={2}>
                            <Button type="submit" variant="contained" color="primary">
                                {employeeData ? 'Update' : 'Add'} Employee
                            </Button>
                            <Button onClick={onClose} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
                                Cancel
                            </Button>
                        </Box>
                    </form>
                )}
                {mode === 'view' && (
                    <>
                        <Typography variant="body1">Name: {employee.name}</Typography>
                        <Typography variant="body1">Role: {employee.role}</Typography>
                        <Typography variant="body1">Contact Info: {employee.contactInfo}</Typography>
                        <Box mt={2}>
<Button variant="contained" color="secondary" onClick={onClose}>
Close
</Button>
</Box>
</>
)}
</Box>
</Modal>
);
};

export default EmployeeModal;
