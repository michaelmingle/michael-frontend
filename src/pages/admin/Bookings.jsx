import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { api } from "@/lib/axios";
import { Badge } from "@/components/ui/Badge";
import { RouteFallback } from "@/components/layout/RouteFallback";
import { ErrorState } from "@/components/ui/QueryState";

const statusVariant = {
  pending: "neutral",
  approved: "success",
  rescheduled: "neutral",
  cancelled: "neutral",
  completed: "success",
};

export default function AdminBookings() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "bookings"],
    queryFn: async () => (await api.get("/admin/bookings")).data.data,
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }) => api.patch(`/admin/bookings/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "bookings"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
    onError: () => toast.error("Couldn't update booking"),
  });

  const deleteBooking = useMutation({
    mutationFn: (id) => api.delete(`/admin/bookings/${id}`),
    onSuccess: () => {
      toast.success("Booking deleted");
      queryClient.invalidateQueries({ queryKey: ["admin", "bookings"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
    onError: () => toast.error("Couldn't delete booking"),
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Bookings</h1>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)]">
        {isLoading && <RouteFallback />}
        {isError && <ErrorState message="Couldn't load bookings." />}
        {!isLoading && !isError && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
                <tr>
                  {["Name", "Email", "Type", "Date", "Time", "Status", ""].map((h) => (
                    <th key={h} className="px-5 py-3 font-semibold text-[var(--text-muted)]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(data ?? []).length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-[var(--text-muted)]">
                      No bookings yet.
                    </td>
                  </tr>
                )}
                {(data ?? []).map((b) => (
                  <tr key={b.id} className="border-b border-[var(--border)] last:border-0">
                    <td className="px-5 py-3">{b.name}</td>
                    <td className="px-5 py-3">{b.email}</td>
                    <td className="px-5 py-3 capitalize">{b.meetingType}</td>
                    <td className="px-5 py-3">{b.scheduledDate}</td>
                    <td className="px-5 py-3">{b.scheduledTime}</td>
                    <td className="px-5 py-3">
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus.mutate({ id: b.id, status: e.target.value })}
                        className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-1 text-xs"
                      >
                        {Object.keys(statusVariant).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <Badge variant={statusVariant[b.status]} className="ml-2 hidden sm:inline-flex">
                        {b.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => window.confirm("Delete this booking?") && deleteBooking.mutate(b.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:border-red-500 hover:text-red-500"
                        aria-label="Delete"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
