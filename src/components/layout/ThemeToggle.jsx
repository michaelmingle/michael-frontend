import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`relative flex h-9 w-16 items-center rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] px-1 transition-colors ${className ?? ""}`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow"
        style={{ marginLeft: isDark ? "auto" : 0 }}
      >
        {isDark ? <FiMoon size={14} /> : <FiSun size={14} />}
      </motion.span>
    </button>
  );
}
