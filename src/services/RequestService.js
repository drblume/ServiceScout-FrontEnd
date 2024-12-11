import axios from 'axios';

const REQUEST_API_BASE_URL = "http://localhost:8080/api/requests";

class RequestService {
  // Get request by ID
  getRequestById(id) {
    return axios.get(`${REQUEST_API_BASE_URL}/${id}`);
  }

  // Create a new request
  createRequest(request) {
    return axios.post(REQUEST_API_BASE_URL, request);
  }

  // Update an existing request
  updateRequest(id, updatedRequest) {
    return axios.put(`${REQUEST_API_BASE_URL}/${id}`, updatedRequest);
  }

  // Delete a request
  deleteRequest(id) {
    return axios.delete(`${REQUEST_API_BASE_URL}/${id}`);
  }

  // Get requests by contractor ID
  getRequestsByContractorId(contractorId) {
    return axios.get(`${REQUEST_API_BASE_URL}/contractor/${contractorId}`);
  }

  // Update request status
  updateRequestStatus(requestId, status) {
    return axios.put(`${REQUEST_API_BASE_URL}/${requestId}/status`, null, {
      params: { status },
    });
  }
}

export default new RequestService();