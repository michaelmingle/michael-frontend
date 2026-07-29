import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/data/siteConfig";

export function WhatsAppFloat() {
  const digits = siteConfig.whatsapp.replace(/[^\d]/g, "");

  return (
    <motion.a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
      <FaWhatsapp size={26} className="relative" />
    </motion.a>
  );
}
