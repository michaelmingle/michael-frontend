import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { Seo } from "@/components/layout/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal, StaggerGroup, staggerItem } from "@/components/animations/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { cn } from "@/lib/cn";
import { servicePricing, consultationPricing } from "@/data/pricing";
import { faqs } from "@/data/faq";

export default function Pricing() {
  return (
    <>
      <Seo path="/pricing" title="Pricing" description="Transparent pricing for custom web development, mobile apps, and consultation." />
      <PageHeader
        eyebrow="Pricing"
        title="Investment, not just cost"
        description="Every engagement starts with a scoped proposal — these are starting points to plan around."
      />

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <StaggerGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {servicePricing.map((plan) => (
              <motion.div key={plan.tier} variants={staggerItem}>
                <Card
                  glass={plan.highlighted}
                  className={cn("relative flex h-full flex-col", plan.highlighted && "border-primary/50")}
                >
                  {plan.highlighted && (
                    <Badge variant="primary" className="absolute -top-3 left-6">
                      Most Popular
                    </Badge>
                  )}
                  <h3 className="font-display text-xl font-bold">{plan.tier}</h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{plan.description}</p>
                  <p className="mt-6 font-display text-4xl font-extrabold">
                    {plan.price ? `$${plan.price.toLocaleString()}` : "Custom"}
                    {plan.price && <span className="text-base font-medium text-[var(--text-muted)]">/{plan.period}</span>}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <FiCheck className="mt-0.5 shrink-0 text-primary" size={16} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button to="/contact" variant={plan.highlighted ? "primary" : "secondary"} className="mt-8 w-full">
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <Card className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold">1-on-1 Technical Consultation</h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{consultationPricing.description}</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-extrabold">
                  ${consultationPricing.price}
                  <span className="text-base font-medium text-[var(--text-muted)]"> / {consultationPricing.duration}</span>
                </p>
                <Button to="/book-me" className="mt-3">
                  Book Now
                </Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--bg-subtle)]/50 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-extrabold sm:text-4xl">Pricing FAQ</h2>
          </Reveal>
          <div className="mt-10">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
