import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './OnPost.css';
import { useEffect, useState } from 'react';
import { getPostById } from '../../api/auth';
import DOMPurify from "dompurify";

const OnPost: React.FC = () => {
    const { id } = useParams< {id: string} >();
    const [post, setPost] = useState<any | null>(null);
    
    const fetchPosts = async ()=> {
        try {
            const response = await getPostById(id as string);
            setPost(response.data);
        } catch (err) {
            console.error('Error al cargar el post: ', err);
        }
    };

    
    useEffect(()=>{
        fetchPosts();
    }, [id]);
    
    const sanitizedContent = post ? DOMPurify.sanitize(post.content) : "";

    if(!post) return <p>Cargando post...</p>;

    return (
        <>
            <Navbar />
            <div className='post-container'>
                <h2 className='post-title'>{post.title}</h2>
                <div className='post-content'>
                    <h4>autor: {post.userName}</h4>
                    <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                </div>
            </div>
        </>
    )
}

export default OnPost;