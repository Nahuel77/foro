import React, { useState } from "react";
import './Register.css';
import { register } from '../../api/auth.ts';

const Register: React.FC = () => {

    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await register(formData);
            alert("Registro exitoso");
        } catch (err: any) {
            alert('Error en el registro: ' + err.response.data.message);
        }
    };

    return (
        <>
            <div className="reg-content">
                <h2>Registro</h2>
                <form onSubmit={handleSubmit} action="login" className="form">
                    <input name="email"
                        type="text"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="reg-input" />
                    <input name="userName"
                        type="text"
                        placeholder="Usuario"
                        value={formData.userName}
                        onChange={handleChange}
                        className="reg-input" />
                    <input name="password"
                        type="text"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        value={formData.password}
                        className="reg-input" />
                    {/* <input name="password"
                        type="text"
                        placeholder="Repetir Contraseña"
                        onChange={handleChange}
                        className="reg-input" /> */}
                    <button type="submit" className="reg-btn">Registrar</button>
                </form>
            </div>
        </>
    )
}

export default Register;