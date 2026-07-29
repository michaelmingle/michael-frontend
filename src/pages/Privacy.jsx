import { Seo } from "@/components/layout/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/animations/Reveal";
import { siteConfig } from "@/data/siteConfig";

const sections = [
  {
    title: "1. Information We Collect",
    body: "When you use this site, we may collect information you provide directly (name, email, message content via contact/booking forms) and information collected automatically (pages visited, browser type, device information, and approximate location via IP) for analytics and security purposes.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use collected information to respond to inquiries, process bookings and orders, send requested updates (only if you opt in to the newsletter), improve the site, and maintain security. We do not sell your personal data.",
  },
  {
    title: "3. Cookies",
    body: "This site uses essential cookies for functionality (such as remembering your theme preference) and, where enabled, analytics cookies to understand site usage. You can control cookie preferences via your browser settings or the cookie consent banner.",
  },
  {
    title: "4. Data Sharing",
    body: "We only share data with third-party services necessary to operate the site (e.g. payment processors for purchases, email delivery providers for notifications) and never for advertising resale.",
  },
  {
    title: "5. Your Rights",
    body: "Depending on your jurisdiction (including GDPR for EU/UK visitors), you may have the right to access, correct, export, or delete your personal data. Contact us using the details below to exercise these rights.",
  },
  {
    title: "6. Data Retention",
    body: "We retain contact and order information only as long as necessary to provide services and meet legal obligations, after which it is deleted or anonymized.",
  },
  {
    title: "7. Contact",
    body: `Questions about this policy can be sent to ${siteConfig.email}.`,
  },
];

export default function Privacy() {
  return (
    <>
      <Seo path="/privacy" title="Privacy Policy" description="How Michael Awuah Sarpong collects, uses, and protects your data." />
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated: January 2026" />

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((s) => (
            <Reveal key={s.title}>
              <h2 className="font-display text-xl font-bold">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-[var(--text-muted)]">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
