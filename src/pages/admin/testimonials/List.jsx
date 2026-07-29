import toast from "react-hot-toast";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/Badge";
import { useAdminResource } from "@/hooks/api/useAdminResource";

const { useList, useDelete } = useAdminResource("testimonials");

export default function AdminTestimonialsList() {
  const { data, isLoading, isError } = useList();
  const deleteMutation = useDelete();

  function handleDelete(id) {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Testimonial deleted"),
      onError: () => toast.error("Couldn't delete testimonial"),
    });
  }

  return (
    <DataTable
      title="Testimonials"
      createTo="/admin/testimonials/new"
      isLoading={isLoading}
      isError={isError}
      rows={data ?? []}
      isDeleting={deleteMutation.isPending}
      onDelete={handleDelete}
      getEditHref={(row) => `/admin/testimonials/${row.id}/edit`}
      columns={[
        { key: "name", label: "Name" },
        { key: "company", label: "Company" },
        { key: "rating", label: "Rating", render: (r) => "★".repeat(r.rating) },
        { key: "published", label: "Status", render: (r) => (r.published ? <Badge variant="success">Published</Badge> : <Badge>Draft</Badge>) },
      ]}
    />
  );
}
