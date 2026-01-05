
import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ isDarkMode, toggleDarkMode }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className={`transition-colors duration-300 ${
        isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
