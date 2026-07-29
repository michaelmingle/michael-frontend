import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { Seo } from "@/components/layout/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tag } from "@/components/ui/Tag";
import { Input } from "@/components/ui/Input";
import { LoadingGrid, ErrorState } from "@/components/ui/QueryState";
import { StaggerGroup, staggerItem } from "@/components/animations/Reveal";
import { BlogCard } from "@/components/sections/BlogCard";
import { useBlogPosts } from "@/hooks/api/useBlogPosts";

export default function Blog() {
  const { data: blogPosts, isLoading, isError, refetch } = useBlogPosts();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    if (!blogPosts) return ["All"];
    return ["All", ...new Set(blogPosts.map((p) => p.category).filter(Boolean))];
  }, [blogPosts]);

  const filtered = useMemo(() => {
    if (!blogPosts) return [];
    return blogPosts.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery = !query.trim() || p.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [blogPosts, category, query]);

  return (
    <>
      <Seo path="/blog" title="Blog" description="Notes on Laravel, React, mobile development, and building software for African markets." />
      <PageHeader
        eyebrow="Blog"
        title="Writing on code, architecture & building products"
        description="What I've learned shipping real software — no fluff, no filler."
      />

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <Tag key={cat} active={category === cat} onClick={() => setCategory(cat)}>
                  {cat}
                </Tag>
              ))}
            </div>
            <div className="w-full sm:w-64">
              <Input placeholder="Search articles..." value={query} onChange={(e) => setQuery(e.target.value)} className="!py-2.5" />
            </div>
          </div>

          {isLoading && <LoadingGrid count={6} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" />}
          {isError && <ErrorState message="Couldn't load articles — try refreshing." onRetry={refetch} />}

          {!isLoading && !isError && (
            filtered.length === 0 ? (
              <p className="mt-20 flex items-center justify-center gap-2 text-center text-[var(--text-muted)]">
                <FiSearch /> No articles match your search.
              </p>
            ) : (
              <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" key={category + query}>
                {filtered.map((post) => (
                  <motion.div key={post.slug} variants={staggerItem}>
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </StaggerGroup>
            )
          )}
        </div>
      </section>
    </>
  );
}
