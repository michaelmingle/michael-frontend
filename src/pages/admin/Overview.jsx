import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiEdit3,
  FiGrid,
  FiMail,
  FiMessageSquare,
  FiStar,
} from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { useAdminStats } from "@/hooks/api/useAdminStats";
import { useAuth } from "@/hooks/useAuth";

const cards = [
  { key: "projects", label: "Projects", icon: FiBriefcase, to: "/admin/projects" },
  { key: "products", label: "Products", icon: FiGrid, to: "/admin/products" },
  { key: "blogPosts", label: "Blog Posts", icon: FiEdit3, to: "/admin/blog" },
  { key: "testimonials", label: "Testimonials", icon: FiStar, to: "/admin/testimonials" },
  { key: "pendingBookings", label: "Pending Bookings", icon: FiMail, to: "/admin/bookings" },
  { key: "unreadMessages", label: "Unread Messages", icon: FiMessageSquare, to: "/admin/messages" },
];

export default function AdminOverview() {
  const { user } = useAuth();
  const { data: stats, isLoading } = useAdminStats();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}</h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Here's what's happening on your site.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ key, label, icon: Icon, to }) => (
          <Link key={key} to={to}>
            <Card className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon size={20} />
              </div>
              <div>
                <p className="font-display text-2xl font-bold">{isLoading ? "—" : stats?.[key] ?? 0}</p>
                <p className="text-sm text-[var(--text-muted)]">{label}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
