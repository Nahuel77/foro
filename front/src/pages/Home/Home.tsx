import React from "react";
import './Home.css'
import Board from "../../components/Board/Board";
import Navbar from "../../components/Navbar/Navbar";


const Home: React.FC = () => {

    return (
        <>
            <Navbar />
            <div className="content">
                <Board seccion="all" title="Últimos Temas" content="post"/>
                <Board seccion="all" title="Últimos Comentarios" content="comment"/>
            </div>
        </>
    )
}

export default Home;