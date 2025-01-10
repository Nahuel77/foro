import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    userRole: 'admin' | 'user' | null;
    userName: string | null;
    login: (role: 'admin' | 'user', userName: string)=>void;
    logout: ()=>void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode}>=({children})=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<'admin'|'user'|null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setIsAuthenticated(true);
            setUserRole(decodedToken.role);
            setUserName(decodedToken.userName);
        }
    }, []);

    const login = (role: 'admin' | 'user', userName: string )=>{
        setIsAuthenticated(true);
        setUserRole(role);
        setUserName(userName);
    };

    const logout=()=>{
        setIsAuthenticated(false);
        setUserRole(null);
        setUserName(null);
        localStorage.removeItem('token');
    };

    return(
        <AuthContext.Provider value={{isAuthenticated, userRole, userName, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};