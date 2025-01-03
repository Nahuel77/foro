import React, { useState } from "react";
import './Register.css'
import {registerUser} from '../../../../back/controllers/authController.js'


const Register: React.FC = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.name})
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await registerUser(formData);
            alert("Registro exitoso");
        }catch (err){
            alert('Error en el registro: ' + err.response.data.message);
        }
    };

    return (
        <>
            <div className="reg-content">
                <h2>Registro</h2>
                <form onSubmit={handleSubmit} action="login" className="form">
                    <input type="text" placeholder="Email" onChange={handleChange}/>
                    <input type="text" placeholder="Usuario" onChange={handleChange}/>
                    <input type="text" placeholder="Contraseña" onChange={handleChange}/>
                    <input type="text" placeholder="Repetir Contraseña" onChange={handleChange}/>
                    <button type="submit" className="reg-btn">Registrar</button>
                </form>
            </div>
        </>
    )
}

export default Register;