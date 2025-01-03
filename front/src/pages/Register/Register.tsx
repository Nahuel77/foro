import React from "react";
import './Register.css'


const Register: React.FC = () => {

    return (
        <>
            <div className="reg-content">
                <h2>Registro</h2>
                <form action="login" className="form">
                    {/* <span>Usuario:</span> */}
                    <input type="text" placeholder="Email"/>
                    <input type="text" placeholder="Usuario"/>
                    <input type="text" placeholder="Contraseña"/>
                    <input type="text" placeholder="Repetir Contraseña"/>
                    <button className="reg-btn">Registrar</button>
                </form>
            </div>
        </>
    )
}

export default Register;