import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const EditAccount = () => {
    const [accountDetails, setAccountDetails] = useState({
        userId: '',
        userName: '',
        password: '',
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve userId from localStorage
        const userId = localStorage.getItem('userId');
        if (userId) {
            UserService.getUserById(userId)
                .then((response) => {
                    setAccountDetails(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching user details:', error);
                });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await UserService.updateUser(accountDetails.userId, accountDetails);
            alert('Account updated successfully!');
            navigate('/account'); // Redirect back to account page after update
        } catch (error) {
            console.error('Error updating account:', error);
            alert('There was an error updating the account. Please try again.');
        }
    };

    return (
        <Box sx={{ padding: 4, maxWidth: 600, margin: 'auto', marginTop: 8 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                Edit Account
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Username"
                    name="userName"
                    value={accountDetails.userName}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    name="password"
                    type="password"
                    value={accountDetails.password}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    name="name"
                    value={accountDetails.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    type="email"
                    value={accountDetails.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Phone Number"
                    name="phoneNumber"
                    value={accountDetails.phoneNumber}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Address"
                    name="address"
                    value={accountDetails.address}
                    onChange={handleChange}
                    required
                />
                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{ marginTop: 2 }}
                >
                    Update Account
                </Button>
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={() => navigate('/account')}
                >
                    Cancel
                </Button>
            </form>
        </Box>
    );
};

export default EditAccount;
