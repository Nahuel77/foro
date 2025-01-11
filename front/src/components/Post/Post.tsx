import React from "react";
import './Post.css';
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

interface PostProps {
    id: string;
    title: string;
    content: string;
    userName: string;
}

const Post: React.FC<PostProps> = ({ id, title, content, userName }) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/post/${id}`);
    };

    return (
        <>
            <div className="post">
                <div className="head" onClick={handleNavigate}>
                    <h3 className="post-name">{title}</h3>
                    <span className="post-creator">por : {userName}</span>
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