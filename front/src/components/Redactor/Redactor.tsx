import React, { useRef, useState } from "react";
import "./Redactor.css";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const Redactor: React.FC = () => {
    const [value, setValue] = useState('');


    return (
        <>
            <div className="editor">
                <div className="editor-container">
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        className="text-form"
                    />
                </div>
                <div className="btn-editor">
                    <button className="ver">Ver</button>
                    <button className="agregar">Agregar</button>
                </div>
            </div>
        </>
    );
};

export default Redactor;