import React, { useEffect, useState } from "react";
import "./Redactor.css";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useQuote } from "../../context/QuoteContext";
import DOMPurify from "dompurify";

interface RedactorProps {
    content: string;
    setContent: (value: string) => void;
    onSave: () => void;
    onCancel?: () => void;
    state?: string;
}

const Redactor: React.FC<RedactorProps> = ({ content, setContent, onSave, state, onCancel }) => {
    const { quotes, clearQuotes, removeQuote } = useQuote();

    const handleDelete = () => {
        clearQuotes();
        setContent('');
    }

    const handleDeleteQuote = (commentId: number) => {
        removeQuote(commentId);
    }

    return (
        <>
            <div className="editor">
                <div className="editor-container">
                    {quotes.length > 0 ? (
                        quotes.map((quote, index) => {
                            const text = quote.text;
                            const sanitizedContent = text ? DOMPurify.sanitize(text) : "Contenido no disponible";
                            const date = quote.date;
                            const formattedDate = date ? new Date(date).toLocaleString() : "Fecha no disponible";
                            return (
                                <>
                                    <div className="quote" key={index}>
                                        <div className="quote-header">
                                            <div className="quote-info">
                                                <h4>@{quote.userName}</h4><p>dijo el</p>
                                                <span> {formattedDate}</span>
                                            </div>
                                            <button onClick={()=>{handleDeleteQuote(index)}} className="delete-quote">Borrar</button>
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}/>
                                    </div>
                                </>
                            );
                        })
                    ) : (<></>)}
                    <ReactQuill
                        theme="snow"
                        value={content}
                        // defaultValue={content}
                        onChange={setContent}
                        className="text-form"
                        id="text"
                    />
                </div >
                <div className="btn-editor">
                    {state === 'edit' ? (
                        <>
                            <button onClick={onCancel} className="ver">Cancelar</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleDelete} className="ver">Borrar</button>
                        </>
                    )}
                    <button className="agregar" onClick={onSave}>Guardar</button>
                </div >
            </div >
        </>
    );
};

export default Redactor;