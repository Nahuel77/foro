import React, { useEffect, useState } from "react";
import './Board.css'
import Post from "../Post/Post";
import { loadPosts } from "../../api/auth";

interface BoardProps {
    seccion: string;
}

const Board: React.FC<BoardProps> = ({ seccion }) => {
    const [posts, setPosts] = useState<any[]>([]);

    const fetchPosts = async () => {
        try {
            const response = await loadPosts({ seccion });
            setPosts(response.data);
        } catch (err) {
            console.error('Error al cargar los posts: ', err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [seccion]);

    return (
        <>
            <div className="board">
                <h2 className="board-head">Últimos Temas</h2>
                <div>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Post
                                id={post._id}
                                title={post.title}
                                content={post.content}
                                userName={post.userName}
                                date={post.createdAt}
                            />
                        ))
                    ) : (
                        <p className="no-post">No hay posts disponibles.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Board;