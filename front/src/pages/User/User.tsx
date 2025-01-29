import React, { useEffect, useState } from "react";
import './User.css';
import { useAuth } from "../../context/AuthContext";
import { passwordChange, uploadpic } from "../../api/auth";

const User: React.FC = () => {
    const user = useAuth();
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string>(
        localStorage.getItem("userProfileImage") || "/icon/user.png");

    const [formData, setFormData] = useState({
        oldpass: '',
        newpass: '',
        repeatpass: '',
    });

    useEffect(()=>{
        if(user.avatar != null || user.avatar != undefined){
            setProfileImage(user.avatar);
            localStorage.setItem("userProfileImage", user.avatar);
        }else{
            setProfileImage('/icon/user.png');
        }
    }, [user.avatar]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChangePass = async () => {
        if (!formData.oldpass || !formData.newpass || !formData.repeatpass) {
            alert('Todos los campos deben completarse');
        } else {
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

    const handlePicUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];

            try {
                setUploadStatus("Subiendo archivo...");
                await uploadFileToServer(file);
                setUploadStatus("Archivo subido con éxito 🎉");
            } catch (error) {
                console.error("Error al subir el archivo:", error);
                setUploadStatus("Error al subir el archivo ❌");
            }
        }
    };

    const uploadFileToServer = async (file: File) => {
        try {
            const response = await uploadpic({ pic: file });
            if (response.status === 200) {
                const imageUrl = URL.createObjectURL(file);
                localStorage.setItem("userProfileImage", imageUrl);
                setProfileImage(imageUrl);
                setUploadStatus("Archivo subido con éxito 🎉");
            } else {
                setProfileImage("/icon/user.png");
            }
        } catch (err: any) {
            setProfileImage("/icon/user.png");
            console.error('Error al intentar subir el archivo: ', err.message);
            setUploadStatus("Error al subir el archivo ❌");
        }
    }

    return (
        <>
            <div className="user-panel">
                <h2>{user.userName}</h2>
                <div className="panel-content">

                    <div className="panel-foto">
                        <img
                            src={profileImage}
                            alt="user"
                            className="user-img"
                            onError={() => { setProfileImage("/icon/user.png") }}
                        />
                        <div className="boton-foto">
                            <span className="head-span">Foto de perfil</span>
                            <label htmlFor="file-upload" className="pic-upload-label">Cargar</label>
                            <input id="file-upload" type="file" onChange={handlePicUpload} accept="image/*" />
                            <span>{uploadStatus}</span>
                        </div>
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