import React from "react";
import './Home.css'
import Board from "../../components/Board/Board";
import Navbar from "../../components/Navbar/Navbar";


const Home: React.FC = () => {

    return (
        <>
            <Navbar />
            <div className="content">
                <Board/>
                <Board/>
            </div>
        </>
    )
}

export default Home;