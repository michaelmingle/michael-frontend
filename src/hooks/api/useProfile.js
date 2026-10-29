import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toFormData } from "@/lib/toFormData";

// Public: the owner's profile media (About page photo).
export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => (await api.get("/profile")).data.data,
  });
}

export function useAdminProfile() {
  return useQuery({
    queryKey: ["admin", "profile"],
    queryFn: async () => (await api.get("/admin/profile")).data.data,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => (await api.post("/admin/profile", toFormData(payload))).data.data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
