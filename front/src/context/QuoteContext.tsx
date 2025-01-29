import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface QuoteContextType {
    userName: string | null;
    date: string | null;
    text: string | null;
}

interface QuoteContextProps {
    quotes: QuoteContextType[];
    addQuote: (quote: QuoteContextType) => void;
    removeQuote: (index: number) => void;
    clearQuotes: () => void;
}

const QuoteContext = createContext<QuoteContextProps | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [quotes, setQuotes] = useState<QuoteContextType[]>([]);

    const addQuote = (quote: QuoteContextType) => {
        setQuotes((prevQuotes) => [...prevQuotes, quote]);
    };

    const removeQuote = (index: number) => {
        setQuotes((prevQuotes) => prevQuotes.filter((_, i) => i !== index));
    };

    const clearQuotes = () => {
        setQuotes([]);
    };

    return (
        <QuoteContext.Provider value={{ quotes, addQuote, removeQuote, clearQuotes }}>
            {children}
        </QuoteContext.Provider>
    );
}

export const useQuote = () => {
    const Qcontext = useContext(QuoteContext);
    if (!Qcontext) {
        throw new Error('Cita sin contexto');
    }
    return Qcontext;
}