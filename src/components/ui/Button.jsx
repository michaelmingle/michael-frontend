import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-primary text-white shadow-[0_8px_30px_-8px_rgba(255,90,31,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(255,90,31,0.75)] hover:brightness-110",
  secondary:
    "glass text-[var(--text)] hover:border-primary/50",
  ghost: "bg-transparent text-[var(--text)] hover:bg-[var(--bg-subtle)]",
  outline: "border border-[var(--border)] text-[var(--text)] hover:border-primary hover:text-primary bg-transparent",
};

const sizes = {
  sm: "text-sm px-4 py-2 gap-1.5",
  md: "text-sm px-6 py-3 gap-2",
  lg: "text-base px-8 py-4 gap-2.5",
};

export const Button = forwardRef(function Button(
  { as, to, href, variant = "primary", size = "md", className, children, icon, iconRight, ...props },
  ref
) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-semibold tracking-tight transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {icon}
        {children}
        {iconRight}
      </Link>
    );
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {icon}
        {children}
        {iconRight}
      </a>
    );
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {icon}
      {children}
      {iconRight}
    </button>
  );
});
