import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = window.localStorage.getItem("cookie-consent");
    if (!choice) setVisible(true);
  }, []);

  function decide(choice) {
    window.localStorage.setItem("cookie-consent", choice);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="glass fixed inset-x-4 bottom-4 z-90 flex flex-col items-center gap-4 rounded-2xl px-6 py-5 shadow-2xl sm:inset-x-auto sm:right-6 sm:max-w-sm sm:flex-col sm:items-start"
        >
          <p className="text-sm text-[var(--text-muted)]">
            This site uses cookies for essential functionality and, if accepted, analytics. Read the{" "}
            <Link to="/privacy" className="text-primary underline">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex w-full gap-2">
            <Button size="sm" onClick={() => decide("accepted")} className="flex-1">
              Accept
            </Button>
            <Button size="sm" variant="secondary" onClick={() => decide("declined")} className="flex-1">
              Decline
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
