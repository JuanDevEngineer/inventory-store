import { createContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Dark, Light } from '../styles/themes';

const ThemeContext = createContext(null);

export function ThemeContextProvider({ children }) {
  const [currentTheme, setTheme] = useState('dark');
  const theme = currentTheme === 'light' ? 'light' : 'dark';
  const themeStyle = theme === 'light' ? Light : Dark;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={themeStyle}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
