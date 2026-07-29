import { Reveal } from "@/components/animations/Reveal";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export function SectionHeading({ eyebrow, title, description, align = "center", className }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal>
          <Badge variant="primary" className="mb-4">
            {eyebrow}
          </Badge>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg text-[var(--text-muted)]">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
