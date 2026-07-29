import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FiStar } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Marquee } from "@/components/animations/Marquee";
import { LoadingGrid, ErrorState } from "@/components/ui/QueryState";
import { useTestimonials } from "@/hooks/api/useTestimonials";
import { clientLogos } from "@/data/testimonials";

import "swiper/css";
import "swiper/css/pagination";

export function TestimonialsSlider() {
  const { data: testimonials, isLoading, isError, refetch } = useTestimonials();

  return (
    <section className="bg-[var(--bg-subtle)]/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients say after we ship"
          description="Direct feedback from the people running the businesses these products power."
        />

        {isLoading && <LoadingGrid count={3} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3" />}
        {isError && <ErrorState message="Couldn't load testimonials." onRetry={refetch} />}

        {!isLoading && !isError && (
        <div className="mt-14">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
            className="!pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.name}>
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        )}

        <div className="mt-6">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Trusted by teams at
          </p>
          <Marquee>
            {clientLogos.map((client) => (
              <span
                key={client.name}
                className="whitespace-nowrap font-display text-xl font-bold text-[var(--text-muted)]/50"
              >
                {client.name}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
