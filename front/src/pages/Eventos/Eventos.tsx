import React from "react";
import './Eventos.css'
import Navbar from "../../components/Navbar/Navbar";


const Eventos: React.FC = () => {

    return (
        <>
            <Navbar />
            <div className="eventos-content">
                <h2>Eventos</h2>
            </div>
        </>
    )
}

export default Eventos;