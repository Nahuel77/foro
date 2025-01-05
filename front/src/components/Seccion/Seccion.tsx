import React from "react";
import './Seccion.css';

const Seccion: React.FC = () => {

    return (
        <>
            <div className="seccion">
                <div className="categoria">
                    <h3>Seccion</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                </div>
                <div className="ultimo-post">
                    <span>Ultimo tema:</span>
                    <a href="">Lorem ipsum dolor sit amet consectetur.</a>
                </div>
            </div>
        </>
    )
}

export default Seccion;