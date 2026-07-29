import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Button } from "@/components/ui/Button";
import { LoadingGrid, ErrorState } from "@/components/ui/QueryState";
import { StaggerGroup, staggerItem } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";
import { useServices } from "@/hooks/api/useServices";

export function ServicesPreview() {
  const { data: services, isLoading, isError, refetch } = useServices();
  const featured = (services ?? []).slice(0, 6);

  return (
    <section className="bg-[var(--bg-subtle)]/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Services"
          title="What I can build for you"
          description="From MVPs to enterprise-grade platforms — full lifecycle delivery, not just code."
        />

        {isLoading && <LoadingGrid count={6} className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" />}
        {isError && <ErrorState message="Couldn't load services." onRetry={refetch} />}

        {!isLoading && !isError && (
          <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((service) => (
              <motion.div key={service.slug} variants={staggerItem}>
                <TiltCard>
                  <Link to="/services">
                    <Card className="h-full">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <ServiceIcon name={service.icon} size={22} />
                      </div>
                      <h3 className="mt-5 font-display text-lg font-bold">{service.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{service.summary}</p>
                    </Card>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </StaggerGroup>
        )}

        <div className="mt-10 flex justify-center">
          <Button to="/services" variant="secondary" iconRight={<FiArrowRight size={14} />}>
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
