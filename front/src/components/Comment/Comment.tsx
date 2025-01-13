import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Redactor from '../Redactor/Redactor';
import './Comment.css';
import { useNavigate } from 'react-router-dom';
import { newComment } from '../../api/auth';

const Comment: React.FC = () => {
    const [content, setContent] = useState('');
    const { userName } = useAuth();
    const navigate = useNavigate();

    const handleSavePost = async () => {

        if (!userName) {
            alert('No Name');
            return;
        }

        try {
            const response = await newComment({ content, userName });
            alert('Post agregado');
            navigate('/');
        } catch (err: any) {
            console.error('Error al crear el post: ', err.response?.data || err.message);
            alert('Error al intentar crear el post');
        }
    }

    return (
        <>
            <Redactor content={content} setContent={setContent} onSave={handleSavePost} />
        </>
    )
}

export default Comment;