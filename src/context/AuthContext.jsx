import { createContext, useContext, useState, useEffect } from 'react';
import { USERS } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const stored = localStorage.getItem('swms_current_user');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const login = (userId) => {
        const user = USERS.find((u) => u.id === userId);
        if (user) {
            setCurrentUser(user);
            localStorage.setItem('swms_current_user', JSON.stringify(user));
        }
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('swms_current_user');
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, isAdmin: currentUser?.role === 'admin' }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
