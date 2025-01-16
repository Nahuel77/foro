import { useEffect, useState } from 'react';
import { getComments } from '../../api/auth';
import './Comments.css';
import DOMPurify from "dompurify";

interface CommentProps {
    id: string;
}

const Comments: React.FC<CommentProps> = ({ id }) => {
    const [comments, setComments] = useState<any[]>([]);

    const fetchComments = async () => {
        try {
            // console.log(id);
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
                            <div className='comment-content' dangerouslySetInnerHTML={{ __html: sanitizedContent }}/>
                        </div>);
                })
            ) : (
                <p className="no-post">No hay comentarios disponibles.</p>
            )}
        </>
    )
}

export default Comments;