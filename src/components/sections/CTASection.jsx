import { FiArrowRight, FiCalendar } from "react-icons/fi";
import { Reveal } from "@/components/animations/Reveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="px-6 py-24">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[var(--color-ink)] px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,90,31,0.35),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(255,90,31,0.25),transparent_60%)]" />
          <div className="relative">
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Got a product idea? Let's build it right.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              From first sketch to production deployment — I handle architecture, code, and launch.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <Button to="/contact" size="lg" iconRight={<FiArrowRight />}>
                  Hire Me
                </Button>
              </MagneticButton>
              <Button to="/book-me" variant="secondary" size="lg" icon={<FiCalendar />} className="!bg-white/10 !text-white !border-white/20">
                Book a Consultation
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
