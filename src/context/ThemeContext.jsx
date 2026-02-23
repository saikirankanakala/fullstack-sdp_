import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem('swms_theme');
        if (stored) return stored === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('swms_theme', isDark ? 'dark' : 'light');
        // CSS vars for toasts
        document.documentElement.style.setProperty('--toast-bg', isDark ? '#1e1e2e' : '#ffffff');
        document.documentElement.style.setProperty('--toast-color', isDark ? '#e2e8f0' : '#1e293b');
    }, [isDark]);

    const toggleTheme = () => setIsDark((d) => !d);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
