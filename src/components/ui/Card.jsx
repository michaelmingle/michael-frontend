import { cn } from "@/lib/cn";

export function Card({ className, hover = true, glass = true, children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-[var(--border)] p-6",
        glass ? "glass" : "bg-[var(--bg-elevated)]",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_rgba(255,90,31,0.35)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
