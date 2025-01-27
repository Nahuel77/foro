import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Redactor from '../Redactor/Redactor';
import './AddComment.css';
import { newComment } from '../../api/auth';

interface AddCommentProps {
    postId: string;
    commentRefreshCallBack: () => void;
    quote?: QuoteData | null;
}

interface QuoteData {
    text: string;
    userName: string;
    date: string;
    avatar?: string;
}

const AddComment: React.FC<AddCommentProps> = ({ postId, commentRefreshCallBack, quote }) => {
    const [content, setContent] = useState('');
    const { userName } = useAuth();
    const [quoteData, setQuoteData] = useState<QuoteData | null>(null);

    useEffect(() => {
        if (quote) {
            setQuoteData(quote);
        } else {
            setQuoteData(null);
        }
    }, [quote]);

    useEffect(() => {
        if (quoteData) {
            const formattedQuote = `
                <blockquote>
                    <strong>${quoteData.userName}</strong> dijo el ${new Date(quoteData.date).toLocaleString()}:
                    <p>${quoteData.text}</p>
                </blockquote>
            `;
            setContent(formattedQuote);
        }
    }, [quoteData]);

    const handleSavePost = async () => {
        if (!userName) {
            alert('No Name');
            return;
        }
        try {
            const response = await newComment({ content, userName, postId });
            commentRefreshCallBack();
            setContent('');
            setQuoteData(null);
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