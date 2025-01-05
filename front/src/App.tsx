import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from './components/Header/Header';
import { useAuth } from './context/AuthContext';
import User from './pages/User/User';
import Secciones from './pages/Secciones/Secciones';

const App: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                {!isAuthenticated ? (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </>
                ) : (
                    <>
                        <Route path="/secciones" element={<Secciones />} />
                        <Route path="/usuario" element={<User />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                )}
            </Routes>
        </>
    );
};

export default App;
