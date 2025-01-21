import React from "react";
import './Home.css'
import Board from "../../components/Board/Board";
import Navbar from "../../components/Navbar/Navbar";


const Home: React.FC = () => {

    return (
        <>
            <Navbar />
            <div className="welcome-container">
                <h1>¡Bienvenidos al Foro!</h1>
                <p>Este es un espacio abierto para compartir, aprender y conectar con personas de intereses diversos. Aquí puedes:</p>
                <ul>
                    <li>✨ <strong>Expresar tus ideas:</strong> Comparte tus pensamientos, experiencias y preguntas sobre cualquier tema que te apasione.</li>
                    <li>🌟 <strong>Aprender de los demás:</strong> Encuentra perspectivas únicas y consejos útiles de nuestra comunidad.</li>
                    <li>🤝 <strong>Conectar con otros:</strong> Forma parte de conversaciones significativas y descubre personas con intereses afines.</li>
                </ul>
                <h2>Reglas básicas:</h2>
                <ol>
                    <li><strong>Respeto ante todo:</strong> Este es un espacio para opiniones diversas, pero siempre con respeto.</li>
                    <li><strong>Participa activamente:</strong> Tu contribución hace este foro mejor.</li>
                    <li><strong>Sé claro y amable:</strong> Ayuda a que todos puedan entender y participar en las conversaciones.</li>
                </ol>
                <p>¡Estamos emocionados de tenerte aquí! 🌐✨</p>
                <p>Explora los temas, haz preguntas y siéntete libre de comenzar una nueva discusión. 💬</p>
            </div>
            <div className="content">
                <Board seccion="all" title="Últimos Temas" content="post" showContent={false} />
                <Board seccion="all" title="Últimos Comentarios" content="comment" showContent={false} />
            </div>
        </>
    )
}

export default Home;