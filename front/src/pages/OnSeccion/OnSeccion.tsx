import React from "react";
import './OnSeccion.css'
import Navbar from "../../components/Navbar/Navbar";
import Board from "../../components/Board/Board";
import SideBoard from "../../components/SideBoard/SideBoard";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

const OnSeccion: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const { seccion, title } = location.state || {};

    return (
        <>
            <Navbar />
            <div className="general-content">
                <h2>{title}</h2>
                <div className="board-content">
                    {!isAuthenticated ? (
                        <>
                            <Board seccion={seccion} />
                        </>
                    ) : (
                        <>
                            <SideBoard seccion={seccion} />
                            <Board seccion={seccion} />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default OnSeccion;