// src/components/ContractorDashboard.js
import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Container, Box, Divider, Select, MenuItem, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import RequestService from '../services/RequestService';

const ContractorDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [updatedStatus, setUpdatedStatus] = useState({});
    const contractorId = localStorage.getItem('userId'); // Assuming contractorId is stored in localStorage
    const navigate = useNavigate();

    useEffect(() => {
        if (!contractorId) {
            navigate('/login'); // Redirect if no contractorId is found
            return;
        }
        RequestService.getRequestsByContractorId(contractorId)
            .then((response) => setRequests(response.data))
            .catch((error) => console.error('Error fetching requests:', error));
    }, [contractorId, navigate]);

    const handleStatusChange = (requestId, newStatus) => {
        setUpdatedStatus((prevStatus) => ({
            ...prevStatus,
            [requestId]: newStatus,
        }));
    };

    const updateRequestStatus = (requestId) => {
        const newStatus = updatedStatus[requestId];
        if (newStatus) {
            RequestService.updateRequestStatus(requestId, newStatus)
                .then(() => {
                    setRequests((prevRequests) =>
                        prevRequests.map((request) =>
                            request.requestId === requestId ? { ...request, status: newStatus } : request
                        )
                    );
                    alert('Request status updated successfully!');
                })
                .catch((error) => {
                    console.error('Error updating request status:', error);
                    alert('Failed to update request status.');
                });
        }
    };

    const handleDeleteRequest = (requestId) => {
        RequestService.deleteRequest(requestId)
            .then(() => {
                setRequests((prevRequests) => prevRequests.filter((request) => request.requestId !== requestId));
                alert('Request deleted successfully!');
            })
            .catch((error) => {
                console.error('Error deleting request:', error);
                alert('Failed to delete request.');
            });
    };

    return (
        <Container>
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Contractor Dashboard
                </Typography>
                <Link to={`/contractor/${contractorId}/edit`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" sx={{ marginBottom: 2 }}>
                        Edit Account
                    </Button>
                </Link>
                {requests.length > 0 ? (
                    <List>
                        {requests.map((request) => (
                            <Box key={request.requestId} sx={{ marginBottom: 2 }}>
                                <ListItem alignItems="flex-start" sx={{ borderBottom: '1px solid #ccc', padding: 2 }}>
                                    <ListItemText
                                        primary={
                                            <>
                                                <Typography variant="h6">
                                                    Request from {request.customer?.name || 'Unknown'}
                                                </Typography>
                                                <Typography>
                                                    <strong>Description:</strong> {request.description}
                                                </Typography>
                                                <Typography>
                                                    <strong>Status:</strong> {request.status}
                                                </Typography>
                                            </>
                                        }
                                        secondary={
                                            <>
                                                <Typography variant="body2">
                                                    <strong>Customer Name:</strong> {request.customer?.name || 'N/A'}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong>Email:</strong> {request.customer?.email || 'N/A'}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong>Phone:</strong> {request.customer?.phoneNumber || 'N/A'}
                                                </Typography>
                                            </>
                                        }
                                    />
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginLeft: 2 }}>
                                        <Select
                                            value={updatedStatus[request.requestId] || request.status}
                                            onChange={(e) => handleStatusChange(request.requestId, e.target.value)}
                                            sx={{ minWidth: 120 }}
                                        >
                                            <MenuItem value="PENDING">PENDING</MenuItem>
                                            <MenuItem value="ACCEPTED">ACCEPTED</MenuItem>
                                            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                                        </Select>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => updateRequestStatus(request.requestId)}
                                        >
                                            Update Status
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDeleteRequest(request.requestId)}
                                        >
                                            Delete Request
                                        </Button>
                                    </Box>
                                </ListItem>
                                <Divider />
                            </Box>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1">No requests available.</Typography>
                )}
            </Box>
        </Container>
    );
};

export default ContractorDashboard;