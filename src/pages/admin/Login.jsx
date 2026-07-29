import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function AdminLogin() {
  const { user, isAdmin, isLoading, login, isLoggingIn, loginError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  if (!isLoading && user && isAdmin) {
    return <Navigate to={location.state?.from?.pathname ?? "/admin"} replace />;
  }

  async function onSubmit(data) {
    try {
      await login(data);
      navigate("/admin");
    } catch {
      // surfaced via loginError below
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6">
      <Card className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FiLock size={20} />
          </div>
          <h1 className="mt-4 font-display text-xl font-bold">Admin Login</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Sign in to manage the site.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="you@email.com"
            error={errors.email && "Email is required"}
            {...register("email", { required: true })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password && "Password is required"}
            {...register("password", { required: true })}
          />
          {loginError && (
            <p className="text-sm text-red-500">
              {loginError.response?.data?.message ?? "Invalid credentials."}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            {isLoggingIn ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
