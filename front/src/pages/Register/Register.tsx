import React, { useState } from "react";
import './Register.css';
import { register } from '../../api/auth.ts';

const Register: React.FC = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e: { target: { name: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.name })
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
                    <input type="text" placeholder="Email" onChange={handleChange} className="reg-input"/>
                    <input type="text" placeholder="Usuario" onChange={handleChange} className="reg-input"/>
                    <input type="text" placeholder="Contraseña" onChange={handleChange} className="reg-input"/>
                    <input type="text" placeholder="Repetir Contraseña" onChange={handleChange} className="reg-input"/>
                    <button type="submit" className="reg-btn">Registrar</button>
                </form>
            </div>
        </>
    )
}

export default Register;