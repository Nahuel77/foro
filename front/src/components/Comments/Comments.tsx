import { useEffect, useState } from 'react';
import { deleteContent, getComments, updateContent } from '../../api/auth';
import './Comments.css';
import DOMPurify from "dompurify";
import { useAuth } from '../../context/AuthContext';
import AddComment from '../AddComment/AddComment';
import Redactor from '../Redactor/Redactor';

interface CommentProps {
    id: string;
}

const Comments: React.FC<CommentProps> = ({ id }) => {
    const [comments, setComments] = useState<any[]>([]);
    const [contentUpdate, setContentUpdate] = useState('');
    const { isAuthenticated, userId } = useAuth();
    const [onEdit, setOnEdit] = useState<Boolean>(false);
    const [idOnEdit, setIdOnEdit] = useState<string>('');

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

    const handleEdit = (commentId: string) => {
        setOnEdit(true);
        setIdOnEdit(commentId);
    }

    const saveEdit = async () => {
        try {
            const response = updateContent({ contentType: 'Comment', id: idOnEdit, update: { content: contentUpdate, title: '' } });
            fetchComments();
            setOnEdit(false);
        } catch (err) {
            console.error('Error al intentar editar el comentario: ', err);
        }
    }

    const handleCancel = () => {
        setOnEdit(false);
    }

    return (
        <>
            {comments.length > 0 ? (
                comments.map((comment) => {
                    const sanitizedContent = DOMPurify.sanitize(comment.content);
                    const avatar = comment.user?.image || "/icon/user.png";
                    return (
                        <div key={comment._id}>
                            <div className='comment-header'>
                                <img
                                    src={avatar}
                                    alt={comment.user}
                                    className="avatar"
                                />
                                <h4>{comment.userName}</h4>
                                <span>{new Date(comment.date).toLocaleString()}</span>
                            </div>
                            <div className='comment-body'>
                                <div className='comment-content' dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                                {userId !== null ? (
                                    userId === comment.user._id ? (
                                        <>
                                            {onEdit !== true ? (<>
                                                <button onClick={() => { handleDelete(comment._id) }} className='comment-button'>Borrar</button>
                                                <button onClick={() => { handleEdit(comment._id) }} className='comment-button'>Editar</button>
                                                <button className='comment-button'>Citar</button>
                                            </>) : (<>
                                                <Redactor content={sanitizedContent} setContent={setContentUpdate} onSave={saveEdit} state='edit' onCancel={handleCancel} />
                                            </>)
                                            }
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
                <AddComment postId={id} commentRefreshCallBack={fetchComments} />
            )}
        </>
    )
}

export default Comments;