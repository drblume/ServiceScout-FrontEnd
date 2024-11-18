import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    CardHeader,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Chip,
} from '@mui/material';

const ContractorDashboard = ({ contractorId }) => {
    const [profile, setProfile] = useState({
        userName: '',
        email: '',
        phoneNumber: '',
        address: '',
        specialties: [],
    });
    const [specialties, setSpecialties] = useState([]);
    const [allSpecialties, setAllSpecialties] = useState([]);

    useEffect(() => {
        // Fetch contractor profile
        axios.get(`/api/users/${contractorId}`)
            .then((res) => setProfile(res.data))
            .catch((err) => console.error('Error fetching profile:', err));

        // Fetch all specialties for dropdown
        axios.get('/api/specialties')
            .then((res) => setAllSpecialties(res.data))
            .catch((err) => console.error('Error fetching specialties:', err));
    }, [contractorId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = () => {
        axios.put(`/api/users/${contractorId}`, profile)
            .then(() => alert('Profile updated successfully'))
            .catch((err) => console.error('Error updating profile:', err));
    };

    const handleAssignSpecialties = () => {
        const specialtyIds = specialties.map((s) => s.id);
        axios.put(`/api/users/${contractorId}/specialties`, specialtyIds)
            .then(() => alert('Specialties assigned successfully'))
            .catch((err) => console.error('Error assigning specialties:', err));
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                Contractor Dashboard
            </Typography>
            <Grid container spacing={4}>
                {/* Profile Section */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3}>
                        <CardHeader title="Profile Information" />
                        <CardContent>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Name"
                                name="userName"
                                value={profile.userName}
                                onChange={handleInputChange}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                name="email"
                                type="email"
                                value={profile.email}
                                onChange={handleInputChange}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Phone Number"
                                name="phoneNumber"
                                value={profile.phoneNumber}
                                onChange={handleInputChange}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Address"
                                name="address"
                                value={profile.address}
                                onChange={handleInputChange}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 2 }}
                                onClick={handleSaveProfile}
                            >
                                Save Profile
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Specialties Section */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3}>
                        <CardHeader title="Specialties" />
                        <CardContent>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="specialties-label">Specialties</InputLabel>
                                <Select
                                    labelId="specialties-label"
                                    multiple
                                    value={specialties.map((s) => s.id)}
                                    onChange={(e) =>
                                        setSpecialties(
                                            [...e.target.value].map((id) =>
                                                allSpecialties.find((s) => s.id === id)
                                            )
                                        )
                                    }
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((id) => {
                                                const specialty = allSpecialties.find((s) => s.id === id);
                                                return <Chip key={id} label={specialty?.name} />;
                                            })}
                                        </Box>
                                    )}
                                >
                                    {allSpecialties.map((specialty) => (
                                        <MenuItem key={specialty.id} value={specialty.id}>
                                            {specialty.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                sx={{ marginTop: 2 }}
                                onClick={handleAssignSpecialties}
                            >
                                Assign Specialties
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ContractorDashboard;

