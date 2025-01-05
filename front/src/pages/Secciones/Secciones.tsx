import React from "react";
import './Secciones.css';
import Navbar from "../../components/Navbar/Navbar";
import Seccion from "../../components/Seccion/seccion";

const Secciones: React.FC = () => {

    return (
        <>
            <Navbar />
            <div className="secciones-content">
                <h2 className="secciones-titulo">Secciones</h2>
                <div className="secciones">
                    <Seccion/>
                    <Seccion/>
                    <Seccion/>
                    <Seccion/>
                </div>
            </div>
        </>
    )
}

export default Secciones;