import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './OnPost.css';
import { useEffect, useState } from 'react';
import { deleteContent, getPostById } from '../../api/auth';
import DOMPurify from "dompurify";
import { useAuth } from '../../context/AuthContext';
import Comments from '../../components/Comments/Comments';

const OnPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<any | null>(null);
    const { userId } = useAuth();
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState<string>("/icon/user.png")

    const fetchPosts = async () => {
        try {
            const response = await getPostById(id as string);
            setPost(response.data);
            if (response.data.user.image != undefined || response.data.user.image != null) {
                setAvatar(response.data.user.image);
            } else {
                setAvatar("/icon/user.png");
            }
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
        if (window.confirm('Confirme que desea eliminar el post')) {
            try {
                const response = deleteContent({ content: 'Post', id: post._id });
                alert('Post eliminado');
                navigate('/');
            } catch (err: any) {
                console.error('Error al crear el post: ', err.response?.data || err.message);
                alert('Error al intentar crear el post');
            }
        }
    }

    const handleEdit = () => {
        navigate('/editpost', { state: { id: post._id, titleUpdate: post.title, contentUpdate: sanitizedContent } });
    }

    return (
        <>
            <Navbar />
            <div className='post-container'>
                <h2 className='post-title'>{post.title}</h2>
                <div className='post-header'>
                    <img
                        src={avatar}
                        alt={post.user}
                        className="avatar"
                        onError={() => { setAvatar("/icon/user.png") }}
                    />
                    <h3>autor: {post.userName}</h3>
                    <span>fecha: {fechaFormateada}</span>
                </div>
                <div className='post-body'>
                    <div className='post-content' dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                    {userId !== null ? (
                        userId === post.user._id ? (
                            <>
                                <button onClick={handleDelete} className='comment-button'>Borrar</button>
                                <button onClick={handleEdit} className='comment-button'>Editar</button>
                                <button className='comment-button'>Citar</button>
                            </>) : (
                            <>
                                <button className='comment-button'>Citar</button>
                            </>
                        )
                    ) : (
                        <>
                        </>
                    )}
                </div>

                <div className='comment-container'>
                    <h3>comentarios: </h3>
                    <div>
                        <Comments id={id!} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default OnPost;