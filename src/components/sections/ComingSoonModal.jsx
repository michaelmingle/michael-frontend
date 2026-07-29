import { FiMail } from "react-icons/fi";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/siteConfig";

export function ComingSoonModal({ open, onClose, productName, action = "Checkout" }) {
  return (
    <Modal open={open} onClose={onClose} title={`${action} coming soon`}>
      <p className="text-sm leading-relaxed text-[var(--text-muted)]">
        Online checkout for <span className="font-semibold text-[var(--text)]">{productName}</span> is launching in
        the next phase of this platform. In the meantime, reach out directly and I'll set you up personally.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button to="/contact" onClick={onClose} className="flex-1">
          Contact Sales
        </Button>
        <Button href={`mailto:${siteConfig.email}`} variant="secondary" icon={<FiMail size={14} />} className="flex-1">
          Email Me
        </Button>
      </div>
    </Modal>
  );
}
