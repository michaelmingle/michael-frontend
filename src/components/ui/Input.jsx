import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const Input = forwardRef(function Input({ className, error, label, id, ...props }, ref) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[var(--text-muted)]">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full rounded-xl border bg-[var(--bg-elevated)] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[var(--text-muted)]",
          error ? "border-red-500" : "border-[var(--border)] focus:border-primary",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

export const Textarea = forwardRef(function Textarea({ className, error, label, id, ...props }, ref) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[var(--text-muted)]">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        rows={5}
        className={cn(
          "w-full rounded-xl border bg-[var(--bg-elevated)] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[var(--text-muted)] resize-none",
          error ? "border-red-500" : "border-[var(--border)] focus:border-primary",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

export const Select = forwardRef(function Select({ className, error, label, id, children, ...props }, ref) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[var(--text-muted)]">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={cn(
          "w-full rounded-xl border bg-[var(--bg-elevated)] px-4 py-3 text-sm outline-none transition-colors",
          error ? "border-red-500" : "border-[var(--border)] focus:border-primary",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});
