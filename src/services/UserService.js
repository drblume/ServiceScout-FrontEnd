import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/users";

class UserService {
    getFlaggedAccounts() {
        return axios.get(`${USER_API_BASE_URL}/flagged`);
    }

    assignSpecialtiesToUser(userId, specialtyIds) {
        return axios.put(`${USER_API_BASE_URL}/${userId}/specialties`, specialtyIds);
    }

    getAllUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    getUserById(id) {
        return axios.get(`${USER_API_BASE_URL}/${id}`);
    }

    createUser(user) {
        return axios.post(USER_API_BASE_URL, user);
    }

    updateUser(id, updatedUser) {
        return axios.put(`${USER_API_BASE_URL}/${id}`, updatedUser);
    }

    deleteUser(id) {
        return axios.delete(`${USER_API_BASE_URL}/${id}`);
    }

   login(credentials) {
           return axios.post(`${USER_API_BASE_URL}/login`, credentials);
       }

}

export default new UserService();
