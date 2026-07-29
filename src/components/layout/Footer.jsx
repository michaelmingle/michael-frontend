import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FiArrowUpRight,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/siteConfig";

const socialIcons = [
  { key: "github", icon: FiGithub },
  { key: "linkedin", icon: FiLinkedin },
  { key: "facebook", icon: FaFacebook },
  { key: "instagram", icon: FiInstagram },
  { key: "tiktok", icon: FaTiktok },
  { key: "twitter", icon: FiTwitter },
  { key: "youtube", icon: FiYoutube },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    // Phase 2: POST to /api/newsletter/subscribe (Laravel + Mailchimp/Brevo).
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="font-display text-2xl font-bold">
              Michael<span className="text-primary">.</span>dev
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-muted)]">
              {siteConfig.bio}
            </p>
            <div className="mt-6 flex gap-2">
              {socialIcons.map(({ key, icon: Icon }) => (
                <a
                  key={key}
                  href={siteConfig.social[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {siteConfig.footerLinks.quick.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[var(--text-muted)] hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              {siteConfig.footerLinks.resources.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[var(--text-muted)] hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 text-sm text-[var(--text-muted)]">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-primary">
                <FiMail size={14} /> {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 hover:text-primary">
                <FiPhone size={14} /> {siteConfig.phone}
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Stay in the loop
            </h4>
            <p className="mb-4 text-sm text-[var(--text-muted)]">
              Occasional notes on Laravel, React, and building products. No spam.
            </p>
            {subscribed ? (
              <p className="text-sm font-medium text-primary">You're subscribed — thank you!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="!py-2.5"
                />
                <Button type="submit" size="sm" iconRight={<FiArrowUpRight size={14} />}>
                  Join
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 text-xs text-[var(--text-muted)] sm:flex-row">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
