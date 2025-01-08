import React from "react";
import "./Redactor.css";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface RedactorProps{
    content: string;
    setContent: (value: string) => void;
    onSave: () => void;
}

const Redactor: React.FC<RedactorProps> = ({ content, setContent, onSave}) => {

    return (
        <>
            <div className="editor">
                <div className="editor-container">
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        className="text-form"
                        id="text"
                    />
                </div>
                <div className="btn-editor">
                    <button className="ver">Ver</button>
                    <button className="agregar" onClick={onSave}>Agregar</button>
                </div>
            </div>
        </>
    );
};

export default Redactor;