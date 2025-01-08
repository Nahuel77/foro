import React from "react";
import './Post.css';

interface PostProps {
    title: string;
    content: string;
}

const Post: React.FC<PostProps> = ({ title, content }) => {
    return (
        <>
            <div className="post">
                <h3 className="post-name">{title}</h3>
                <div className="post-content">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
            <hr />
        </>
    )
}

export default Post;