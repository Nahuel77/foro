import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
    const { isAuthenticated, userRole, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav>
            <Link to="/" className="home-redirect">
                <h1 className="title">Foro</h1>
            </Link>
            <div className="options">
                {!isAuthenticated ? (
                    <>
                        <Link to="/login" className="navbar-btn">
                            Login
                        </Link>
                        <Link to="/register" className="navbar-btn">
                            Registro
                        </Link>
                    </>
                ) : (
                    <>
                        {userRole === 'admin' ? (
                            <>
                                <button className="navbar-btn">Usuarios</button>
                                <button className="navbar-btn">Reportes</button>
                            </>
                        ) : null}
                        <button onClick={logout} className="navbar-btn">
                            Logout
                        </button>
                    </>
                )}
                <div className="Toggle-Container">
                    <input
                        type="checkbox"
                        id="select"
                        onChange={toggleTheme}
                        checked={theme === 'dark'}
                    />
                    <label htmlFor="select" className="modo">
                        <div id="detalle"></div>
                    </label>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;