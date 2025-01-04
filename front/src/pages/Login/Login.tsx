import React, { useState } from "react";
import './Login.css';
import { login } from '../../api/auth.ts';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            const token = response.data.token;
            localStorage.setItem('token', token);
            alert('Inicio de sesión exitoso');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
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
                        type="text"
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