import { Reveal } from "@/components/animations/Reveal";
import { Badge } from "@/components/ui/Badge";

export function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="relative overflow-hidden pt-40 pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(255,90,31,0.12),transparent)]" />
      <div className="mx-auto max-w-4xl px-6 text-center">
        {eyebrow && (
          <Reveal>
            <Badge variant="primary" className="mb-5">
              {eyebrow}
            </Badge>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-[var(--text-muted)]">{description}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
