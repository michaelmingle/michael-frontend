import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiBookOpen, FiCheck, FiExternalLink, FiHeart, FiStar } from "react-icons/fi";
import { Seo } from "@/components/layout/Seo";
import { Reveal, StaggerGroup, staggerItem } from "@/components/animations/Reveal";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CoverImage } from "@/components/ui/CoverImage";
import { RouteFallback } from "@/components/layout/RouteFallback";
import { ErrorState } from "@/components/ui/QueryState";
import { ComingSoonModal } from "@/components/sections/ComingSoonModal";
import { ProductCard } from "@/components/sections/ProductCard";
import { cn } from "@/lib/cn";
import { useProduct, useProducts } from "@/hooks/api/useProducts";

export default function ProductDetail() {
  const { slug } = useParams();
  const { data: product, isLoading, isError, refetch } = useProduct(slug);
  const { data: allProducts } = useProducts();
  const [modalAction, setModalAction] = useState(null);
  const [wishlisted, setWishlisted] = useState(false);

  if (isLoading) return <RouteFallback />;
  if (isError) return <ErrorState message="Couldn't load this product — try refreshing." onRetry={refetch} />;
  if (!product) return <Navigate to="/products" replace />;

  const related = (allProducts ?? [])
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 3);

  const startingPrice = product.pricing.subscription?.[0]?.price ?? product.pricing.oneTime?.price ?? 0;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    category: product.category,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      "@type": "Offer",
      price: startingPrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <Seo path={`/products/${product.slug}`} title={product.name} description={product.tagline} type="product" jsonLd={productJsonLd} />

      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-6xl">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-primary">
            <FiArrowLeft size={14} /> All Products
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal direction="right">
              <CoverImage
                src={product.cover}
                seed={product.slug}
                label={product.name}
                className="aspect-[4/3] w-full rounded-3xl border border-[var(--border)]"
              />
            </Reveal>

            <Reveal>
              <Badge variant="neutral">{product.category}</Badge>
              <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{product.name}</h1>
              <p className="mt-3 text-lg text-[var(--text-muted)]">{product.tagline}</p>

              <div className="mt-4 flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <span className="flex items-center gap-1 text-primary">
                  <FiStar className="fill-primary" size={14} /> {product.rating}
                </span>
                ({product.reviews} reviews)
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {product.features.map((f) => (
                  <span key={f} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]">
                    {f}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button onClick={() => setModalAction("Purchase")}>Buy Now</Button>
                {product.hasFreeTrial && (
                  <Button variant="secondary" onClick={() => setModalAction("Free trial")}>
                    Start Free Trial
                  </Button>
                )}
                {product.demoUrl && (
                  <Button href={product.demoUrl} target="_blank" rel="noopener noreferrer" variant="outline" iconRight={<FiExternalLink size={14} />}>
                    Live Demo
                  </Button>
                )}
                <button
                  onClick={() => setWishlisted((v) => !v)}
                  aria-label="Add to wishlist"
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
                    wishlisted ? "border-primary text-primary" : "border-[var(--border)] text-[var(--text-muted)]"
                  )}
                >
                  <FiHeart size={16} fill={wishlisted ? "currentColor" : "none"} />
                </button>
              </div>
              {product.hasDocs && (
                <a href="#" onClick={(e) => e.preventDefault()} className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-primary">
                  <FiBookOpen size={14} /> View Documentation
                </a>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-subtle)]/50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-extrabold sm:text-4xl">Pricing</h2>
          </Reveal>

          <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.pricing.subscription?.map((tier, i) => (
              <motion.div key={tier.tier} variants={staggerItem}>
                <Card className={cn("flex h-full flex-col", i === 1 && "border-primary/50")}>
                  <h3 className="font-display text-lg font-bold">{tier.tier}</h3>
                  <p className="mt-4 font-display text-3xl font-extrabold">
                    {tier.price === 0 ? "Free" : `$${tier.price}`}
                    {tier.price > 0 && <span className="text-base font-medium text-[var(--text-muted)]">/{tier.period}</span>}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <FiCheck className="mt-0.5 shrink-0 text-primary" size={14} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => setModalAction("Subscribe")} className="mt-6 w-full" variant={i === 1 ? "primary" : "secondary"}>
                    Choose {tier.tier}
                  </Button>
                </Card>
              </motion.div>
            ))}
            {product.pricing.oneTime && (
              <motion.div variants={staggerItem}>
                <Card className="flex h-full flex-col">
                  <h3 className="font-display text-lg font-bold">One-Time License</h3>
                  <p className="mt-4 font-display text-3xl font-extrabold">${product.pricing.oneTime.price.toLocaleString()}</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">Full source, self-hosted, lifetime license.</p>
                  <Button onClick={() => setModalAction("Purchase")} className="mt-auto w-full pt-6" variant="secondary">
                    Buy License
                  </Button>
                </Card>
              </motion.div>
            )}
          </StaggerGroup>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">You might also like</h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ComingSoonModal
        open={Boolean(modalAction)}
        onClose={() => setModalAction(null)}
        productName={product.name}
        action={modalAction ?? ""}
      />
    </>
  );
}
