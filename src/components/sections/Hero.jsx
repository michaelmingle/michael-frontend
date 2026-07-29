import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiArrowRight, FiCalendar, FiDownload } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { FloatingTechIcons } from "@/components/sections/FloatingTechIcons";
import { CodeTerminal } from "@/components/sections/CodeTerminal";
import { siteConfig } from "@/data/siteConfig";

// Three.js pulls in a large chunk — defer it off the critical path since
// it's purely decorative and the hero is otherwise fully rendered without it.
const ParticleBackground = lazy(() =>
  import("@/components/animations/ParticleBackground").then((m) => ({ default: m.ParticleBackground }))
);

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
      <Suspense fallback={null}>
        <ParticleBackground className="absolute inset-0 -z-10 opacity-70" />
      </Suspense>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,90,31,0.15),transparent)]" />
      <FloatingTechIcons />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          {/* <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-1.5 text-sm text-[var(--text-muted)]"
          >
            Hi <span className="animate-[glow_2s_ease-in-out_infinite]">👋</span> {siteConfig.availability}
          </motion.p> */}

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            I'm {siteConfig.shortName},
            <br />
            <span className="text-gradient">
              <TypeAnimation
                sequence={siteConfig.roles.flatMap((r) => [r, 1800])}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--text-muted)]"
          >
            {siteConfig.tagline} Laravel · React · React Native · Flutter · UI/UX.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <Button to="/contact" size="lg" iconRight={<FiArrowRight />}>
                Hire Me
              </Button>
            </MagneticButton>
            <Button href={siteConfig.ctas.cv} variant="secondary" size="lg" icon={<FiDownload />}>
              Download CV
            </Button>
            <Button to="/book-me" variant="outline" size="lg" icon={<FiCalendar />}>
              Book Consultation
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8"
          >
            <Button to="/projects" variant="ghost" size="sm" iconRight={<FiArrowRight size={14} />}>
              View Projects
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateY: -8 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block"
        >
          <CodeTerminal />
        </motion.div>
      </div>
    </section>
  );
}
