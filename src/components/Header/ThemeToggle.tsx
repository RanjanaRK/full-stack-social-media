"use client";

import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        variant={"ghost"}
        className="hover:bg-primary/90 flex cursor-pointer items-center justify-start gap-4 rounded-md px-2 py-2 transition-colors duration-200 ease-in-out lg:w-full"
      >
        <span className="flex items-center gap-4">
          <Sun
            size={16}
            className="scale-100 opacity-100 transition-all duration-300 dark:scale-0 dark:opacity-0"
          />
          <MoonStar
            size={16}
            className="absolute scale-0 opacity-0 transition-all duration-300 dark:scale-100 dark:opacity-100"
          />
        </span>
        <span className="hidden lg:inline">Theme</span>
      </Button>
    </>
  );
};

export default ThemeToggle;
