import { cn } from "@/lib/cn";

export function Tag({ className, children, active, onClick, as: As = "span" }) {
  return (
    <As
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        onClick && "cursor-pointer",
        active
          ? "bg-primary text-white border-primary"
          : "border-[var(--border)] text-[var(--text-muted)] hover:border-primary/50 hover:text-[var(--text)]",
        className
      )}
    >
      {children}
    </As>
  );
}
