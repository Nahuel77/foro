import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css"

const Navbar: React.FC = () => {
    const { isAuthenticated, userRole, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav>
            <h1>Foro</h1>
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
            <button onClick={toggleTheme}></button>
        </nav>
    );
};

export default Navbar;