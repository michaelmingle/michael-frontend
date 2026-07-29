import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { Seo } from "@/components/layout/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Button } from "@/components/ui/Button";
import { StaggerGroup, staggerItem } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";
import { LoadingGrid, ErrorState } from "@/components/ui/QueryState";
import { CTASection } from "@/components/sections/CTASection";
import { useServices } from "@/hooks/api/useServices";

export default function Services() {
  const { data: services, isLoading, isError, refetch } = useServices();

  return (
    <>
      <Seo path="/services" title="Services" description="Custom web development, mobile apps, POS systems, and business automation services." />
      <PageHeader
        eyebrow="Services"
        title="Full lifecycle software delivery"
        description="Whatever stage you're at — idea, MVP, or scale — I can plug in and move it forward."
      />

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          {isLoading && <LoadingGrid count={6} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" />}
          {isError && <ErrorState message="Couldn't load services — try refreshing." onRetry={refetch} />}
          {!isLoading && !isError && (
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <motion.div key={service.slug} variants={staggerItem}>
                <TiltCard className="h-full">
                  <Card className="flex h-full flex-col">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <ServiceIcon name={service.icon} size={22} />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{service.summary}</p>
                    <ul className="mt-5 flex-1 space-y-2">
                      {service.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                          <FiCheck className="mt-0.5 shrink-0 text-primary" size={14} /> {item}
                        </li>
                      ))}
                    </ul>
                    <Button to="/contact" variant="secondary" size="sm" className="mt-6 w-full">
                      Get a Quote
                    </Button>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </StaggerGroup>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
