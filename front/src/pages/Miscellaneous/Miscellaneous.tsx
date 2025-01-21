import React from "react";
import './Miscellaneous.css'
import Navbar from "../../components/Navbar/Navbar";
import Board from "../../components/Board/Board";

const Miscellaneous: React.FC = () => {

    return (
        <>
            <Navbar />
            <Board seccion={"Comment"} title={"Últimos comentarios"} content={"comment"} showContent={true}/>
        </>
    )
}

export default Miscellaneous;