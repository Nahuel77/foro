import React, { useEffect, useState } from "react";
import './Board.css'
import Post from "../Post/Post";
import { loadPosts } from "../../api/auth";


const Board: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);

    const fetchPosts = async () => {
        try {
            const response = await loadPosts();
            setPosts(response.data);
        } catch (err) {
            console.error('Error al cargar los posts: ', err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            <div className="board">
                <h2 className="board-head">Últimos Temas</h2>
                <div>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Post
                                key={post._id}
                                title={post.title}
                                content={post.content}
                            />
                        ))
                    ):(
                        <p>No hay posts disponibles.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Board;