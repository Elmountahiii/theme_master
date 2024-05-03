"use client";
import { createContext, useState, useEffect, useContext } from "react";

type ThemeContextType = {
  isDark: boolean;
  switchTheme: () => void;
};
type ThemeProviderProps = {
  children: React.ReactNode;
};
export const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  switchTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDark, switchIsDark] = useState<boolean>(true);

  const switchTheme = () => {
    switchIsDark(!isDark);
  };
  const reactToOsTheme = (e: MediaQueryListEvent) => {
    switchIsDark(e.matches);
  };

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    switchIsDark(darkModeMediaQuery.matches);
    darkModeMediaQuery.addEventListener("change", reactToOsTheme);
    return () => {
      darkModeMediaQuery.removeEventListener("change", reactToOsTheme);
    };
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export function useTheme() {
  return useContext(ThemeContext);
}
