// src/components/RequestPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import RequestService from '../services/RequestService';

const RequestPage = () => {
    const { contractorId } = useParams();
    const [request, setRequest] = useState({ title: '', description: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequest((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('You must be logged in to submit a request.');
            return;
        }

        RequestService.createRequest({
            ...request,
            contractor: { userId: contractorId },
            customer: { userId }
        })
        .then(() => {
            alert('Request submitted successfully!');
            navigate('/');
        })
        .catch((error) => {
            console.error('Error submitting request:', error);
            alert('Failed to submit request. Please try again.');
        });
    };


    return (
        <Box sx={{ padding: 4, maxWidth: 600, margin: 'auto', marginTop: 8 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>Submit a Request</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Title"
                    name="title"
                    value={request.title}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Description"
                    name="description"
                    value={request.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    required
                />
                <Button variant="contained" fullWidth type="submit" sx={{ marginTop: 2 }}>Submit Request</Button>
            </form>
        </Box>
    );
};

export default RequestPage;