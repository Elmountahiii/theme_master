"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
export default function Home() {
   const {isDark, switchTheme} = useTheme();
  return (
    <div className={`flex items-center justify-center h-screen `}>
      <div className="flex gap-2 flex-col items-center">
        <h1 className="text-2xl">Theme Master</h1>
        <p className="max-w-[500px] text-center">
          A small demo about how to handle theme in next js using tailwindcss
          and react context api
        </p>
        <Button
          onClick={switchTheme}>
          Change Theme to {isDark ? "Light" : "Dark"}
        </Button>
        <h1>
          Made by{"  "}
          <Link
            target="_blank"
            className="text-blue-500 font-bold"
            href={"https://github.com/Elmountahiii"}>
            ElMountahiii
          </Link>
        </h1>
      </div>
    </div>
  );
}
