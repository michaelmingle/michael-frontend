import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { RouteFallback } from "@/components/layout/RouteFallback";

export function RequireAdmin() {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <RouteFallback />;

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
