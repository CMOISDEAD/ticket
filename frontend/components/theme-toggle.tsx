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
    <div className="flex items-center justify-between rounded-full border border-border bg-background p-1 shadow">
      {modes.map((mode, i) => (
        <button
          key={i}
          onClick={() => setTheme(mode.name)}
          className={`mr-1 p-2 ${
            theme === mode.name ? "rounded-full bg-muted shadow-xl" : ""
          }`}
        >
          <mode.icon className="h-5 w-5 text-muted-foreground" />
        </button>
      ))}
    </div>
  );
}
