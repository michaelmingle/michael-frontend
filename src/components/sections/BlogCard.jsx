import { Link } from "react-router-dom";
import { FiArrowUpRight, FiClock } from "react-icons/fi";
import { CoverImage } from "@/components/ui/CoverImage";
import { Badge } from "@/components/ui/Badge";
import { TiltCard } from "@/components/animations/TiltCard";

export function BlogCard({ post }) {
  return (
    <TiltCard className="h-full">
      <Link to={`/blog/${post.slug}`} className="group block h-full" data-cursor-hover>
        <div className="h-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-elevated)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_70px_-24px_rgba(255,90,31,0.4)]">
          <CoverImage src={post.cover} seed={post.slug} label={post.title} className="h-44 w-full" />
          <div className="p-6">
            <div className="flex items-center justify-between">
              <Badge variant="primary">{post.category}</Badge>
              <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <FiClock size={12} /> {post.readingTime} min read
              </span>
            </div>
            <h3 className="mt-3 line-clamp-2 font-display text-lg font-bold">{post.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-[var(--text-muted)]">{post.excerpt}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
