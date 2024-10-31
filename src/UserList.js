import React, { useEffect, useState } from 'react';

const UserList = () => {
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        setRegisteredUsers(users);

        const online = JSON.parse(localStorage.getItem('onlineUsers')) || [];
        setOnlineUsers(online);
    }, []);

    return (
        <div>
            <h3>Registered Users</h3>
            <ul>
                {registeredUsers.map((user) => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>

            <h3>Online Users</h3>
            <ul>
                {onlineUsers.map((user) => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
