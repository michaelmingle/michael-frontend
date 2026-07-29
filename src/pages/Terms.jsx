import { Seo } from "@/components/layout/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/animations/Reveal";
import { siteConfig } from "@/data/siteConfig";

const sections = [
  {
    title: "1. Services",
    body: "Michael Awuah Sarpong provides custom software development, licensed software products, and consultation services as described on this site. Specific deliverables, timelines, and pricing for custom work are agreed in a separate written proposal or contract before work begins.",
  },
  {
    title: "2. Product Licensing",
    body: "Software products purchased through this site are licensed, not sold, under the terms specified at checkout (subscription or one-time license). Redistribution or resale of licensed software without written permission is prohibited.",
  },
  {
    title: "3. Payments",
    body: "Consultations and product purchases must be paid in full (or per the agreed schedule for custom projects) before delivery. Payment processing is handled by third-party providers (Stripe, Paystack); we do not store your card details.",
  },
  {
    title: "4. Refunds",
    body: "Digital products are generally non-refundable once delivered or downloaded, except where required by law or explicitly stated otherwise at time of purchase. Consultation bookings cancelled with at least 24 hours' notice are eligible for a full refund.",
  },
  {
    title: "5. Intellectual Property",
    body: "For custom development work, ownership of final deliverables transfers to the client upon full payment, as detailed in the project agreement. Pre-existing tools, frameworks, and internal libraries remain the property of Michael Awuah Sarpong.",
  },
  {
    title: "6. Limitation of Liability",
    body: "Services and products are provided \"as is.\" While every effort is made to deliver secure, reliable software, we are not liable for indirect or consequential damages arising from use of delivered software beyond the fees paid.",
  },
  {
    title: "7. Changes to These Terms",
    body: "These terms may be updated periodically. Continued use of the site after changes constitutes acceptance of the revised terms.",
  },
  {
    title: "8. Contact",
    body: `Questions about these terms can be sent to ${siteConfig.email}.`,
  },
];

export default function Terms() {
  return (
    <>
      <Seo path="/terms" title="Terms of Service" description="Terms governing use of services and products from Michael Awuah Sarpong." />
      <PageHeader eyebrow="Legal" title="Terms of Service" description="Last updated: January 2026" />

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
