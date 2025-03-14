import React, { useState } from "react";
import './Login.css';
import { login as loginAPI } from '../../api/auth.ts';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await loginAPI(formData);
            if (response.status === 200) {
                const { token, userName, userId, avatar } = response.data;
                const userAvatar = avatar || '/icon/user.png';
                localStorage.setItem('token', token);
                localStorage.setItem('userName', userName);
                localStorage.setItem('userId', userId);
                localStorage.setItem('userProfileImage', userAvatar);
                login('user', userName, userId, userAvatar);
                navigate('/');
            }
        } catch (err: any) {
            if (err.response.status === 404) {
                setError(err.response?.data?.message || 'Usuario no encontrado');
            } else if (err.response.status === 401) {
                setError(err.response?.data?.message || 'Contraseña incorrecta');
            } else {
                alert('Error inesperado al intentar logear');
            }
        }
    };

    return (
        <>
            <div className="log-content">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} action="login" className="form">
                    <input name="email"
                        type="text"
                        placeholder="Email"
                        onChange={handleChange}
                        value={formData.email}
                        className="log-input" />
                    <input name="password"
                        type="password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        value={formData.password}
                        className="log-input" />
                    <button type="submit"
                        className="log-btn">Entrar</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    )
}

export default Login;