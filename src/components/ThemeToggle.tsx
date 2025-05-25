
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // این هوک از هیدرومورفیسم جلوگیری می‌کند
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="w-9 h-9 opacity-0" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-9 h-9 hover-scale"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={
        theme === "dark" ? "تغییر به حالت روشن" : "تغییر به حالت تاریک"
      }
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">
        {theme === "dark" ? "تغییر به حالت روشن" : "تغییر به حالت تاریک"}
      </span>
    </Button>
  );
}
