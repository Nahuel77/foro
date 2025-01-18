import React from "react";
import './SideBoard.css';
import { useNavigate } from "react-router-dom";

interface SideBoardProps {
    seccion: string;
    postsLength: number;
}


const SideBoard: React.FC<SideBoardProps> = ({ seccion, postsLength }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        // console.log(seccion);
        navigate(`/${seccion}/nuevopost`, { state: { seccion } });
    };

    return (
        <>
            <div className="sideboard-content">
                <div className="add-tema-content" onClick={handleNavigate}>
                    <img src="/icon/add-icon.svg" alt="nuevo post" className="add-post-icon" />
                    <span className="add-post-span">Agregar Tema</span>
                </div>
                <div>
                    <span className="posts-length">Temas: {postsLength}</span>
                </div>
            </div>
        </>
    )
}

export default SideBoard;