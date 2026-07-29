import { useEffect, useRef, useState } from "react";

export function useScrollDirection({ threshold = 8 } = {}) {
  const [direction, setDirection] = useState("up");
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (Math.abs(y - lastY.current) < threshold) return;
      setDirection(y > lastY.current ? "down" : "up");
      lastY.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { direction, scrolled };
}
