import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiClock, FiSend } from "react-icons/fi";
import { Seo } from "@/components/layout/Seo";
import { Reveal } from "@/components/animations/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { CoverImage } from "@/components/ui/CoverImage";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { RouteFallback } from "@/components/layout/RouteFallback";
import { ErrorState } from "@/components/ui/QueryState";
import { BlogCard } from "@/components/sections/BlogCard";
import { useBlogPost, useBlogPosts } from "@/hooks/api/useBlogPosts";

export default function BlogDetail() {
  const { slug } = useParams();
  const { data: post, isLoading, isError, refetch } = useBlogPost(slug);
  const { data: allPosts } = useBlogPosts();
  const [comments, setComments] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  if (isLoading) return <RouteFallback />;
  if (isError) return <ErrorState message="Couldn't load this article — try refreshing." onRetry={refetch} />;
  if (!post) return <Navigate to="/blog" replace />;

  const related = (allPosts ?? [])
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);
  const paragraphs = (post.content ?? "").trim().split("\n\n");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
  };

  function onSubmit(data) {
    if (!data.comment?.trim()) return;
    setComments((prev) => [...prev, { id: Date.now(), name: "You", text: data.comment }]);
    reset();
  }

  return (
    <>
      <Seo path={`/blog/${post.slug}`} title={post.title} description={post.excerpt} type="article" jsonLd={articleJsonLd} />

      <article className="px-6 pt-32 pb-8">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-primary">
            <FiArrowLeft size={14} /> All Articles
          </Link>

          <Reveal>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge variant="primary">{post.category}</Badge>
              {(post.tags ?? []).filter((t) => t !== post.category).map((t) => (
                <Badge key={t} variant="neutral">
                  {t}
                </Badge>
              ))}
            </div>
            <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{post.title}</h1>

            <div className="mt-6 flex items-center justify-between border-y border-[var(--border)] py-4">
              <div className="flex items-center gap-3">
                <Avatar name={post.author} size={40} />
                <div>
                  <p className="text-sm font-semibold">{post.author}</p>
                  <p className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    <span className="flex items-center gap-1">
                      <FiClock size={12} /> {post.readingTime} min read
                    </span>
                  </p>
                </div>
              </div>
              <ShareButtons title={post.title} />
            </div>
          </Reveal>
        </div>
      </article>

      <section className="px-6 pb-8">
        <Reveal>
          <CoverImage
            src={post.cover}
            seed={post.slug}
            label={post.title}
            className="mx-auto h-56 w-full max-w-3xl rounded-3xl border border-[var(--border)] sm:h-80"
          />
        </Reveal>
      </section>

      <section className="px-6 py-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="space-y-5">
              {paragraphs.map((p, i) => (
                <p key={i} className="leading-relaxed text-[var(--text-muted)]">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-[var(--bg-subtle)]/50 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-display text-xl font-bold">Related Articles</h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-display text-xl font-bold">
              Comments {comments.length > 0 && `(${comments.length})`}
            </h2>
          </Reveal>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-3">
            <Textarea placeholder="Share your thoughts..." {...register("comment", { required: true })} />
            <Button type="submit" className="self-end" iconRight={<FiSend size={14} />}>
              Post Comment
            </Button>
          </form>

          <div className="mt-8 space-y-6">
            {comments.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)]">Be the first to comment.</p>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <Avatar name={c.name} size={36} />
                  <div>
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">{c.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
