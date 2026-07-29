import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { StaggerGroup, staggerItem } from "@/components/animations/Reveal";
import { skills } from "@/data/skills";

export function SkillsPreview() {
  const featured = skills.slice(0, 8);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I use to ship production software"
          description="A growing stack across backend, frontend, mobile, and infrastructure — here's what I use most."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((skill) => (
            <motion.div key={skill.name} variants={staggerItem}>
              <Card className="h-full">
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-lg font-bold">{skill.name}</h3>
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

        <div className="mt-10 flex justify-center">
          <Button to="/skills" variant="secondary" iconRight={<FiArrowRight size={14} />}>
            View All Skills
          </Button>
        </div>
      </div>
    </section>
  );
}
