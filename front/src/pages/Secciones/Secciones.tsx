import React, { useEffect, useState } from "react";
import './Secciones.css';
import Navbar from "../../components/Navbar/Navbar";
import Seccion from "../../components/Seccion/Seccion";
import { loadSecciones } from "../../api/auth";

const Secciones: React.FC = () => {
    const [secciones, setSecciones] = useState<any[]>([]);

    const fetchSecciones = async () => {
        try {
            const response = await loadSecciones({});
            setSecciones(response.data);
        } catch (err) {
            console.error('Error al cargar los posts: ', err);
        }
    };

    useEffect(() => {
        fetchSecciones();
    }, []);

    return (
        <>
            <Navbar />
            <div className="secciones-content">
                <h2 className="secciones-titulo">Secciones</h2>
                <div className="secciones">

                    {secciones.length > 0 ? (
                        secciones.map((seccion) => (
                            <Seccion
                                title={seccion.title}
                                seccion={`/${seccion.seccion}`}
                                descripcion={seccion.description}
                            />
                        ))
                    ) : (
                        <p className="no-post">No hay posts disponibles.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Secciones;