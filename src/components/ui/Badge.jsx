import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-primary/10 text-primary border-primary/20",
  neutral: "bg-[var(--bg-subtle)] text-[var(--text-muted)] border-[var(--border)]",
  success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};

export function Badge({ variant = "neutral", className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
