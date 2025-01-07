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
                    <Seccion title="General"
                    seccion="/general"
                    descripcion="Comparte ideas, presenta nuevos miembros y conversa sobre cualquier tema."
                    />
                    <Seccion title="Recuros"
                    seccion="/recursos"
                    descripcion="Encuentra y comparte guías, materiales y enlaces útiles."
                    />
                    <Seccion title="Eventos"
                    seccion="/eventos"
                    descripcion="Entérate de los próximos eventos y noticias importantes."
                    />
                    <Seccion title="Consultas"
                    seccion="/consultas"
                    descripcion="Haz preguntas y recibe ayuda de la comunidad."
                    />
                </div>
            </div>
        </>
    )
}

export default Secciones;