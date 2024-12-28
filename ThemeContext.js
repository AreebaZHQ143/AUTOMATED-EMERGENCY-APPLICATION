// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import { Appearance } from 'react-native';

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(systemTheme || 'light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
