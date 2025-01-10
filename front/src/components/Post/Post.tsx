import React from "react";
import './Post.css';
import DOMPurify from "dompurify";

interface PostProps {
    title: string;
    content: string;
}

const Post: React.FC<PostProps> = ({ title, content }) => {
    const sanitizedContent = DOMPurify.sanitize(content);

    return (
        <>
            <div className="post">
                <h3 className="post-name">{title}</h3>
                <div className="post-content">
                    <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                </div>
            </div>
            <hr />
        </>
    )
}

export default Post;