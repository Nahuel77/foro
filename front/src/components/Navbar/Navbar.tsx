import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css"

const Navbar: React.FC = () => {
    const { isAuthenticated, userRole, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav>
            <a href="/" className="home-redirect">
                <h1 className="title">Foro</h1>
            </a>
            <div className="options">
                {!isAuthenticated ? (
                    <>
                        <button onClick={() => alert('Login')} className="navbar-btn">Login</button>
                        <button onClick={() => alert('Registro')} className="navbar-btn">Registro</button>
                    </>
                ) : (
                    <>
                        {userRole === 'admin' ? (
                            <>
                                <button className="navbar-btn">Usuarios</button>
                                <button className="navbar-btn">Reportes</button>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                        <button onClick={logout} className="navbar-btn">Logout</button>
                    </>
                )}
                <div className="Toggle-Container">
                    <input type="checkbox" id="select" onChange={toggleTheme} checked={theme === 'dark'} />
                    <label htmlFor="select" className="modo">
                        <div id="detalle"></div>
                    </label>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;