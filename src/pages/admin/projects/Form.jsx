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

const { useOne, useCreate, useUpdate } = useAdminResource("projects");

export default function AdminProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { data: project, isLoading } = useOne(id);
  const createMutation = useCreate();
  const updateMutation = useUpdate();

  const { register, handleSubmit, reset } = useForm();
  const [tech, setTech] = useState([]);
  const [features, setFeatures] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [results, setResults] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [cover, setCover] = useState(null);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    if (!project) return;
    reset({
      category: project.category ?? "",
      title: project.title ?? "",
      summary: project.summary ?? "",
      problem: project.problem ?? "",
      solution: project.solution ?? "",
      architecture: project.architecture ?? "",
      demo_url: project.demoUrl ?? "",
      github_url: project.githubUrl ?? "",
      client_name: project.testimonial?.author ?? "",
      client_role: project.testimonial?.role ?? "",
      client_testimonial: project.testimonial?.quote ?? "",
    });
    setTech(project.tech ?? []);
    setFeatures(project.features ?? []);
    setChallenges(project.challenges ?? []);
    setResults(project.results ?? []);
    setIsFeatured(Boolean(project.featured));
    setIsPublished(Boolean(project.published));
  }, [project, reset]);

  if (isEdit && isLoading) return <RouteFallback />;

  async function onSubmit(fields) {
    const payload = {
      ...fields,
      tech,
      features,
      challenges,
      results,
      is_featured: isFeatured,
      is_published: isPublished,
      ...(cover ? { cover } : {}),
      ...(gallery.length ? { gallery } : {}),
    };

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id, payload });
        toast.success("Project updated");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Project created");
      }
      navigate("/admin/projects");
    } catch {
      toast.error("Couldn't save project — check the form and try again.");
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <button
        onClick={() => navigate("/admin/projects")}
        className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-primary"
      >
        <FiArrowLeft size={14} /> All Projects
      </button>

      <h1 className="mt-4 font-display text-2xl font-bold">{isEdit ? "Edit Project" : "New Project"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <Card className="grid gap-4 sm:grid-cols-2">
          <Input label="Title" {...register("title", { required: true })} />
          <Input label="Category" placeholder="Web Platform" {...register("category")} />
          <div className="sm:col-span-2">
            <Textarea label="Summary" {...register("summary", { required: true })} />
          </div>
          <div className="sm:col-span-2">
            <TagInput label="Tech Stack" value={tech} onChange={setTech} placeholder="Laravel, React..." />
          </div>
          <div className="sm:col-span-2">
            <TagInput label="Features" value={features} onChange={setFeatures} />
          </div>
        </Card>

        <Card className="grid gap-4">
          <Textarea label="Problem" {...register("problem")} />
          <Textarea label="Solution" {...register("solution")} />
          <Textarea label="Architecture" {...register("architecture")} />
          <TagInput label="Challenges" value={challenges} onChange={setChallenges} />
          <TagInput label="Results" value={results} onChange={setResults} />
        </Card>

        <Card className="grid gap-4 sm:grid-cols-2">
          <Input label="Demo URL" {...register("demo_url")} />
          <Input label="GitHub URL" {...register("github_url")} />
        </Card>

        <Card className="grid gap-4 sm:grid-cols-3">
          <Input label="Client Name" {...register("client_name")} />
          <Input label="Client Role" {...register("client_role")} />
          <div className="sm:col-span-1" />
          <div className="sm:col-span-3">
            <Textarea label="Client Testimonial" {...register("client_testimonial")} />
          </div>
        </Card>

        <Card className="grid gap-6">
          <ImageUpload label="Cover Image" existingUrl={project?.cover} onChange={setCover} />
          <ImageUpload label="Gallery" multiple onChange={setGallery} />
        </Card>

        <Card className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
            Published
          </label>
        </Card>

        <Button type="submit" size="lg" disabled={isSaving}>
          {isSaving ? "Saving..." : isEdit ? "Save Changes" : "Create Project"}
        </Button>
      </form>
    </div>
  );
}
