import { motion } from "framer-motion";
import { FaDocker, FaGitAlt, FaLaravel, FaPhp, FaReact } from "react-icons/fa";
import { SiFlutter, SiMysql, SiTailwindcss } from "react-icons/si";

const icons = [
  { Icon: FaLaravel, top: "6%", left: "2%", delay: 0, color: "#FF2D20" },
  { Icon: FaReact, top: "18%", left: "88%", delay: 0.4, color: "#61DAFB" },
  { Icon: SiFlutter, top: "70%", left: "4%", delay: 0.8, color: "#02569B" },
  { Icon: FaPhp, top: "82%", left: "82%", delay: 1.2, color: "#777BB4" },
  { Icon: SiMysql, top: "42%", left: "94%", delay: 0.6, color: "#4479A1" },
  { Icon: SiTailwindcss, top: "50%", left: "-2%", delay: 1, color: "#38BDF8" },
  { Icon: FaGitAlt, top: "4%", left: "70%", delay: 1.4, color: "#F05032" },
  { Icon: FaDocker, top: "90%", left: "30%", delay: 0.2, color: "#2496ED" },
];

export function FloatingTechIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      {icons.map(({ Icon, top, left, delay, color }, i) => (
        <motion.div
          key={i}
          className="absolute flex h-14 w-14 items-center justify-center rounded-2xl glass"
          style={{ top, left }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
          transition={{
            opacity: { delay: delay + 0.3, duration: 0.6 },
            scale: { delay: delay + 0.3, duration: 0.6 },
            y: { delay: delay + 1, duration: 5 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Icon size={24} color={color} />
        </motion.div>
      ))}
    </div>
  );
}
