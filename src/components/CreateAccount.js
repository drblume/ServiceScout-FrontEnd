import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const [accountDetails, setAccountDetails] = useState({
        username: '',
        password: '',
        role: 'user',
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock API call for account creation
        alert(`Account created successfully for ${accountDetails.name}!`);
        console.log('Account Details:', accountDetails);
        navigate('/'); // Redirect to homepage after account creation
    };

    return (
        <Box sx={{ padding: 4, maxWidth: 600, margin: 'auto', marginTop: 8 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                Create Account
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Username"
                    name="username"
                    value={accountDetails.username}
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
                <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Role</FormLabel>
                    <RadioGroup
                        row
                        name="role"
                        value={accountDetails.role}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                        <FormControlLabel value="contractor" control={<Radio />} label="Contractor" />
                    </RadioGroup>
                </FormControl>
                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{ marginTop: 2 }}
                >
                    Create Account
                </Button>
            </form>
        </Box>
    );
};

export default CreateAccount;

