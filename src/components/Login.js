import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await UserService.login({
                userName: credentials.username,
                password: credentials.password
            });
            if (response.status === 200) {
                const user = response.data;

                // Store user ID in localStorage
                localStorage.setItem('userId', user.userId);
                localStorage.setItem('userRole', user.role); // Optional: Store role if needed

                alert(`Logged in successfully as ${user.role}!`);
                navigate('/');  // Redirect to homepage after successful login
            }
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data : error.message);
            alert('Invalid credentials, please try again.');
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
