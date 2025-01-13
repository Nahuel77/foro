import React from "react";
import './Post.css';
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

interface PostProps {
    id: string;
    title: string;
    content: string;
    userName: string;
    date: string;
}

const Post: React.FC<PostProps> = ({ id, title, content, userName, date }) => {
    const sanitizedContent = DOMPurify.sanitize(content);
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

    return (
        <>
            <div className="post">
                <div className="head" onClick={handleNavigate}>
                    <h3 className="post-name">{title}</h3>
                    <span className="post-creator">por : {userName}</span>
                    <span className="post-creator">fecha : {fechaFormateada}</span>
                </div>
                {/* <div className="post-content">  
                    <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                </div> */}
            </div>
            <hr />
        </>
    )
}

export default Post;