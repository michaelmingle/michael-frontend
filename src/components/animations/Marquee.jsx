import { cn } from "@/lib/cn";

export function Marquee({ children, className, reverse = false, speed = "30s" }) {
  return (
    <div className={cn("group flex overflow-hidden no-scrollbar", className)}>
      <div
        className="flex shrink-0 items-center gap-12 pr-12"
        style={{
          animation: `marquee ${speed} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
