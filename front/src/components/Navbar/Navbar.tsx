import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {

    return (
        <>
            <nav className="bar">
                <Link to="/secciones" className="board-btn">Secciones</Link>
                <Link to="ultimoscomentarios" className="board-btn">Últimos Comentarios</Link>
                <Link to="" className="board-btn">Más visto</Link>
                <div className="search-bar">
                    <input type="text" />
                    <button className="search-btn"><img src="/icon/search.png" alt="search" className="search-icon" /></button>
                </div>
            </nav>
        </>
    );
};

export default Navbar;