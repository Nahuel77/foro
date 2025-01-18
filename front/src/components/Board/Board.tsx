import React, { useEffect, useState } from "react";
import './Board.css'
import Post from "../Post/Post";
import { getLatestComments, getPosts } from "../../api/auth";

interface BoardProps {
    seccion: string;
    title: string;
    content: string;
}

const Board: React.FC<BoardProps> = ({ seccion, title, content }) => {
    const [posts, setPosts] = useState<any[]>([]);

    const fetchPosts = async () => {
        if (content === 'post') {
            try {
                const response = await getPosts({ section: seccion, top: '0' });
                setPosts(response.data);
            } catch (err) {
                console.error('Error al cargar los posts: ', err);
            }
        }
        if (content === 'comment') {
            try {
                const response = await getLatestComments();
                setPosts(response.data);
            } catch (err) {
                console.error('Error al cargar los comentarios: ', err);
            }
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [seccion]);

    return (
        <>
            <div className="board">
                <h2 className="board-head">{title}</h2>
                <div>
                    {posts.length > 0 ? (
                        posts.map((post) =>
                            content === 'post' ? (

                                <Post
                                    key={post._id}
                                    id={post._id}
                                    title={post.title}
                                    userName={post.userName}
                                    date={post.createdAt}
                                />
                            ) : (
                                <Post
                                    key={post._id}
                                    id={post.postId._id}
                                    title={post.postId.title}
                                    userName={post.userName}
                                    date={post.date}
                                />
                            ))
                    ) : (
                        <p className="no-post">Nada disponible aún.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Board;