import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user from online users list
        const onlineUsers = JSON.parse(localStorage.getItem('onlineUsers')) || [];
        const updatedOnlineUsers = onlineUsers.filter((user) => user.username !== localStorage.getItem('authUser'));
        localStorage.setItem('onlineUsers', JSON.stringify(updatedOnlineUsers));

        // Clear authentication
        localStorage.removeItem('auth');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
