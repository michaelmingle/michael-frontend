import { cn } from "@/lib/cn";

export function GlassPanel({ className, children, ...props }) {
  return (
    <div className={cn("glass rounded-3xl", className)} {...props}>
      {children}
    </div>
  );
}
