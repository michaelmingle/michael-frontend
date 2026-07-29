import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

export function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="glass relative z-10 w-full max-w-md rounded-3xl p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full p-2 text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]"
            >
              <FiX size={18} />
            </button>
            {title && <h3 className="mb-3 font-display text-xl font-bold pr-8">{title}</h3>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
