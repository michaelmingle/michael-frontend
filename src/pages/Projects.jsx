import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { Seo } from "@/components/layout/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tag } from "@/components/ui/Tag";
import { Input } from "@/components/ui/Input";
import { LoadingGrid, ErrorState } from "@/components/ui/QueryState";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CTASection } from "@/components/sections/CTASection";
import { useProjects } from "@/hooks/api/useProjects";

export default function Projects() {
  const { data: projects, isLoading, isError, refetch } = useProjects();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    if (!projects) return ["All"];
    return ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];
  }, [projects]);

  const filtered = useMemo(() => {
    if (!projects) return [];
    return projects.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        !query.trim() ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [projects, category, query]);

  return (
    <>
      <Seo path="/projects" title="Projects" description="A collection of web platforms and mobile apps built for schools, churches, restaurants, and retailers." />
      <PageHeader
        eyebrow="Projects"
        title="Real products, real users"
        description="Every project here is either live in production or has been used by real businesses."
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
              <Input
                placeholder="Search projects or tech..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="!py-2.5"
              />
            </div>
          </div>

          {isLoading && <LoadingGrid count={6} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" />}
          {isError && <ErrorState message="Couldn't load projects — try refreshing." onRetry={refetch} />}

          {!isLoading && !isError && (
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-20 flex items-center justify-center gap-2 text-center text-[var(--text-muted)]"
                >
                  <FiSearch /> No projects match your search.
                </motion.p>
              ) : (
                <motion.div
                  key="grid"
                  layout
                  className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filtered.map((project) => (
                    <motion.div
                      key={project.slug}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
