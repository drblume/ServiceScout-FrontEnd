import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Card, CardContent, Avatar, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const ContractorProfile = () => {
    const { contractorId } = useParams();
    const [contractor, setContractor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the contractor details using the ID from the URL
        UserService.getUserById(contractorId)
            .then((response) => {
                setContractor(response.data);
            })
            .catch((error) => {
                console.error('Error fetching contractor details:', error);
            });
    }, [contractorId]);

    if (!contractor) {
        return (
            <Box sx={{ padding: 4, textAlign: 'center' }}>
                <Typography variant="h6">Loading contractor details...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4, maxWidth: 800, margin: 'auto', marginTop: 8 }}>
            <Card sx={{ padding: 4 }}>
                {/* Contractor Avatar */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: 4 }}>
                    <Avatar
                        alt={contractor.name}
                        src="https://via.placeholder.com/150" // Placeholder image for contractor
                        sx={{ width: 150, height: 150 }}
                    />
                    <Typography variant="h4" sx={{ marginTop: 2 }}>{contractor.name}</Typography>
                    <Typography variant="subtitle1" sx={{ color: 'gray' }}>{contractor.specialties?.join(', ') || 'Various Specialties'}</Typography>
                </Box>

                {/* Contractor Details */}
                <CardContent>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="body1"><strong>Email:</strong> {contractor.email}</Typography>
                        <Typography variant="body1"><strong>Phone Number:</strong> {contractor.phoneNumber}</Typography>
                        <Typography variant="body1"><strong>Business Address:</strong> {contractor.address}</Typography>
                    </Box>

                    {/* Add more detailed sections if needed */}
                </CardContent>

                {/* Back Button */}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 4 }}
                    onClick={() => navigate('/')}
                >
                    Back to Homepage
                </Button>
            </Card>
        </Box>
    );
};

export default ContractorProfile;
