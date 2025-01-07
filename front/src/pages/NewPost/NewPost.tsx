import React, { useRef, useState } from "react";
import './NewPost.css';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


const NewPost: React.FC = () => {
    const [content, setContent] = useState('');
    const quillRef = useRef<ReactQuill>(null); // Crear referencia para el editor

    // Manejador de subida de imágenes
    const handleImageUpload = async () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            // Verificar que input.files no sea null y que haya al menos un archivo seleccionado
            const file = input.files ? input.files[0] : null;
            if (file) {
                // Aquí puedes subir la imagen a tu backend o un servicio como Cloudinary
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'your_upload_preset'); // Para Cloudinary, si lo usas

                try {
                    const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    const data = await response.json();
                    const imageUrl = data.secure_url; // URL de la imagen subida

                    // Comprobar si quillRef.current no es null antes de acceder a getEditor()
                    if (quillRef.current) {
                        const editor = quillRef.current.getEditor();
                        
                        // Verificar si el rango de selección es válido
                        const range = editor.getSelection();
                        if (range) {
                            editor.insertEmbed(range.index, 'image', imageUrl);
                        } else {
                            console.error('No hay selección válida en el editor');
                        }
                    }
                } catch (error) {
                    console.error('Error al subir la imagen:', error);
                }
            }
        };
    };

    // Configuración de módulos para Quill
    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'], // Aquí se incluye la opción de insertar imágenes
            ],
            handlers: {
                image: handleImageUpload, // Sobrescribir el manejador para imágenes
            },
        },
    };

    return (
        <>
            <div className="add-post-content">
                <h2>Nuevo Post</h2>
                <div className="add-panel">
                    <ReactQuill value={content}
                        onChange={setContent}
                        modules={modules}
                        theme="snow" className="add-form" />
                </div>
            </div>
        </>
    )
}

export default NewPost;