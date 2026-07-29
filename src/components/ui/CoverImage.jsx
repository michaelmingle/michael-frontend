import { GeneratedCover } from "@/components/ui/GeneratedCover";

// Prefers a real uploaded image (from the admin dashboard); falls back to
// the generated placeholder art for entries that don't have one yet.
export function CoverImage({ src, seed, label, className }) {
  if (src) {
    return <img src={src} alt={label} className={`object-cover ${className ?? ""}`} loading="lazy" />;
  }

  return <GeneratedCover seed={seed} label={label} className={className} />;
}
