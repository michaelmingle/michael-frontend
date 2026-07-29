import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RouteFallback } from "@/components/layout/RouteFallback";
import { useAdminResource } from "@/hooks/api/useAdminResource";

const { useOne, useCreate, useUpdate } = useAdminResource("testimonials");

export default function AdminTestimonialForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { data: testimonial, isLoading } = useOne(id);
  const createMutation = useCreate();
  const updateMutation = useUpdate();

  const { register, handleSubmit, reset } = useForm();
  const [isPublished, setIsPublished] = useState(true);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (!testimonial) return;
    reset({
      name: testimonial.name ?? "",
      role: testimonial.role ?? "",
      company: testimonial.company ?? "",
      rating: testimonial.rating ?? 5,
      quote: testimonial.quote ?? "",
      video_url: testimonial.video ?? "",
    });
    setIsPublished(Boolean(testimonial.published));
  }, [testimonial, reset]);

  if (isEdit && isLoading) return <RouteFallback />;

  async function onSubmit(fields) {
    const payload = { ...fields, is_published: isPublished, ...(avatar ? { avatar } : {}) };

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id, payload });
        toast.success("Testimonial updated");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Testimonial created");
      }
      navigate("/admin/testimonials");
    } catch {
      toast.error("Couldn't save testimonial — check the form and try again.");
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <button
        onClick={() => navigate("/admin/testimonials")}
        className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-primary"
      >
        <FiArrowLeft size={14} /> All Testimonials
      </button>

      <h1 className="mt-4 font-display text-2xl font-bold">{isEdit ? "Edit Testimonial" : "New Testimonial"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <Card className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" {...register("name", { required: true })} />
          <Input label="Role" {...register("role")} />
          <Input label="Company" {...register("company")} />
          <Select label="Rating" {...register("rating")}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} star{n > 1 ? "s" : ""}
              </option>
            ))}
          </Select>
          <div className="sm:col-span-2">
            <Textarea label="Quote" {...register("quote", { required: true })} />
          </div>
          <div className="sm:col-span-2">
            <Input label="Video URL (optional)" {...register("video_url")} />
          </div>
        </Card>

        <Card>
          <ImageUpload label="Avatar" existingUrl={testimonial?.avatar} onChange={setAvatar} />
        </Card>

        <Card>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
            Published
          </label>
        </Card>

        <Button type="submit" size="lg" disabled={isSaving}>
          {isSaving ? "Saving..." : isEdit ? "Save Changes" : "Create Testimonial"}
        </Button>
      </form>
    </div>
  );
}
