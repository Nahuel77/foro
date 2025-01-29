import React, { useState } from "react";
import './EditPost.css';
import Redactor from "../../components/Redactor/Redactor";
import { useNavigate, useLocation } from "react-router-dom";
import { updateContent } from "../../api/auth";
import { QuoteProvider } from "../../context/QuoteContext";

const EditorPost: React.FC = () => {
    const location = useLocation();
    const { id, titleUpdate, contentUpdate } = location.state || {};
    const [title, setTitle] = useState(titleUpdate);
    const [content, setContent] = useState(contentUpdate);
    const navigate = useNavigate();

    const handleSavePost = async () => {
        try {
            const response = updateContent({ contentType: 'Post', id: id, update: { content, title } });
            alert('Post editado');
            navigate(`/post/${id}`);
        } catch (err) {
            console.error("Error al actualizar el post: ", err);
        }
    }

    const handleCancel = () => {
        navigate(`/post/${id}`);

    }

    return (
        <>
            <div className="add-post-content">
                <h2>Editar Post</h2>
                <div className="add-panel" id="editor-container">
                    <div className="title-conteiner">
                        <span className="post-title">Titulo: </span>
                        <input
                            type="text"
                            className="title-input" 
                            defaultValue={titleUpdate}
                            // value={titleUpdate}
                            onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <Redactor content={content} setContent={setContent} onSave={handleSavePost} state="edit" onCancel={handleCancel} />
                </div>
            </div>
        </>
    )
}

const EditPost: React.FC = () => {
    return <QuoteProvider><EditorPost /></QuoteProvider>
}

export default EditPost;