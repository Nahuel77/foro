import React from "react";
import './User.css';
import { useAuth } from "../../context/AuthContext";

const User: React.FC = () => {
    const user = useAuth();

    return (
        <>
            <div className="user-panel">
                <h2>{user.userName}</h2>
                <div className="panel-content">
                    <div className="panel-foto">
                        <img src="/icon/user.png" alt="user" className="user-img" />
                        <div className="boton-foto"><span>Foto de perfil</span><button>Cargar</button></div>
                    </div>
                    <div className="panel-contraseña">
                        <span>Cambiar contraseña</span>
                        <input type="text" className="input-change-pass" placeholder="Contraseña Actual"/>
                        <input type="text" className="input-change-pass" placeholder="Contraseña Nueva"/>
                        <input type="text" className="input-change-pass" placeholder="Repetir Nueva Contraseña"/>
                        <button className="btn-change-pass">Cambiar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User;