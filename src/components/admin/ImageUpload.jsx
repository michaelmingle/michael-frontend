import { useRef, useState } from "react";
import { FiImage, FiUpload } from "react-icons/fi";

export function ImageUpload({ label, existingUrl, onChange, multiple = false }) {
  const inputRef = useRef(null);
  const [previews, setPreviews] = useState([]);

  function handleChange(e) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setPreviews(files.map((f) => URL.createObjectURL(f)));
    onChange(multiple ? files : files[0]);
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-[var(--text-muted)]">{label}</label>}
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
          {previews[0] || existingUrl ? (
            <img src={previews[0] ?? existingUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <FiImage className="text-[var(--text-muted)]" size={22} />
          )}
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-muted)] hover:border-primary hover:text-primary"
        >
          <FiUpload size={14} /> {multiple ? "Upload Images" : "Upload Image"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
