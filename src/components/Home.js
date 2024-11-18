import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    const popularContractors = [
        { id: 1, name: 'John Doe - Electrician', image: 'https://via.placeholder.com/150', description: 'Top-rated electrician in your area.' },
        { id: 2, name: 'Jane Smith - Painter', image: 'https://via.placeholder.com/150', description: 'Expert in interior and exterior painting.' },
    ];

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: 4 }}>
            {/* Navigation Bar */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Service Scout
                    </Typography>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/create-account">Create Account</Button>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box sx={{ padding: 4, textAlign: 'center', backgroundColor: '#1976d2', color: 'white' }}>
                <Typography variant="h3" gutterBottom>Welcome to Service Scout</Typography>
                <Typography variant="h6">Find trusted contractors for your home projects in minutes.</Typography>
            </Box>

            {/* Popular Contractors */}
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" textAlign="center" gutterBottom>Popular Contractors</Typography>
                <Grid container spacing={4}>
                    {popularContractors.map((contractor) => (
                        <Grid item xs={12} sm={6} md={4} key={contractor.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={contractor.image}
                                    alt={contractor.name}
                                />
                                <CardContent>
                                    <Typography variant="h6">{contractor.name}</Typography>
                                    <Typography variant="body2">{contractor.description}</Typography>
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
