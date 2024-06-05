import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = async () => {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);
        await AsyncStorage.setItem('isDarkMode', JSON.stringify(newIsDarkMode));
    };

    useEffect(() => {
        (async () => {
            const storedIsDarkMode = await AsyncStorage.getItem('isDarkMode');
            if (storedIsDarkMode !== null) {
                setIsDarkMode(JSON.parse(storedIsDarkMode));
            }
        })();
    }, []);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;