import { useState } from "react";
import { FiX } from "react-icons/fi";

// Free-text chip input for array fields (tech, features, tags, includes,
// challenges, results) — press Enter or comma to add an entry.
export function TagInput({ label, value = [], onChange, placeholder = "Type and press Enter..." }) {
  const [draft, setDraft] = useState("");

  function commit() {
    const v = draft.trim();
    if (!v) return;
    onChange([...value, v]);
    setDraft("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit();
    } else if (e.key === "Backspace" && !draft && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  function remove(index) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-[var(--text-muted)]">{label}</label>}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 focus-within:border-primary">
        {value.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            {item}
            <button type="button" onClick={() => remove(i)} aria-label={`Remove ${item}`}>
              <FiX size={12} />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commit}
          placeholder={value.length === 0 ? placeholder : ""}
          className="min-w-[8rem] flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-[var(--text-muted)]"
        />
      </div>
    </div>
  );
}
