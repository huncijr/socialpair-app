/**
 * Dark mode context provider for theme management
 */
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/** Dark mode context type */
interface DarkModeContextType {
  isDark: boolean;
  toggle: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  isDark: false,
  toggle: () => {},
});

/** Props for DarkModeProvider */
interface DarkModeProviderProps {
  children: ReactNode;
}

/**
 * Provides dark mode state and toggle function to the application
 * @param props - Children components
 */
export function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(isDark));
  }, [isDark]);

  /** Toggle between light and dark mode */
  const toggle = () => setIsDark((prev) => !prev);

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

/**
 * Hook to access dark mode state
 * @returns Dark mode context with isDark and toggle
 */
export function useDarkMode() {
  return useContext(DarkModeContext);
}
