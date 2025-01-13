import React from "react";
import './Seccion.css';
import { useNavigate } from 'react-router-dom';

interface SeccionProps {
    title: string;
    seccion: string;
    descripcion: string;
}

const Seccion: React.FC<SeccionProps> = ({ title, seccion, descripcion }) => {   
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/${seccion}`, { state: { title, seccion } });
    };

    return (
        <>
            <div className="seccion">
                <div className="categoria" onClick={handleNavigate}>
                    <h3>{ title }</h3>
                    <p>{ descripcion }</p>
                </div>
                <div className="ultimo-post">
                    <span>Ultimo tema:</span>
                    <a href="">Lorem ipsum dolor sit amet consectetur.</a>
                </div>
            </div>
        </>
    )
}

export default Seccion;