import React from "react";
import './Board.css'
import Post from "../Post/Post";


const Board: React.FC = () => {

    return (
        <>
            <div className="board">
                <h2 className="board-head">Últimos Temas</h2>
                <div>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            </div>
        </>
    )
}

export default Board;