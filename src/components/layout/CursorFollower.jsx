import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function CursorFollower() {
  const isDesktop = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = usePrefersReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 35 });
  const springY = useSpring(y, { stiffness: 400, damping: 35 });

  useEffect(() => {
    if (!isDesktop || reducedMotion) return;

    function onMove(e) {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = e.target.closest("a, button, [data-cursor-hover]");
      setHovering(Boolean(target));
    }

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop, reducedMotion, visible, x, y]);

  if (!isDesktop || reducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-100 mix-blend-difference"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="rounded-full bg-white"
        animate={{
          width: hovering ? 48 : 14,
          height: hovering ? 48 : 14,
          x: hovering ? -24 : -7,
          y: hovering ? -24 : -7,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
}
