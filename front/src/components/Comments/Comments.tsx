import { useEffect, useState } from 'react';
import { getComments } from '../../api/auth';
import './Comments.css';
import DOMPurify from "dompurify";
import { useAuth } from '../../context/AuthContext';

interface CommentProps {
    id: string;
}

const Comments: React.FC<CommentProps> = ({ id }) => {
    const [comments, setComments] = useState<any[]>([]);
    const { userId } = useAuth();

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
                                            <button className='comment-button'>Borrar</button>
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
        </>
    )
}

export default Comments;