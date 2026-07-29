import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Seo } from "@/components/layout/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { StaggerGroup, staggerItem, Reveal } from "@/components/animations/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { skillCategories, skills, techRadar } from "@/data/skills";

export default function Skills() {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () => (category === "All" ? skills : skills.filter((s) => s.category === category)),
    [category]
  );

  return (
    <>
      <Seo path="/skills" title="Skills" description="Technologies and tools Michael Awuah Sarpong uses to build production software." />
      <PageHeader
        eyebrow="Skills"
        title="A stack built on real production work"
        description="Every skill below reflects real production usage — not a checklist."
      />

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-2">
            {skillCategories.map((cat) => (
              <Tag key={cat} active={category === cat} onClick={() => setCategory(cat)}>
                {cat}
              </Tag>
            ))}
          </div>

          <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" key={category}>
            {filtered.map((skill) => (
              <motion.div key={skill.name} variants={staggerItem}>
                <Card className="h-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold">{skill.name}</h3>
                      <span className="text-xs text-[var(--text-muted)]">{skill.category}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">{skill.level}%</span>
                  </div>
                  <ProgressBar value={skill.level} className="mt-4" />
                  <div className="mt-4 flex justify-between text-xs text-[var(--text-muted)]">
                    <span>{skill.years} yrs experience</span>
                    <span>{skill.projects} projects</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-[var(--bg-subtle)]/50 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-extrabold sm:text-4xl">Technology Radar</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-[var(--text-muted)]">
              How I currently think about adopting new tools into production work.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(techRadar).map(([ring, items], i) => (
              <Reveal key={ring} delay={i * 0.05}>
                <Card className="h-full">
                  <Badge variant={ring === "adopt" ? "success" : "neutral"} className="capitalize">
                    {ring}
                  </Badge>
                  <ul className="mt-4 space-y-2">
                    {items.map((item) => (
                      <li key={item} className="text-sm text-[var(--text-muted)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
