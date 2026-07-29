import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { TagInput } from "@/components/admin/TagInput";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RouteFallback } from "@/components/layout/RouteFallback";
import { useAdminResource } from "@/hooks/api/useAdminResource";

const { useOne, useCreate, useUpdate } = useAdminResource("blog");

export default function AdminBlogForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { data: post, isLoading } = useOne(id);
  const createMutation = useCreate();
  const updateMutation = useUpdate();

  const { register, handleSubmit, reset } = useForm();
  const [tags, setTags] = useState([]);
  const [isPublished, setIsPublished] = useState(true);
  const [cover, setCover] = useState(null);

  useEffect(() => {
    if (!post) return;
    reset({
      category: post.category ?? "",
      title: post.title ?? "",
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      reading_time: post.readingTime ?? 5,
    });
    setTags(post.tags ?? []);
    setIsPublished(Boolean(post.published));
  }, [post, reset]);

  if (isEdit && isLoading) return <RouteFallback />;

  async function onSubmit(fields) {
    const payload = {
      ...fields,
      tags,
      is_published: isPublished,
      ...(cover ? { cover } : {}),
    };

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id, payload });
        toast.success("Post updated");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Post created");
      }
      navigate("/admin/blog");
    } catch {
      toast.error("Couldn't save post — check the form and try again.");
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <button
        onClick={() => navigate("/admin/blog")}
        className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-primary"
      >
        <FiArrowLeft size={14} /> All Posts
      </button>

      <h1 className="mt-4 font-display text-2xl font-bold">{isEdit ? "Edit Post" : "New Post"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <Card className="grid gap-4 sm:grid-cols-2">
          <Input label="Title" {...register("title", { required: true })} />
          <Input label="Category" {...register("category")} />
          <div className="sm:col-span-2">
            <TagInput label="Tags" value={tags} onChange={setTags} />
          </div>
          <div className="sm:col-span-2">
            <Textarea label="Excerpt" {...register("excerpt")} />
          </div>
          <Input label="Reading Time (minutes)" type="number" {...register("reading_time")} />
        </Card>

        <Card>
          <Textarea label="Content" className="min-h-[300px]" {...register("content")} />
        </Card>

        <Card>
          <ImageUpload label="Cover Image" existingUrl={post?.cover} onChange={setCover} />
        </Card>

        <Card>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
            Published
          </label>
        </Card>

        <Button type="submit" size="lg" disabled={isSaving}>
          {isSaving ? "Saving..." : isEdit ? "Save Changes" : "Create Post"}
        </Button>
      </form>
    </div>
  );
}
