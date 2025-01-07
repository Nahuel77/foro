import React from "react";
import './SideBoard.css';
import { useNavigate } from "react-router-dom";


const SideBoard: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/nuevopost");
    };

    return (
        <>
            <div className="sideboard-content">
                <div className="add-tema-content" onClick={handleNavigate}>
                    <img src="/icon/add-icon.svg" alt="nuevo post" className="add-post-icon" />
                    <span>Agregar Tema</span>
                </div>
            </div>
        </>
    )
}

export default SideBoard;