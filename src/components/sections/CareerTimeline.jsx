import { Reveal } from "@/components/animations/Reveal";
import { timeline } from "@/data/timeline";

export function CareerTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[var(--border)] sm:left-[19px]" />
      <div className="space-y-10">
        {timeline.map((item, i) => (
          <Reveal key={`${item.year}-${i}`} direction="left" delay={i * 0.03}>
            <div className="relative flex gap-6 pl-0">
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary shadow-[0_0_0_4px_var(--bg)] sm:h-10 sm:w-10">
                <span className="h-2 w-2 rounded-full bg-white" />
              </div>
              <div className="-mt-1">
                <span className="text-sm font-bold text-primary">{item.year}</span>
                <h3 className="mt-1 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
                  {item.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
