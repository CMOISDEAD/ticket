"use client";

import { Monitor, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const modes = [
  {
    name: "system",
    icon: Monitor,
  },
  {
    name: "dark",
    icon: Moon,
  },
  {
    name: "light",
    icon: Sun,
  },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="border-border bg-background flex items-center justify-between rounded-full border p-1 shadow">
      {modes.map((mode, i) => (
        <button
          key={i}
          onClick={() => setTheme(mode.name)}
          className={`mr-1 p-2 ${
            theme === mode.name ? "bg-muted rounded-full shadow-xl" : ""
          }`}
        >
          <mode.icon className="text-muted-foreground h-5 w-5" />
        </button>
      ))}
    </div>
  );
}
