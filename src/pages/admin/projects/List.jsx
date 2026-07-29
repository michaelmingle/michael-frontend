import toast from "react-hot-toast";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/Badge";
import { useAdminResource } from "@/hooks/api/useAdminResource";

const { useList, useDelete } = useAdminResource("projects");

export default function AdminProjectsList() {
  const { data, isLoading, isError } = useList();
  const deleteMutation = useDelete();

  function handleDelete(id) {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Project deleted"),
      onError: () => toast.error("Couldn't delete project"),
    });
  }

  return (
    <DataTable
      title="Projects"
      createTo="/admin/projects/new"
      isLoading={isLoading}
      isError={isError}
      rows={data ?? []}
      isDeleting={deleteMutation.isPending}
      onDelete={handleDelete}
      getEditHref={(row) => `/admin/projects/${row.id}/edit`}
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category", render: (r) => r.category && <Badge variant="neutral">{r.category}</Badge> },
        { key: "featured", label: "Featured", render: (r) => (r.featured ? "★" : "") },
        { key: "published", label: "Status", render: (r) => (r.published ? <Badge variant="success">Published</Badge> : <Badge>Draft</Badge>) },
      ]}
    />
  );
}
