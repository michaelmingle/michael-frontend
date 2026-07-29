import toast from "react-hot-toast";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/Badge";
import { useAdminResource } from "@/hooks/api/useAdminResource";

const { useList, useDelete } = useAdminResource("products");

export default function AdminProductsList() {
  const { data, isLoading, isError } = useList();
  const deleteMutation = useDelete();

  function handleDelete(id) {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Product deleted"),
      onError: () => toast.error("Couldn't delete product"),
    });
  }

  return (
    <DataTable
      title="Products"
      createTo="/admin/products/new"
      isLoading={isLoading}
      isError={isError}
      rows={data ?? []}
      isDeleting={deleteMutation.isPending}
      onDelete={handleDelete}
      getEditHref={(row) => `/admin/products/${row.id}/edit`}
      columns={[
        { key: "name", label: "Name" },
        { key: "category", label: "Category", render: (r) => r.category && <Badge variant="neutral">{r.category}</Badge> },
        { key: "rating", label: "Rating" },
        { key: "published", label: "Status", render: (r) => (r.published ? <Badge variant="success">Published</Badge> : <Badge>Draft</Badge>) },
      ]}
    />
  );
}
