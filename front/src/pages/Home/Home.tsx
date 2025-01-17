import React from "react";
import './Home.css'
import Board from "../../components/Board/Board";
import Navbar from "../../components/Navbar/Navbar";


const Home: React.FC = () => {

    return (
        <>
            <Navbar />
            <div className="content">
                <Board seccion="all"/>
                <Board seccion="all"/>
            </div>
        </>
    )
}

export default Home;