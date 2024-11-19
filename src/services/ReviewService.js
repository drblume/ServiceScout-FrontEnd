import axios from 'axios';

const REVIEW_API_BASE_URL = "http://localhost:8080/api/reviews";

class ReviewService {
  // Get all reviews
  getAllReviews() {
    return axios.get(REVIEW_API_BASE_URL);
  }

  // Get all flagged reviews
  getFlaggedReviews() {
    return axios.get(`${REVIEW_API_BASE_URL}/flagged`);
  }

  // Get review by ID
  getReviewById(id) {
    return axios.get(`${REVIEW_API_BASE_URL}/${id}`);
  }

  // Get reviews by reviewer ID
  getReviewsByReviewerId(reviewerId) {
    return axios.get(`${REVIEW_API_BASE_URL}/reviewer/${reviewerId}`);
  }

  // Get reviews by contractor ID
  getReviewsByContractorId(contractorId) {
    return axios.get(`${REVIEW_API_BASE_URL}/contractor/${contractorId}`);
  }

  // Create a new review
  createReview(review) {
    return axios.post(REVIEW_API_BASE_URL, review);
  }

  // Update an existing review
  updateReview(id, updatedReview) {
    return axios.put(`${REVIEW_API_BASE_URL}/${id}`, updatedReview);
  }

  // Delete a review
  deleteReview(id) {
    return axios.delete(`${REVIEW_API_BASE_URL}/${id}`);
  }
}

export default new ReviewService();
