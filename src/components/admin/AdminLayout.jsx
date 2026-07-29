import { Suspense } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiBriefcase,
  FiEdit3,
  FiExternalLink,
  FiFileText,
  FiGrid,
  FiHome,
  FiLogOut,
  FiMail,
  FiMessageSquare,
  FiStar,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { RouteFallback } from "@/components/layout/RouteFallback";
import { cn } from "@/lib/cn";

const navItems = [
  { to: "/admin", label: "Overview", icon: FiHome, end: true },
  { to: "/admin/projects", label: "Projects", icon: FiBriefcase },
  { to: "/admin/products", label: "Products", icon: FiGrid },
  { to: "/admin/blog", label: "Blog", icon: FiEdit3 },
  { to: "/admin/services", label: "Services", icon: FiFileText },
  { to: "/admin/testimonials", label: "Testimonials", icon: FiStar },
  { to: "/admin/bookings", label: "Bookings", icon: FiMail },
  { to: "/admin/messages", label: "Messages", icon: FiMessageSquare },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    toast.success("Logged out");
    navigate("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <aside className="flex w-64 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg-elevated)]">
        <div className="px-6 py-6">
          <span className="font-display text-lg font-bold">
            Michael<span className="text-primary">.</span>dev
          </span>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">Admin Dashboard</p>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]"
                )
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 border-t border-[var(--border)] px-3 py-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]"
          >
            <FiExternalLink size={16} /> View Site
          </a>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]"
          >
            <FiLogOut size={16} /> Log Out
          </button>
          {user && <p className="px-3 pt-2 text-xs text-[var(--text-muted)]">{user.email}</p>}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto px-8 py-8">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
