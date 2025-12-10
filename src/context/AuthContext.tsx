/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode } from 'react';

interface AuthContextProps {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    // Initialize token from localStorage
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('token');
    });

    // Sync token state with localStorage changes
    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}