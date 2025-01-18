import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './OnPost.css';
import { useEffect, useState } from 'react';
import { deleteContent, getPostById } from '../../api/auth';
import DOMPurify from "dompurify";
import { useAuth } from '../../context/AuthContext';
import AddComment from '../../components/AddComment/AddComment';
import Comments from '../../components/Comments/Comments';

const OnPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<any | null>(null);
    const { isAuthenticated } = useAuth();
    const { userId } = useAuth();
    const navigate = useNavigate();

    const fetchPosts = async () => {
        try {
            const response = await getPostById(id as string);
            setPost(response.data);
        } catch (err) {
            console.error('Error al cargar el post: ', err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [id]);

    const sanitizedContent = post ? DOMPurify.sanitize(post.content) : "";

    if (!post) return <p>Cargando post...</p>;

    const fechaFormateada = post ? `${new Date(post.createdAt).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/\//g, '-')} ${new Date(post.createdAt).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })}` : '';

    const handleDelete = async () => {
        try {
            const response = deleteContent({ content: 'Post', id: post._id });
            alert('Post eliminado');
            navigate('/');
        } catch (err: any) {
            console.error('Error al crear el post: ', err.response?.data || err.message);
            alert('Error al intentar crear el post');
        }
    }

    return (
        <>
            <Navbar />
            <div className='post-container'>
                <h2 className='post-title'>{post.title}</h2>
                <div className='post-header'>
                    <h3>autor: {post.userName}</h3>
                    <span>fecha: {fechaFormateada}</span>
                </div>
                <div className='post-body'>
                    <div className='post-content' dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                    {userId !== null ? (
                        userId === post.user ? (
                            <>
                                <button onClick={handleDelete} className='comment-button'>Borrar</button>
                                <button className='comment-button'>Editar</button>
                                <button className='comment-button'>Citar</button>
                            </>) : (
                            <>
                                <button className='comment-button'>Citar</button>
                            </>
                        )
                    ) : (<>
                    </>)}
                </div>

                <div className='comment-container'>
                    <h3>comentarios: </h3>
                    <div>
                        {!isAuthenticated ? (
                            <>
                                <Comments id={id!} />
                            </>
                        ) : (
                            <>
                                <Comments id={post._id!} />
                                <AddComment postId={post._id} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default OnPost;