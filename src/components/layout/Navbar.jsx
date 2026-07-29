import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiCommand, FiMenu, FiX } from "react-icons/fi";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/cn";

export function Navbar() {
  const { scrolled } = useScrollDirection();
  const { toggle } = useCommandPalette();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 transition-all duration-300 sm:px-6",
            scrolled ? "glass py-2.5 shadow-lg mx-4 md:mx-auto" : "py-2 bg-transparent"
          )}
        >
          <NavLink to="/" className="flex items-center gap-2 font-display text-xl font-bold">
            Michael<span className="text-primary">.</span>dev
          </NavLink>

          <nav className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-primary" : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="hidden items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-muted)] hover:border-primary/50 md:flex"
            >
              <FiCommand size={12} /> K
            </button>
            <ThemeToggle className="hidden sm:flex" />
            <Button to="/contact" size="sm" className="hidden md:inline-flex">
              Hire Me
            </Button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="rounded-full border border-[var(--border)] p-2.5 lg:hidden"
            >
              {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
