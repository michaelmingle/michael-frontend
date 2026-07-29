import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { Seo } from "@/components/layout/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { StaggerGroup, staggerItem } from "@/components/animations/Reveal";
import { Marquee } from "@/components/animations/Marquee";
import { LoadingGrid, ErrorState } from "@/components/ui/QueryState";
import { CTASection } from "@/components/sections/CTASection";
import { useTestimonials } from "@/hooks/api/useTestimonials";
import { clientLogos } from "@/data/testimonials";

export default function Testimonials() {
  const { data: testimonials, isLoading, isError, refetch } = useTestimonials();

  return (
    <>
      <Seo path="/testimonials" title="Testimonials" description="What clients say about working with Michael Awuah Sarpong." />
      <PageHeader
        eyebrow="Testimonials"
        title="Trusted by the businesses I've built for"
        description="Every review below is from a real client running this software in production."
      />

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          {isLoading && <LoadingGrid count={6} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" />}
          {isError && <ErrorState message="Couldn't load testimonials — try refreshing." onRetry={refetch} />}
          {!isLoading && !isError && (
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={staggerItem}>
                <Card className="flex h-full flex-col">
                  <div className="flex gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar key={i} size={14} fill={i < t.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">"{t.quote}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar name={t.name} size={44} />
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </StaggerGroup>
          )}
        </div>
      </section>

      <section className="pb-24">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          Trusted by teams at
        </p>
        <Marquee>
          {clientLogos.map((client) => (
            <span key={client.name} className="whitespace-nowrap font-display text-2xl font-bold text-[var(--text-muted)]/50">
              {client.name}
            </span>
          ))}
        </Marquee>
      </section>

      <CTASection />
    </>
  );
}
