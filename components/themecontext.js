// import React from 'react';
//
// export const ThemeContext = React.createContext();
//
// export function ThemeProvider({ children }) {
//     const [isDarkMode, setIsDarkMode] = React.useState(false);
//
//     const toggleTheme = () => {
//         setIsDarkMode(!isDarkMode);
//     };
//
//     return (
//         <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// }