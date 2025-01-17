import React, { useEffect, useState } from "react";
import './Seccion.css';
import { useNavigate } from 'react-router-dom';
import { getPosts } from "../../api/auth";

interface SeccionProps {
    title: string;
    seccion: string;
    descripcion: string;
}



const Seccion: React.FC<SeccionProps> = ({ title, seccion, descripcion }) => {
    const navigate = useNavigate();
    const [lastPost, setLastPost] = useState<any | null>(null);

    const handleNavigate = () => {
        navigate(`/${seccion}`, { state: { title, seccion } });
    };

    const fetchLatestPost = async () => {
        try {
            const response = await getPosts({ section: seccion, top: '1' });
            if (response.data.length > 0) {
                setLastPost(response.data[0]);
            } else {
                setLastPost(null);
            }
        } catch (err) {
            console.error('Error al cargar el ultimo post: ', err);
        }
    }

    useEffect(() => {
        fetchLatestPost();
    }, []);

    return (
        <>
            <div className="seccion">
                <div className="categoria" onClick={handleNavigate}>
                    <h3>{title}</h3>
                    <p>{descripcion}</p>
                </div>
                <div className="ultimo-post">
                    <span>Ultimo tema:</span>
                    {lastPost !== null ? (
                        <span>{lastPost.title}</span>
                    ) : (
                        <p>No hay post para mostrar</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Seccion;