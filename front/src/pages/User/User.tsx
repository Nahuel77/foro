import React, { useState } from "react";
import './User.css';
import { useAuth } from "../../context/AuthContext";
import { passwordChange } from "../../api/auth";

const User: React.FC = () => {
    const user = useAuth();

    const [formData, setFormData] = useState({
        oldpass: '',
        newpass: '',
        repeatpass: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChangePass = async () => {
        if (!formData.oldpass || !formData.newpass || !formData.repeatpass) {
            alert('Todos los campos deben completarse');
        }else{
            if (formData.newpass === formData.repeatpass) {
                try {
                    const response = await passwordChange({ pass: formData.oldpass, newpass: formData.newpass });
                    if (response.status === 200) {
                        alert('Contraseña actualizada con exito.');
                    }
                } catch (err: any) {
                    if (err.response.status === 401) {
                        alert('La contraseña actual ingresada es incorrecta');
                    } else {
                        alert('Error al intentar cambiar la contraseña');
                    }
                }
            } else {
                alert('La nueva contraseña no coincide con la repetida');
            }
        }
    }

    return (
        <>
            <div className="user-panel">
                <h2>{user.userName}</h2>
                <div className="panel-content">
                    <div className="panel-foto">
                        <img src="/icon/user.png" alt="user" className="user-img" />
                        <div className="boton-foto"><span className="head-span">Foto de perfil</span><button>Cargar</button></div>
                    </div>
                    <div className="panel-contraseña">
                        <span className="head-span">Cambiar contraseña</span>
                        <input
                            onChange={handleChange}
                            type="password"
                            className="input-change-pass"
                            placeholder="Contraseña Actual"
                            name="oldpass"
                        />
                        <input
                            onChange={handleChange}
                            type="password"
                            className="input-change-pass"
                            placeholder="Contraseña Nueva"
                            name="newpass"
                        />
                        <input
                            onChange={handleChange}
                            type="password"
                            className="input-change-pass"
                            placeholder="Repetir Nueva Contraseña"
                            name="repeatpass"
                        />
                        <button
                            onClick={handleChangePass}
                            className="btn-change-pass">Cambiar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User;