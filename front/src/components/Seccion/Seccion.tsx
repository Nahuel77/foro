import React from "react";
import './Seccion.css';
import { useNavigate } from 'react-router-dom';

interface SeccionProps {
    title: string;
    seccion: string;
}

const Seccion: React.FC<SeccionProps> = ({ title, seccion }) => {   
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`${seccion}`);
    };

    return (
        <>
            <div className="seccion">
                <div className="categoria" onClick={handleNavigate}>
                    <h3>{ title }</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
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