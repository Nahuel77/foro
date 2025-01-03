import React from "react";
import './Home.css'
import Board from "../../components/Board/Board";


const Home: React.FC = () => {

    return (
        <>
            <nav className="bar">
                    <button className="board-btn">Últimos Temas</button>
                    <button className="board-btn">Más visto</button>
                    <div className="search-bar">
                        <input type="text" />
                        <button className="search-btn"><img src="../../public/icon/search.png" alt="search" className="search-icon"/></button>
                    </div>
            </nav>
            <div className="content">
                <Board/>
            </div>
        </>
    )
}

export default Home;