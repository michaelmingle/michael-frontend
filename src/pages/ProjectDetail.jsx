import { Link, Navigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight, FiCheck, FiExternalLink, FiGithub } from "react-icons/fi";
import { Seo } from "@/components/layout/Seo";
import { Reveal, StaggerGroup, staggerItem } from "@/components/animations/Reveal";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { CoverImage } from "@/components/ui/CoverImage";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { RouteFallback } from "@/components/layout/RouteFallback";
import { ErrorState } from "@/components/ui/QueryState";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CTASection } from "@/components/sections/CTASection";
import { useProject, useProjects } from "@/hooks/api/useProjects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: project, isLoading, isError, refetch } = useProject(slug);
  const { data: allProjects } = useProjects();

  if (isLoading) return <RouteFallback />;
  if (isError) return <ErrorState message="Couldn't load this project — try refreshing." onRetry={refetch} />;
  if (!project) return <Navigate to="/projects" replace />;

  const related = (allProjects ?? [])
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);

  return (
    <>
      <Seo path={`/projects/${project.slug}`} title={project.title} description={project.summary} type="article" />

      <section className="px-6 pt-32 pb-8">
        <div className="mx-auto max-w-5xl">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-primary">
            <FiArrowLeft size={14} /> All Projects
          </Link>

          <Reveal>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Tag>{project.category}</Tag>
              {project.tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-[var(--text-muted)]">{project.summary}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.demoUrl && (
                <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer" iconRight={<FiExternalLink size={14} />}>
                  Live Demo
                </Button>
              )}
              {project.githubUrl && (
                <Button href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="secondary" icon={<FiGithub size={14} />}>
                  GitHub
                </Button>
              )}
              {project.storeLinks?.googlePlay && (
                <Button href={project.storeLinks.googlePlay} target="_blank" rel="noopener noreferrer" variant="secondary">
                  Google Play
                </Button>
              )}
              {project.storeLinks?.appStore && (
                <Button href={project.storeLinks.appStore} target="_blank" rel="noopener noreferrer" variant="secondary">
                  App Store
                </Button>
              )}
              <ShareButtons title={project.title} className="ml-auto" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-8">
        <Reveal>
          <CoverImage
            src={project.cover}
            seed={project.slug}
            label={project.title}
            className="mx-auto h-64 w-full max-w-5xl rounded-3xl border border-[var(--border)] sm:h-96"
          />
        </Reveal>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_0.6fr]">
          <div className="space-y-10">
            <Reveal>
              <h2 className="font-display text-2xl font-bold">The Problem</h2>
              <p className="mt-3 leading-relaxed text-[var(--text-muted)]">{project.problem}</p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-2xl font-bold">The Solution</h2>
              <p className="mt-3 leading-relaxed text-[var(--text-muted)]">{project.solution}</p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-2xl font-bold">Architecture</h2>
              <p className="mt-3 leading-relaxed text-[var(--text-muted)]">{project.architecture}</p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-2xl font-bold">Challenges</h2>
              <ul className="mt-3 space-y-2">
                {project.challenges.map((c) => (
                  <li key={c} className="text-[var(--text-muted)]">
                    — {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal direction="left">
              <Card>
                <h3 className="font-display text-lg font-bold">Features</h3>
                <StaggerGroup className="mt-4 space-y-2">
                  {project.features.map((f) => (
                    <motion.div key={f} variants={staggerItem} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <FiCheck className="mt-0.5 shrink-0 text-primary" size={14} /> {f}
                    </motion.div>
                  ))}
                </StaggerGroup>
              </Card>
            </Reveal>

            <Reveal direction="left" delay={0.05}>
              <Card>
                <h3 className="font-display text-lg font-bold">Results</h3>
                <ul className="mt-4 space-y-3">
                  {project.results.map((r) => (
                    <li key={r} className="text-sm leading-relaxed text-[var(--text-muted)]">
                      ✓ {r}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>

            {project.testimonial && (
              <Reveal direction="left" delay={0.1}>
                <Card className="border-primary/30">
                  <p className="text-sm italic leading-relaxed text-[var(--text-muted)]">"{project.testimonial.quote}"</p>
                  <div className="mt-4 flex items-center gap-3">
                    <Avatar name={project.testimonial.author} size={40} />
                    <div>
                      <p className="text-sm font-semibold">{project.testimonial.author}</p>
                      <p className="text-xs text-[var(--text-muted)]">{project.testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-[var(--bg-subtle)]/50 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">More {project.category} Projects</h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Button to="/projects" variant="secondary" iconRight={<FiArrowUpRight size={14} />}>
                View All Projects
              </Button>
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
