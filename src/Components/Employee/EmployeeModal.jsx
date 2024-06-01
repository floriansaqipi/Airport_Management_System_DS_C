import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button, TextField, Box, Typography } from '@mui/material';
import { apiService } from '../../util/apiService';
import { useRouteLoaderData } from 'react-router-dom';

Modal.setAppElement('#root');

const EmployeeModal = ({ isOpen, onClose, onSave, employeeData, mode }) => {
    const [employee, setEmployee] = useState({
        employeeId: '',
        name: '',
        role: '',
        contactInfo: '',
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [existingUsernames, setExistingUsernames] = useState([]);
    const [fetchingUsernames, setFetchingUsernames] = useState(false);

    useEffect(() => {
        if (isOpen && fetchingUsernames) {
            apiService.get('private/users')
                .then(users => {
                    const usernames = users.map(user => user.username);
                    setExistingUsernames(usernames);
                })
                .catch(error => {
                    console.error('Error fetching existing usernames:', error);
                })
                .finally(() => {
                    setFetchingUsernames(false);
                });
        }
    }, [isOpen, fetchingUsernames]);

    useEffect(() => {
        console.log('Existing Usernames:', existingUsernames);
    }, [existingUsernames]);

    useEffect(() => {
        if (employeeData) {
            setEmployee({
                employeeId: employeeData.employeeId || '',
                name: employeeData.name || '',
                role: employeeData.role || '',
                contactInfo: employeeData.contactInfo || '',
                username: employeeData.username || '',
                password: '', // Always set password as empty when editing
            });
        } else {
            setEmployee({
                employeeId: '',
                name: '',
                role: '',
                contactInfo: '',
                username: '',
                password: '',
            });
        }
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

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    };

    const validate = () => {
        const newErrors = {};
        if (!employee.name) newErrors.name = 'Name is required';
        if (!employee.role) newErrors.role = 'Role is required';
        if (!employee.contactInfo) {
            newErrors.contactInfo = 'Email is required';
        } else if (!validateEmail(employee.contactInfo)) {
            newErrors.contactInfo = 'Invalid email format';
        }
        if (!employee.username) {
            newErrors.username = 'Username is required';
        } else if (
            existingUsernames.includes(employee.username) &&
            (mode !== 'edit' || employee.username !== employeeData?.username)
        ) {
            newErrors.username = 'Username is already taken';
        }
        if (!employee.password && !employeeData?.employeeId) {
            newErrors.password = 'Password is required';
        } else if (employee.password && !validatePassword(employee.password)) {
            newErrors.password = 'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            if (employee.employeeId) {
                await apiService.put('/private/employees', employee);
            } else {
                await apiService.post('/private/auth/employees/register', employee);
            }
            onSave(employee);
        } catch (error) {
            console.error("Here is the error: " + error);
            setErrors(prevErrors => ({
                ...prevErrors,
                username: 'Username is taken!'
            }));
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

    const auth = useRouteLoaderData("root");

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Employee Modal" style={customStyles}>
            <Box p={3}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {mode === 'view' ? 'Employee Details' : (employeeData ? 'Edit Employee' : 'Add Employee')}
                </Typography>
                {auth && auth.role === "ADMIN" && mode !== 'view' && (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="name"
                            label="Name"
                            value={employee.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            name="role"
                            label="Role"
                            value={employee.role}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.role}
                            helperText={errors.role}
                        />
                        <TextField
                            name="contactInfo"
                            label="Email"
                            value={employee.contactInfo}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.contactInfo}
                            helperText={errors.contactInfo}
                        />
                        <TextField
                            name="username"
                            label="Username"
                            value={employee.username}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.username}
                            helperText={errors.username}
                        />
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            value={employee.password}
                            placeholder="Enter new password"
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.password}
                            helperText={errors.password}
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
                        <Typography variant="body1">
                        Role: {employee.role}</Typography>
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
