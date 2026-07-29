import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

// Generates matching useList/useOne React Query hooks for a public API
// resource. Every public endpoint returns Laravel's default Resource/
// ResourceCollection envelope ({ data: [...] } or { data: {...} }), so
// unwrapping happens once here instead of in every call site.
export function createResourceHooks(endpoint) {
  function useList(options = {}) {
    return useQuery({
      queryKey: [endpoint, "list"],
      queryFn: async () => {
        const { data } = await api.get(`/${endpoint}`);
        return data.data;
      },
      ...options,
    });
  }

  function useOne(slug, options = {}) {
    return useQuery({
      queryKey: [endpoint, "detail", slug],
      queryFn: async () => {
        const { data } = await api.get(`/${endpoint}/${slug}`);
        return data.data;
      },
      enabled: Boolean(slug),
      ...options,
    });
  }

  return { useList, useOne };
}
