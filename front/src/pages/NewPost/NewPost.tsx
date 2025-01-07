import React from "react";
import './NewPost.css';
import Redactor from "../../components/Redactor/Redactor";


const NewPost: React.FC = () => {

    return (
        <>
            <div className="add-post-content">
                <h2>Nuevo Post</h2>
                <div className="add-panel" id="editor-container">
                    <div>
                        <span className="post-title">Titulo: </span>
                        <input type="text" className="title-input" />
                    </div>
                    <Redactor />
                </div>
            </div>
        </>
    )
}

export default NewPost;