import React from "react";
import './Post.css'


const Post: React.FC = () => {

    return (
        <>
            <div className="post">
                <h3 className="post-name">title</h3>
                <div className="post-content">
                    <p className="text-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, temporibus.</p>
                </div>
            </div>
        </>
    )
}

export default Post;