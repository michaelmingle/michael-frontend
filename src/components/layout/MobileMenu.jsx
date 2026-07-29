import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { siteConfig } from "@/data/siteConfig";

export function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-90 flex flex-col bg-[var(--bg)] md:hidden"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-display text-lg font-bold">
              Michael<span className="text-primary">.</span>
            </span>
            <ThemeToggle />
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
            {siteConfig.nav.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block py-3 font-display text-3xl font-semibold ${isActive ? "text-primary" : "text-[var(--text)]"}`
                  }
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>
          <div className="flex flex-col gap-3 px-6 pb-10">
            <Button to="/contact" onClick={onClose} className="w-full">
              Hire Me
            </Button>
            <Button to="/book-me" onClick={onClose} variant="secondary" className="w-full">
              Book Consultation
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
