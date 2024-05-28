import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Paper, CircularProgress } from '@mui/material';
import { apiService } from '../../util/apiService';

const Signup = () => {
  const [credentials, setCredentials] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.fullName) newErrors.fullName = 'Full name is required';
    if (!credentials.email) newErrors.email = 'Email is required';
    if (credentials.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!credentials.username) newErrors.username = 'Username is required';
    if (!credentials.password) newErrors.password = 'Password is required';
    if (credentials.password && credentials.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    if (credentials.password !== credentials.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      await apiService.post('/auth/register', {
        fullName: credentials.fullName,
        email: credentials.email,
        username: credentials.username,
        password: credentials.password
      });
      navigate('/login');
    } catch (error) {
      setErrors({ ...errors, form: 'Error during registration. Try again later.' });
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="fullName"
            label="Full Name"
            value={credentials.fullName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.fullName}
            helperText={errors.fullName}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            name="username"
            label="Username"
            value={credentials.username}
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
            value={credentials.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={credentials.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          {errors.form && (
            <Typography color="error" variant="body2" align="center">
              {errors.form}
            </Typography>
          )}
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              size="large"
            >
              {loading ? <CircularProgress size={24} /> : 'Signup'}
            </Button>
          </Box>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;