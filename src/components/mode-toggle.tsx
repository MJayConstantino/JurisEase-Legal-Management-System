"use client";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-white hover:bg-[#2D336B]"
      onClick={() => setTheme("dark")}
    >
      <Moon className="h-5 w-5" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
