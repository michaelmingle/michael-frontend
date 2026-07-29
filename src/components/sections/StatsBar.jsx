import { Counter } from "@/components/animations/Counter";
import { StaggerGroup, staggerItem } from "@/components/animations/Reveal";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

export function StatsBar() {
  return (
    <section className="bg-[var(--color-ink)] py-6">
      <div className="mx-auto max-w-7xl px-6">
        <StaggerGroup className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {siteConfig.stats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem} className="text-center">
              <p className="font-display text-2xl font-extrabold text-gradient sm:text-3xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-xs text-white/60 sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
