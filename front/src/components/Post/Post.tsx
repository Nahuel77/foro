import React from "react";
import './Post.css';
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

interface PostProps {
    id: string;
    title: string;
    userName: string;
    date: string;
    content?: string;
}

const Post: React.FC<PostProps> = ({ id, title, userName, date, content }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/post/${id}`);
    };

    const fechaFormateada = date ? `${new Date(date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/\//g, '-')} ${new Date(date).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })}`
        : '';

    const sanitizedContent = content ? DOMPurify.sanitize(content) : "";

    return (
        <>
            <div className="post">
                <div className="container" onClick={handleNavigate}>
                    <div className="head">
                        <h3 className="post-name">{title}</h3>
                        <span className="post-creator">por : {userName}</span>
                        <span className="post-creator">fecha : {fechaFormateada}</span>
                    </div>
                    <div className='post-content' dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                </div>
            </div>
            <hr />
        </>
    )
}

export default Post;