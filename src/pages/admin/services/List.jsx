import toast from "react-hot-toast";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/Badge";
import { useAdminResource } from "@/hooks/api/useAdminResource";

const { useList, useDelete } = useAdminResource("services");

export default function AdminServicesList() {
  const { data, isLoading, isError } = useList();
  const deleteMutation = useDelete();

  function handleDelete(id) {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Service deleted"),
      onError: () => toast.error("Couldn't delete service"),
    });
  }

  return (
    <DataTable
      title="Services"
      createTo="/admin/services/new"
      isLoading={isLoading}
      isError={isError}
      rows={data ?? []}
      isDeleting={deleteMutation.isPending}
      onDelete={handleDelete}
      getEditHref={(row) => `/admin/services/${row.id}/edit`}
      columns={[
        { key: "title", label: "Title" },
        { key: "icon", label: "Icon" },
        { key: "published", label: "Status", render: (r) => (r.published ? <Badge variant="success">Published</Badge> : <Badge>Draft</Badge>) },
      ]}
    />
  );
}
