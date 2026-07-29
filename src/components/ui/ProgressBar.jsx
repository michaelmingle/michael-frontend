import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function ProgressBar({ value, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={`h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-subtle)] ${className ?? ""}`}>
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
