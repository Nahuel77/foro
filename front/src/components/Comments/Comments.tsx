import { useEffect, useState } from 'react';
import { deleteContent, getComments } from '../../api/auth';
import './Comments.css';
import DOMPurify from "dompurify";
import { useAuth } from '../../context/AuthContext';
import AddComment from '../AddComment/AddComment';

interface CommentProps {
    id: string;
}

const Comments: React.FC<CommentProps> = ({ id }) => {
    const [comments, setComments] = useState<any[]>([]);
    const { isAuthenticated, userId } = useAuth();

    const fetchComments = async () => {
        try {
            const response = await getComments(id);
            setComments(response.data);
        } catch (err) {
            console.error('Error al consultar comentarios: ', err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [id]);

    const handleDelete = async (commentId: string) => {
        if (window.confirm('Confirme que desea eliminar el comentario')) {
            try {
                const response = deleteContent({ content: 'Comment', id: commentId });
                setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
            } catch (err) {
                console.error('Error al intentar borrar el comentario: ', err);
            }
        }
    }

    return (
        <>
            {comments.length > 0 ? (
                comments.map((comment) => {
                    const sanitizedContent = DOMPurify.sanitize(comment.content);
                    return (
                        <div key={comment._id}>
                            <div className='comment-header'>
                                <h4>{comment.userName}</h4>
                                <span>{new Date(comment.date).toLocaleString()}</span>
                            </div>
                            <div className='comment-body'>
                                <div className='comment-content' dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                                {userId !== null ? (
                                    userId === comment.user ? (
                                        <>
                                            <button onClick={() => { handleDelete(comment._id) }} className='comment-button'>Borrar</button>
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
                        </div>);
                })
            ) : (
                <p className="no-post">No hay comentarios disponibles.</p>
            )}
            {!isAuthenticated ? (
                <></>
            ) : (
                <AddComment postId={id} commentRefreshCallBack={fetchComments}/>
            )}
        </>
    )
}

export default Comments;