import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { theme } from './theme';

export default function ThemeProvider({ children }) {
  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
} 