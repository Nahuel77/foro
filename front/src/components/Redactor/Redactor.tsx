import React, { useState } from "react";
import "./Redactor.css";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface RedactorProps {
    content: string;
    setContent: (value: string) => void;
    onSave: () => void;
    onCancel?: () => void;
    state?: string;
}

const Redactor: React.FC<RedactorProps> = ({ content, setContent, onSave, state, onCancel }) => {

    return (
        <>
            <div className="editor">
                <div className="editor-container">
                    <ReactQuill
                        theme="snow"
                        value={content}
                        // defaultValue={content}
                        onChange={setContent}
                        className="text-form"
                        id="text"
                    />
                </div>
                <div className="btn-editor">
                    {state === 'edit' ? (
                        <>
                            <button onClick={onCancel} className="ver">Cancelar</button>
                        </>
                    ) : (
                        <>
                            <button className="ver">Ver</button>
                        </>
                    )}
                    <button className="agregar" onClick={onSave}>Guardar</button>
                </div >
            </div >
        </>
    );
};

export default Redactor;