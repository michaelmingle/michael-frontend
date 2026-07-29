import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Seo } from "@/components/layout/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tag } from "@/components/ui/Tag";
import { LoadingGrid, ErrorState } from "@/components/ui/QueryState";
import { StaggerGroup, staggerItem } from "@/components/animations/Reveal";
import { ProductCard } from "@/components/sections/ProductCard";
import { CTASection } from "@/components/sections/CTASection";
import { useProducts } from "@/hooks/api/useProducts";

export default function Products() {
  const { data: products, isLoading, isError, refetch } = useProducts();
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    if (!products) return ["All"];
    return ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];
  }, [products]);

  const filtered = useMemo(() => {
    if (!products) return [];
    return category === "All" ? products : products.filter((p) => p.category === category);
  }, [products, category]);

  return (
    <>
      <Seo path="/products" title="Products" description="Ready-to-license software products: POS, school management, church management, and more." />
      <PageHeader
        eyebrow="Products"
        title="Software you can license today"
        description="Battle-tested platforms, packaged as products — deploy them for your own business."
      />

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Tag key={cat} active={category === cat} onClick={() => setCategory(cat)}>
                {cat}
              </Tag>
            ))}
          </div>

          {isLoading && <LoadingGrid count={6} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" />}
          {isError && <ErrorState message="Couldn't load products — try refreshing." onRetry={refetch} />}

          {!isLoading && !isError && (
            <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" key={category}>
              {filtered.map((product) => (
                <motion.div key={product.slug} variants={staggerItem}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
