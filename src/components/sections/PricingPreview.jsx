import { motion } from "framer-motion";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StaggerGroup, staggerItem } from "@/components/animations/Reveal";
import { cn } from "@/lib/cn";
import { servicePricing } from "@/data/pricing";

export function PricingPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, transparent engagement models"
          description="Every project starts with a scoped proposal — these are starting points, not fixed menus."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
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

        <div className="mt-10 flex justify-center">
          <Button to="/pricing" variant="ghost" iconRight={<FiArrowRight size={14} />}>
            See Full Pricing Details
          </Button>
        </div>
      </div>
    </section>
  );
}
