// src/Chat.js
import React, { useState, useEffect } from 'react';
import socket from './socket';

const Chat = ({ username }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]); // All registered users
    const [onlineUsers, setOnlineUsers] = useState([]); // Online users

    useEffect(() => {
        // Register user and update user lists
        socket.emit('register', username);

        // Listen for updated user list
        socket.on('updateUserList', ({ users, onlineUsers }) => {
            setUsers(users);
            setOnlineUsers(onlineUsers);
        });

        // Listen for broadcasted messages
        socket.on('broadcastMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Clean up listeners on unmount
        return () => {
            socket.off('updateUserList');
            socket.off('broadcastMessage');
        };
    }, [username]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            const newMessage = { user: username, text: message };
            socket.emit('chatMessage', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage('');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <h2>Chat Room</h2>

            <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
                {/* Registered & Online Users List */}
                <div style={{ flex: 1, border: '1px solid #ddd', padding: '10px' }}>
                    <h3>Users</h3>
                    <h4>Registered:</h4>
                    <ul>
                        {users.map((user, idx) => (
                            <li key={idx}>{user}</li>
                        ))}
                    </ul>
                    <h4>Online:</h4>
                    <ul>
                        {onlineUsers.map((user, idx) => (
                            <li key={idx}>{user}</li>
                        ))}
                    </ul>
                </div>

                {/* Chat Messages */}
                <div style={{ flex: 2, border: '1px solid #ddd', padding: '10px' }}>
                    <div style={{ height: '300px', overflowY: 'scroll' }}>
                        {messages.map((msg, index) => (
                            <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
                        ))}
                    </div>

                    {/* Input form to send a message */}
                    <form onSubmit={sendMessage} style={{ display: 'flex', marginTop: '10px' }}>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            style={{ flex: 1, padding: '8px' }}
                            required
                        />
                        <button type="submit" style={{ padding: '8px' }}>Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;
