import React, { createContext, useState, useContext, ReactNode } from 'react';

const ThemeContext = createContext<any>(null);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children})=>{
    const [theme, setTheme] = useState<string>('light');
    
    const toggleTheme = () =>{
        setTheme((prevTheme: string)=>(prevTheme === 'light' ? 'dark' : 'light'));
    };

    return(
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = ()=> {
    return useContext(ThemeContext);
};