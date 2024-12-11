import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import UserService from '../services/UserService';

const EditContractorAccount = () => {
    const { contractorId } = useParams();
    const [contractor, setContractor] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        UserService.getUserById(contractorId)
            .then((response) => {
                setContractor(response.data);
            })
            .catch((error) => {
                console.error('Error fetching contractor details:', error);
            });
    }, [contractorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContractor((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.updateUser(contractorId, contractor)
            .then(() => {
                alert('Account updated successfully!');
                navigate(`/contractor/${contractorId}`);
            })
            .catch((error) => {
                console.error('Error updating account:', error);
                alert('Failed to update account. Please try again.');
            });
    };

    return (
        <Box sx={{ padding: 4, maxWidth: 600, margin: 'auto', marginTop: 8 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>Edit Contractor Account</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    name="name"
                    value={contractor.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    value={contractor.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Phone Number"
                    name="phoneNumber"
                    value={contractor.phoneNumber}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Address"
                    name="address"
                    value={contractor.address}
                    onChange={handleChange}
                    required
                />
                <Button variant="contained" fullWidth type="submit" sx={{ marginTop: 2 }}>Update Account</Button>
            </form>
        </Box>
    );
};

export default EditContractorAccount;
