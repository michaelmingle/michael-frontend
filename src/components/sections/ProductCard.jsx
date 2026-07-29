import { Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import { CoverImage } from "@/components/ui/CoverImage";
import { Badge } from "@/components/ui/Badge";
import { TiltCard } from "@/components/animations/TiltCard";

export function ProductCard({ product }) {
  const startingPrice = product.pricing.subscription?.[0]?.price ?? product.pricing.oneTime?.price;

  return (
    <TiltCard className="h-full">
      <Link to={`/products/${product.slug}`} className="group block h-full" data-cursor-hover>
        <div className="h-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-elevated)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_70px_-24px_rgba(255,90,31,0.4)]">
          <CoverImage src={product.cover} seed={product.slug} label={product.name} className="h-44 w-full" />
          <div className="p-6">
            <div className="flex items-center justify-between">
              <Badge variant="neutral">{product.category}</Badge>
              <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <FiStar className="fill-primary text-primary" size={12} /> {product.rating} ({product.reviews})
              </span>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold">{product.name}</h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{product.tagline}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm">
                <span className="font-display text-lg font-bold text-primary">
                  {startingPrice === 0 ? "Free" : `$${startingPrice}`}
                </span>
                {startingPrice > 0 && <span className="text-[var(--text-muted)]">/mo</span>}
              </span>
              {product.hasFreeTrial && <Badge variant="success">Free Trial</Badge>}
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
