const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let users = []; // Store registered users
let onlineUsers = {}; // Track online users with socket IDs

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Handle user registration
    socket.on('register', (username) => {
        // Register the user if not already registered
        if (!users.includes(username)) {
            users.push(username);
        }
        // Add to online users
        onlineUsers[socket.id] = username;
        io.emit('updateUserList', { users, onlineUsers: Object.values(onlineUsers) });
    });

    // Handle sending messages
    socket.on('chatMessage', (message) => {
        io.emit('broadcastMessage', message); // Broadcast the message to all clients
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        const username = onlineUsers[socket.id];
        delete onlineUsers[socket.id]; // Remove user from online list
        io.emit('updateUserList', { users, onlineUsers: Object.values(onlineUsers) });
        console.log('Client disconnected:', socket.id);
    });
});

server.listen(5000, () => console.log('Server running on port 5000'));

/*const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // React app origin
        methods: ["GET", "POST"],
    },
});

app.use(cors());

let onlineUsers = [];

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Listen for a new user joining the chat
    socket.on('newUser', (username) => {
        onlineUsers.push({ id: socket.id, username });
        io.emit('updateUserList', onlineUsers);
    });

    // Listen for messages from clients
    socket.on('chatMessage', (message) => {
        io.emit('broadcastMessage', message); // Broadcast to all connected clients
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);
        io.emit('updateUserList', onlineUsers);
        console.log('User disconnected:', socket.id);
    });
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
}
*/