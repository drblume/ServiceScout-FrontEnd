import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock API call for login
        if (credentials.username && credentials.password) {
            alert('Logged in successfully!');
            navigate('/'); // Redirect to homepage
        } else {
            alert('Invalid credentials!');
        }
    };

    return (
        <Box sx={{ padding: 4, maxWidth: 400, margin: 'auto', marginTop: 8 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Username"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <Button variant="contained" fullWidth type="submit" sx={{ marginTop: 2 }}>Login</Button>
                <Button
                    variant="text"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={() => navigate('/create-account')}
                >
                    Create Account
                </Button>
            </form>
        </Box>
    );
};

export default Login;
