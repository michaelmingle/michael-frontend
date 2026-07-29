import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { TagInput } from "@/components/admin/TagInput";
import { RouteFallback } from "@/components/layout/RouteFallback";
import { useAdminResource } from "@/hooks/api/useAdminResource";

const { useOne, useCreate, useUpdate } = useAdminResource("services");

const iconOptions = ["code", "mobile", "api", "cart", "school", "church", "automation", "design", "consult", "wrench", "cloud", "speed"];

export default function AdminServiceForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { data: service, isLoading } = useOne(id);
  const createMutation = useCreate();
  const updateMutation = useUpdate();

  const { register, handleSubmit, reset } = useForm();
  const [includes, setIncludes] = useState([]);
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    if (!service) return;
    reset({
      title: service.title ?? "",
      icon: service.icon ?? "code",
      summary: service.summary ?? "",
    });
    setIncludes(service.includes ?? []);
    setIsPublished(Boolean(service.published));
  }, [service, reset]);

  if (isEdit && isLoading) return <RouteFallback />;

  async function onSubmit(fields) {
    const payload = { ...fields, includes, is_published: isPublished };

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id, payload });
        toast.success("Service updated");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Service created");
      }
      navigate("/admin/services");
    } catch {
      toast.error("Couldn't save service — check the form and try again.");
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <button
        onClick={() => navigate("/admin/services")}
        className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-primary"
      >
        <FiArrowLeft size={14} /> All Services
      </button>

      <h1 className="mt-4 font-display text-2xl font-bold">{isEdit ? "Edit Service" : "New Service"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <Card className="grid gap-4 sm:grid-cols-2">
          <Input label="Title" {...register("title", { required: true })} />
          <Select label="Icon" {...register("icon")}>
            {iconOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
          <div className="sm:col-span-2">
            <Textarea label="Summary" {...register("summary", { required: true })} />
          </div>
          <div className="sm:col-span-2">
            <TagInput label="What's Included" value={includes} onChange={setIncludes} />
          </div>
        </Card>

        <Card>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
            Published
          </label>
        </Card>

        <Button type="submit" size="lg" disabled={isSaving}>
          {isSaving ? "Saving..." : isEdit ? "Save Changes" : "Create Service"}
        </Button>
      </form>
    </div>
  );
}
