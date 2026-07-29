import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

export function LoadingGrid({ count = 6, className }) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-80 animate-pulse rounded-3xl border border-[var(--border)] bg-[var(--bg-subtle)]" />
      ))}
    </div>
  );
}

export function ErrorState({ message = "Couldn't load this content — try refreshing.", onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center text-[var(--text-muted)]">
      <FiAlertCircle size={28} />
      <p>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] hover:border-primary hover:text-primary"
        >
          <FiRefreshCw size={14} /> Try again
        </button>
      )}
    </div>
  );
}
