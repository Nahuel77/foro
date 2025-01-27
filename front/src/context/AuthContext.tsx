import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    userRole: 'admin' | 'user' | null;
    userName: string | null;
    userId: string | null;
    avatar: string | null;
    login: (role: 'admin' | 'user', userName: string, userId: string, avatar: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            const savedUserName = localStorage.getItem('userName');
            const savedUserId = localStorage.getItem('userId');
            const savedUserAvatar = localStorage.getItem("userProfileImage");

            if (savedUserName && savedUserId) {
                setUserName(savedUserName);
                setUserId(savedUserId);
                setAvatar(savedUserAvatar);
            }
        }
    }, []);

    const login = (role: 'admin' | 'user', userName: string, userId: string, avatar: string) => {
        setIsAuthenticated(true);
        setUserRole(role);
        setUserName(userName);
        setUserId(userId);
        setAvatar(avatar);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setUserName(null);
        setUserId(null);
        setAvatar(null);
        localStorage.removeItem("userProfileImage");
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, userName, login, logout, userId, avatar }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};