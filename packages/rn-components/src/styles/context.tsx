import { createContext } from 'react';
import { Theme } from './theme';

export const ThemeContext = createContext<Partial<Theme>>(null);
export const ThemeProvider = ThemeContext.Provider;
