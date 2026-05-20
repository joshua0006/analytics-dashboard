import { createContext, useCallback, useContext, useState } from 'react';

interface ThemeCtxValue {
  isDark: boolean;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeCtxValue>({ isDark: true, toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeState(): ThemeCtxValue {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  const toggle = useCallback(() => {
    setIsDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('ad-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('ad-theme', 'light');
      }
      return next;
    });
  }, []);

  return { isDark, toggle };
}
