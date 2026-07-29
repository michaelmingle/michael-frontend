import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiCheckCircle, FiMail, FiTrash2 } from "react-icons/fi";
import { api } from "@/lib/axios";
import { Badge } from "@/components/ui/Badge";
import { RouteFallback } from "@/components/layout/RouteFallback";
import { ErrorState } from "@/components/ui/QueryState";

export default function AdminMessages() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: async () => (await api.get("/admin/messages")).data.data,
  });

  const toggleRead = useMutation({
    mutationFn: ({ id, isRead }) => api.patch(`/admin/messages/${id}`, { isRead }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
    onError: () => toast.error("Couldn't update message"),
  });

  const deleteMessage = useMutation({
    mutationFn: (id) => api.delete(`/admin/messages/${id}`),
    onSuccess: () => {
      toast.success("Message deleted");
      queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
    onError: () => toast.error("Couldn't delete message"),
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Messages</h1>

      {isLoading && <RouteFallback />}
      {isError && <ErrorState message="Couldn't load messages." />}

      {!isLoading && !isError && (
        <div className="mt-6 space-y-3">
          {(data ?? []).length === 0 && (
            <p className="rounded-2xl border border-[var(--border)] px-5 py-10 text-center text-[var(--text-muted)]">
              No messages yet.
            </p>
          )}
          {(data ?? []).map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl border p-5 ${m.isRead ? "border-[var(--border)]" : "border-primary/40 bg-primary/5"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{m.name}</p>
                    {!m.isRead && <Badge variant="primary">New</Badge>}
                    {m.subject && <Badge variant="neutral">{m.subject}</Badge>}
                  </div>
                  <a href={`mailto:${m.email}`} className="text-xs text-[var(--text-muted)] hover:text-primary">
                    {m.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleRead.mutate({ id: m.id, isRead: !m.isRead })}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:border-primary hover:text-primary"
                    aria-label={m.isRead ? "Mark unread" : "Mark read"}
                  >
                    {m.isRead ? <FiMail size={13} /> : <FiCheckCircle size={13} />}
                  </button>
                  <button
                    onClick={() => window.confirm("Delete this message?") && deleteMessage.mutate(m.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:border-red-500 hover:text-red-500"
                    aria-label="Delete"
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{m.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
