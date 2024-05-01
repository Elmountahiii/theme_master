"use client";
import { createContext, useState, useEffect } from "react";

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
  const [isDark, switchTheme] = useState<boolean>(true);

   const toggleTheme = () => {
     switchTheme(!isDark);
   };
  const reactToDarkMode = (e: MediaQueryListEvent) => {
    switchTheme(e.matches);
  };
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    if (darkModeMediaQuery.matches) {
      switchTheme(true);
    } else {
      switchTheme(false);
    }
    darkModeMediaQuery.addEventListener("change", reactToDarkMode);
    return () => {
      darkModeMediaQuery.removeEventListener("change", reactToDarkMode);
    };
  }, []);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);
 
  return (
    <ThemeContext.Provider value={{ isDark, switchTheme: toggleTheme }}>
      <div className={`${isDark ? "dark" : ""} `}>{children}</div>
    </ThemeContext.Provider>
  );
};
