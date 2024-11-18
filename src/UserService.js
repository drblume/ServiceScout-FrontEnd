import axios from 'axios'

const USER_API_BASE_URL = "http://localhost/api/users";

class UserService {
    getUsers() {
        return axios.get(USER_API_BASE_URL);
    }
}
export default UserService