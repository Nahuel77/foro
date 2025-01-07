import React from "react";
import './Secciones.css';
import Navbar from "../../components/Navbar/Navbar";
import Seccion from "../../components/Seccion/Seccion";

const Secciones: React.FC = () => {

    return (
        <>
            <Navbar />
            <div className="secciones-content">
                <h2 className="secciones-titulo">Secciones</h2>
                <div className="secciones">
                    <Seccion title="General" seccion="/general"/>
                    <Seccion title="Recuros" seccion="/recursos"/>
                    <Seccion title="Consultas" seccion="/consultas"/>
                    <Seccion title="Eventos" seccion="/eventos"/>
                </div>
            </div>
        </>
    )
}

export default Secciones;