import React, { useState } from "react";
import './EditPost.css';
import Redactor from "../../components/Redactor/Redactor";
import { useNavigate, useLocation } from "react-router-dom";
import { updateContent } from "../../api/auth";

const EditPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const location = useLocation();
    const { id, titleUpdate, contentUpdate } = location.state || {};
    const navigate = useNavigate();

    const handleSavePost = async ()=>{
        try {
            const response = updateContent({contentType: 'Post', id: id, update: {content, title }});
            alert('Post editado');
            navigate(`/post/${id}`);
        }catch (err){
            console.error("Error al actualizar el post: ", err);
        }
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
                    <Redactor content={contentUpdate} setContent={setContent} onSave={handleSavePost} />
                </div>
            </div>
        </>
    )
}

export default EditPost;