import React from "react";
import './Login.css'


const Login: React.FC = () => {
    
    return (
        <>
            <div className="log-content">
                <h2>Login</h2>
                <form action="login" className="form">
                    <input type="text" placeholder="Email"/>
                    <input type="text" placeholder="Contraseña"/>
                    <button className="log-btn">Entrar</button>
                </form>
            </div>
        </>
    )
}

export default Login;