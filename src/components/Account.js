import React, { useState, useEffect } from 'react';
import { Typography, Button, Container, Card, Box } from '@mui/material';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve userId from localStorage
        const userId = localStorage.getItem('userId');
        if (userId) {
            UserService.getUserById(userId)
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching user details:', error);
                });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <Container className="mt-5">
            <Card className="p-4">
                <Typography variant="h4" className="text-center mb-4">
                    My Account
                </Typography>
                {user && (
                    <>
                        <Typography><strong>User Name:</strong> {user.userName}</Typography>
                        <Typography><strong>Name:</strong> {user.name}</Typography>
                        <Typography><strong>Email:</strong> {user.email}</Typography>
                        <Typography><strong>Phone Number:</strong> {user.phoneNumber}</Typography>
                        <Typography><strong>Role:</strong> {user.role}</Typography>
                        <Box sx={{ mt: 4, display: 'flex', gap: 2, flexDirection: 'column' }}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => navigate('/edit-account')}
                            >
                                Edit Account
                            </Button>
                            <Button
                                color="secondary"
                                variant="outlined"
                                onClick={() => navigate('/')}
                            >
                                Back to Homepage
                            </Button>
                        </Box>
                    </>
                )}
            </Card>
        </Container>
    );
};

export default Account;
