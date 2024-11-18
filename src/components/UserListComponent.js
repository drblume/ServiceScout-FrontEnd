import React, { useState, useEffect } from 'react';
import UserService from '../UserService';
import { Link } from 'react-router-dom';

const UserListComponent = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        UserService.getUsers().then((res) => {
            setUsers(res.data);
        });
        document.title = 'User List';
    })
}
export default UserListComponent;