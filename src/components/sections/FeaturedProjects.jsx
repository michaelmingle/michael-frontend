import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { LoadingGrid, ErrorState } from "@/components/ui/QueryState";
import { StaggerGroup, staggerItem } from "@/components/animations/Reveal";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { useProjects } from "@/hooks/api/useProjects";

export function FeaturedProjects() {
  const { data: projects, isLoading, isError, refetch } = useProjects();
  const featuredOnly = (projects ?? []).filter((p) => p.featured);
  const featured = (featuredOnly.length ? featuredOnly : projects ?? []).slice(0, 3);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Featured Work"
          title="Products I've designed, built & shipped"
          description="Real platforms serving real users — schools, churches, restaurants, retailers, and startups."
        />

        {isLoading && <LoadingGrid count={3} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3" />}
        {isError && <ErrorState message="Couldn't load featured projects." onRetry={refetch} />}

        {!isLoading && !isError && (
          <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {featured.map((project) => (
              <motion.div key={project.slug} variants={staggerItem}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </StaggerGroup>
        )}

        <div className="mt-10 flex justify-center">
          <Button to="/projects" variant="secondary" iconRight={<FiArrowRight size={14} />}>
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
