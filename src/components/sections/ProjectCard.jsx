import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { CoverImage } from "@/components/ui/CoverImage";
import { Tag } from "@/components/ui/Tag";
import { TiltCard } from "@/components/animations/TiltCard";

export function ProjectCard({ project }) {
  return (
    <TiltCard className="h-full">
      <Link to={`/projects/${project.slug}`} className="group block h-full" data-cursor-hover>
        <div className="h-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-elevated)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_70px_-24px_rgba(255,90,31,0.4)]">
          <CoverImage src={project.cover} seed={project.slug} label={project.title} className="h-48 w-full" />
          <div className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {project.category}
              </span>
              <FiArrowUpRight className="text-[var(--text-muted)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
            </div>
            <h3 className="mt-2 font-display text-xl font-bold">{project.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-[var(--text-muted)]">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.slice(0, 3).map((t) => (
                <Tag key={t} className="!px-2.5 !py-1 !text-xs">
                  {t}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
