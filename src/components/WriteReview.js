import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Rating } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewService from '../services/ReviewService';

const WriteReview = () => {
    const { contractorId } = useParams();
    const [textBody, setTextBody] = useState('');
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    const saveReview = (e) => {
        e.preventDefault();
        const review = {
            textBody,
            rating,
            contractor: { userId: contractorId },
            reviewer: { userId: localStorage.getItem('userId') },
        };
        ReviewService.createReview(review).then(() => {
            navigate(`/contractor/${contractorId}`);
        }).catch((error) => {
            console.error('Error creating review:', error);
        });
    };

    return (
        <Box sx={{ padding: 4, maxWidth: 600, margin: 'auto', marginTop: 8 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                Write a Review
            </Typography>
            <form onSubmit={saveReview}>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="body1">Rating:</Typography>
                    <Rating
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                        precision={1}
                        required
                    />
                </Box>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Your Review"
                    multiline
                    rows={4}
                    value={textBody}
                    onChange={(e) => setTextBody(e.target.value)}
                    required
                />
                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{ marginTop: 2 }}
                >
                    Submit Review
                </Button>
                <Button
                    variant="text"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={() => navigate(`/contractor/${contractorId}`)}
                >
                    Cancel
                </Button>
            </form>
        </Box>
    );
};

export default WriteReview;
