import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Redactor from '../Redactor/Redactor';
import './AddComment.css';
import { newComment } from '../../api/auth';
import { useQuote } from '../../context/QuoteContext';

interface AddCommentProps {
    postId: string;
    commentRefreshCallBack: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({ postId, commentRefreshCallBack }) => {
    const [content, setContent] = useState('');
    const { userName } = useAuth();
    const { quotes, clearQuotes } = useQuote();

    const handleSavePost = async () => {
        if (!userName) {
            alert('No Name');
            return;
        }
        try {
            const response = await newComment({ content, userName, postId, quote: quotes });
            commentRefreshCallBack();
            setContent('');
            clearQuotes();
        } catch (err: any) {
            console.error('Error al crear el comentario: ', err.response?.data || err.message);
            alert('Error al intentar crear el comentario');
        }
    }

    return (
        <>
            <Redactor content={content} setContent={setContent} onSave={handleSavePost} />
        </>
    )
}

export default AddComment;