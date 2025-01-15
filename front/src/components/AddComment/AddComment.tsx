import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Redactor from '../Redactor/Redactor';
import './AddComment.css';
import { useNavigate } from 'react-router-dom';
import { newComment } from '../../api/auth';

interface AddCommentProps{
    postId: string;
}

const AddComment: React.FC<AddCommentProps> = ({ postId }) => {
    const [content, setContent] = useState('');
    const { userName } = useAuth();
    const navigate = useNavigate();

    const handleSavePost = async () => {

        if (!userName) {
            alert('No Name');
            return;
        }

        try {
            const response = await newComment({ content, userName, postId });
            alert('Comentario agregado');
            navigate('/');
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