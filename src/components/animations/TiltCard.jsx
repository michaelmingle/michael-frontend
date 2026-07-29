import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function TiltCard({ children, className, maxTilt = 8 }) {
  const reducedMotion = usePrefersReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), { stiffness: 250, damping: 25 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), { stiffness: 250, damping: 25 });

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
