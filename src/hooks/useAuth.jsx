import { createContext, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

const AuthContext = createContext(null);

async function fetchMe() {
  try {
    const { data } = await api.get("/auth/me");
    return data.data;
  } catch (err) {
    if (err.response?.status === 401) return null;
    throw err;
  }
}

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: fetchMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await api.post("/auth/login", { email, password });
      return data.data;
    },
    onSuccess: (data) => queryClient.setQueryData(["auth", "me"], data),
  });

  const logoutMutation = useMutation({
    mutationFn: () => api.post("/auth/logout"),
    onSuccess: () => queryClient.setQueryData(["auth", "me"], null),
  });

  const value = {
    user,
    isLoading,
    isAdmin: Boolean(user?.roles?.includes("admin")),
    login: loginMutation.mutateAsync,
    loginError: loginMutation.error,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutateAsync,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
