import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, CardMedia, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const Home = () => {
    const [contractors, setContractors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch contractors from the backend
        UserService.getAllUsers()
            .then((response) => {
                const contractorList = response.data.filter(user => user.role === 'CONTRACTOR');
                setContractors(contractorList);
            })
            .catch((error) => {
                console.error('Error fetching contractors:', error);
            });
    }, []);

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: 4 }}>
            {/* Hero Section */}
            <Box sx={{ padding: 4, textAlign: 'center', backgroundColor: '#1976d2', color: 'white' }}>
                <Typography variant="h3" gutterBottom>Welcome to Service Scout</Typography>
            </Box>

            {/* Contractors Section */}
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" textAlign="center" gutterBottom>Popular Contractors</Typography>
                <Grid container spacing={4}>
                    {contractors.map((contractor) => (
                        <Grid item xs={12} sm={6} md={4} key={contractor.userId}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://via.placeholder.com/150" // Placeholder image
                                    alt={contractor.name}
                                />
                                <CardContent>
                                    <Typography variant="h6">{contractor.name}</Typography>
                                    <Typography variant="body2">Services: {contractor.specialties?.join(', ') || 'Various'}</Typography>
                                    <Typography variant="body2">Phone: {contractor.phoneNumber}</Typography>
                                    <Button
                                        variant="contained"
                                        sx={{ marginTop: 2 }}
                                        onClick={() => navigate(`/contractor/${contractor.userId}`)}
                                    >
                                        View Profile
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Home;
