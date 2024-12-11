import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Card, CardContent, Divider } from '@mui/material';
import ReviewService from '../services/ReviewService';

const AdminDashboard = () => {
    const [flaggedReviews, setFlaggedReviews] = useState([]);

    useEffect(() => {
        // Fetch all flagged reviews
        ReviewService.getFlaggedReviews()
            .then((response) => {
                setFlaggedReviews(response.data);
            })
            .catch((error) => {
                console.error('Error fetching flagged reviews:', error);
            });
    }, []);

    const handleDeleteReview = (reviewId) => {
        ReviewService.deleteReview(reviewId)
            .then(() => {
                setFlaggedReviews((prev) => prev.filter((review) => review.reviewId !== reviewId));
                alert('Review deleted successfully!');
            })
            .catch((error) => {
                console.error('Error deleting review:', error);
                alert('Failed to delete review. Please try again.');
            });
    };

    const handleUnflagReview = (reviewId) => {
            ReviewService.unflagReview(reviewId)
                .then(() => {
                    setFlaggedReviews((prev) => prev.filter((review) => review.reviewId !== reviewId));
                    alert('Review unflagged successfully!');
                })
                .catch((error) => {
                    console.error('Error unflagging review:', error);
                    alert('Failed to unflag review. Please try again.');
                });
        }

    return (
        <Box sx={{ padding: 4, maxWidth: 800, margin: 'auto', marginTop: 8 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                Admin Dashboard
            </Typography>
            {flaggedReviews.length > 0 ? (
                flaggedReviews.map((review) => (
                    <Card key={review.reviewId} sx={{ marginBottom: 2, padding: 2 }}>
                        <CardContent>
                            <Typography variant="body2">
                                <strong>Reviewer:</strong> {review.reviewer?.userName || 'Anonymous'}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Rating:</strong> {review.rating}/5
                            </Typography>
                            <Typography variant="body2">{review.textBody}</Typography>
                            <Divider sx={{ marginY: 2 }} />
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDeleteReview(review.reviewId)}
                                >
                                    Delete Review
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleUnflagReview(review.reviewId)}
                                >
                                    Unflag Review
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    No flagged reviews available.
                </Typography>
            )}
        </Box>
    );
};

export default AdminDashboard;
