import React from "react";
import './Login.css'


const Login: React.FC = () => {
    
    return (
        <>
            <div className="content">
                <h2>Login</h2>
                <form action="login">
                    <input type="text" />
                    <input type="text" />
                    <button>Entrar</button>
                </form>
            </div>
        </>
    )
}

export default Login;