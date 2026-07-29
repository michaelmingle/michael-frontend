import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FiFacebook, FiLink, FiTwitter } from "react-icons/fi";
import { FaWhatsapp, FaLinkedin } from "react-icons/fa";

export function ShareButtons({ title, className }) {
  const location = useLocation();
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, [location]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { key: "twitter", icon: FiTwitter, href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { key: "facebook", icon: FiFacebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { key: "linkedin", icon: FaLinkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { key: "whatsapp", icon: FaWhatsapp, href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
  ];

  function copyLink() {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  }

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      {links.map(({ key, icon: Icon, href }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${key}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-primary hover:text-primary"
        >
          <Icon size={14} />
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-primary hover:text-primary"
      >
        <FiLink size={14} />
      </button>
    </div>
  );
}
