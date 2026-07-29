import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "@/lib/cn";

export function Accordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)]">
      {items.map((item, i) => (
        <div key={item.question}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
          >
            <span className="font-medium">{item.question}</span>
            <FiChevronDown
              className={cn("shrink-0 text-[var(--text-muted)] transition-transform", open === i && "rotate-180")}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 text-sm leading-relaxed text-[var(--text-muted)]">{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
