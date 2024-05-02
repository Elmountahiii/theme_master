"use client";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";

type ThemeParentProps = {
  children: React.ReactNode;
};
function ThemeParent({ children }: ThemeParentProps) {
  const themeContext = useContext(ThemeContext);
  return (
    <div className={`${themeContext.isDark ? "dark" : ""}`}>{children}</div>
  );
}

export default ThemeParent; 
