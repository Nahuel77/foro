import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css"

const Navbar: React.FC = () => {
    const { isAuthenticated, userRole, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav>
            <h1 className="title">Foro</h1>
            <div className="options">
                {!isAuthenticated ? (
                    <>
                        <button onClick={() => alert('Login')}>Login</button>
                        <button onClick={() => alert('Registro')}>Registro</button>
                    </>
                ) : (
                    <>
                        {userRole === 'admin' ? (
                            <>
                                <button>Usuarios</button>
                                <button>Reportes</button>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                        <button onClick={logout}>Logout</button>
                    </>
                )}
                <div className="Toggle-Container">
                    <input type="checkbox" id="select" onChange={toggleTheme} checked={theme === 'dark'}/>
                    <label htmlFor="select" className="modo">
                        <div id="detalle"></div>
                    </label>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;