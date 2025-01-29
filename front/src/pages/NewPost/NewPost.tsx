import React, { useState } from "react";
import './NewPost.css';
import Redactor from "../../components/Redactor/Redactor";
import { newPost } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { QuoteProvider } from "../../context/QuoteContext";

const NuevoPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const location = useLocation();
    const { seccion } = location.state || {};
    const { userName } = useAuth();
    const navigate = useNavigate();

    const handleSavePost = async () => {

        if (!userName) {
            alert('No Name');
            return;
        }

        try {
            const response = await newPost({ title, content, seccion, userName });
            alert('Post agregado');
            navigate(`/post/${response.data.post._id}`);
        } catch (err: any) {
            console.error('Error al crear el post: ', err.response?.data || err.message);
            alert('Error al intentar crear el post');
        }
    }

    return (
        <>
            <div className="add-post-content">
                <h2>Nuevo Post</h2>
                <div className="add-panel" id="editor-container">
                    <div className="title-conteiner">
                        <span className="post-title">Titulo: </span>
                        <input
                            type="text"
                            className="title-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <Redactor content={content} setContent={setContent} onSave={handleSavePost} />
                </div>
            </div>
        </>
    )
}

const NewPost: React.FC = () => {
    return <QuoteProvider><NuevoPost /></QuoteProvider>
}

export default NewPost;