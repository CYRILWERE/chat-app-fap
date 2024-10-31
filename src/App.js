import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ChatRoom from './ChatRoom';
const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('auth') === 'true'
    );

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/chat"
                    element={isAuthenticated ? <ChatRoom /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
/*import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Chat from './Chat';
import Register from './Register';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authStatus = localStorage.getItem('auth') === 'true';
        setIsAuthenticated(authStatus);
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={<Login setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/chat"
                    element={
                        isAuthenticated ? <Chat /> : <Navigate to="/login" />
                    }
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
***
**/