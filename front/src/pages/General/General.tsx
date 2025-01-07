import React from "react";
import './General.css'
import Navbar from "../../components/Navbar/Navbar";


const General: React.FC = () => {

    return (
        <>
            <Navbar />
            <div className="general-content">
                <h3>General</h3>
            </div>
        </>
    )
}

export default General;