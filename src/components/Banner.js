import React from 'react';
import { Box, Typography, Button, Toolbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole'); // Remove role if stored
        navigate('/login');
    };

    // Function to handle navigation to the account page
    const handleAccountPage = () => {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'CONTRACTOR') {
            navigate('/dashboard');
        } else if (userRole === 'ADMIN') {
            navigate('/admin');
        } else {
            navigate('/account');
        }
    };

    return (
        <Box sx={{
            width: '100%',
            backgroundColor: '#1976d2',  // Example blue color
            padding: 3,
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',  // Add some shadow for depth
            position: 'sticky',  // Keeps the banner sticky at the top
            top: 0,
            zIndex: 1000,  // Keeps the banner above other elements
        }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold'}}>
                Service Scout
            </Typography>
            <Typography variant="h6">Find trusted contractors for your home projects in minutes.</Typography>

            {/* Navigation Buttons */}
            <Toolbar sx={{ justifyContent: 'center', gap: 2 }}>
                <Button color="inherit" component={Link} to="/" sx={{ color: 'white' }}>Home</Button>
                <Button color="inherit" component={Link} to="/login" sx={{ color: 'white' }}>Login</Button>
                <Button color="inherit" component={Link} to="/create-account" sx={{ color: 'white' }}>Create Account</Button>
                <Button color="inherit" onClick={handleAccountPage} sx={{ color: 'white' }}>My Account</Button>
                <Button color="inherit" onClick={handleLogout} sx={{ color: 'white' }}>Logout</Button>
            </Toolbar>
        </Box>
    );
};

export default Banner;
