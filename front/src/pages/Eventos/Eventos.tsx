import React from "react";
import './Eventos.css'
import Navbar from "../../components/Navbar/Navbar";


const Eventos: React.FC = () => {

    return (
        <>
            <Navbar />
            <div className="eventos-content">
                <h3>Eventos</h3>
            </div>
        </>
    )
}

export default Eventos;