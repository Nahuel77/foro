import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from './components/Header/Header';
import { useAuth } from './context/AuthContext';
import User from './pages/User/User';
import Secciones from './pages/Secciones/Secciones';
import General from './pages/General/General';
import Recursos from './pages/Recursos/Recursos';
import Consultas from './pages/Consultas/Consultas';
import Eventos from './pages/Eventos/Eventos';
import NewPost from './pages/NewPost/NewPost';
import OnPost from './pages/OnPost/OnPost';
import OnSeccion from './pages/OnSeccion/OnSeccion';

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
                        <Route path="/usuario" element={<User />} />
                        <Route path="/:seccion/nuevopost" element={<NewPost />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                )}
                <Route path="/secciones" element={<Secciones />} />
                <Route path="/general" element={<OnSeccion />} />
                <Route path="/recursos" element={<OnSeccion />} />
                <Route path="/consultas" element={<OnSeccion />} />
                <Route path="/eventos" element={<OnSeccion />} />
                <Route path="/post/:id" element={<OnPost />} />  
            </Routes>
        </>
    );
};

export default App;
