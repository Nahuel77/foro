import { useEffect, useState } from 'react';
import { getComment } from '../../api/auth';
import './Comments.css';

interface CommentProps {
    id: string;
}

const Comments: React.FC<CommentProps> = ({ id }) => {
    const [comments, setComments] = useState<any[]>([]);

    const fetchComments = async () => {
        try {
            const response = await getComment(id as string);
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
                comments.map((comment) => (
                    <>
                        <div>
                            <h4>{comment.userName}</h4>
                            <p>{comment.content}</p>
                        </div>
                    </>
                ))
            ) : (
                <p className="no-post">No hay comentarios disponibles.</p>
            )}
        </>
    )
}

export default Comments;