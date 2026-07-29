import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toFormData } from "@/lib/toFormData";

// Generates matching CRUD hooks for an admin-protected resource. Every
// admin screen (Projects, Products, Blog, Services, Testimonials) follows
// the identical list/create/update/delete shape, so this factory is what
// keeps five near-identical screens from turning into five copies of the
// same data-fetching logic.
export function useAdminResource(entity) {
  const listKey = ["admin", entity];

  function useList() {
    return useQuery({
      queryKey: listKey,
      queryFn: async () => (await api.get(`/admin/${entity}`)).data.data,
    });
  }

  function useOne(id) {
    return useQuery({
      queryKey: [...listKey, id],
      queryFn: async () => (await api.get(`/admin/${entity}/${id}`)).data.data,
      enabled: Boolean(id),
    });
  }

  function useCreate() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (payload) => {
        const { data } = await api.post(`/admin/${entity}`, toFormData(payload));
        return data.data;
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: listKey }),
    });
  }

  function useUpdate() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, payload }) => {
        const formData = toFormData(payload);
        formData.append("_method", "PUT");
        const { data } = await api.post(`/admin/${entity}/${id}`, formData);
        return data.data;
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: listKey }),
    });
  }

  function useDelete() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id) => api.delete(`/admin/${entity}/${id}`),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: listKey }),
    });
  }

  return { useList, useOne, useCreate, useUpdate, useDelete };
}
