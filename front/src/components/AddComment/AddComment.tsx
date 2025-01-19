import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Redactor from '../Redactor/Redactor';
import './AddComment.css';
import { newComment } from '../../api/auth';

interface AddCommentProps{
    postId: string;
    commentRefreshCallBack: ()=> void;
}

const AddComment: React.FC<AddCommentProps> = ({ postId, commentRefreshCallBack }) => {
    const [content, setContent] = useState('');
    const { userName } = useAuth();

    const handleSavePost = async () => {

        if (!userName) {
            alert('No Name');
            return;
        }

        try {
            const response = await newComment({ content, userName, postId });
            commentRefreshCallBack();
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