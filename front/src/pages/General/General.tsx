import React from "react";
import './General.css'
import Navbar from "../../components/Navbar/Navbar";
import Board from "../../components/Board/Board";
import SideBoard from "../../components/SideBoard/SideBoard";
import { useAuth } from "../../context/AuthContext";


const General: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const seccion = 'general';

    return (
        <>
            <Navbar />
            <div className="general-content">
                <h2>General</h2>
                <div className="board-content">
                    {!isAuthenticated ? (
                        <>
                            <Board />
                        </>
                    ) : (
                        <>
                            <SideBoard seccion={seccion} />
                            <Board />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default General;