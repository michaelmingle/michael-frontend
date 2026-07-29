import { Link } from "react-router-dom";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { RouteFallback } from "@/components/layout/RouteFallback";
import { ErrorState } from "@/components/ui/QueryState";

export function DataTable({
  title,
  createLabel = "New",
  createTo,
  columns,
  rows,
  isLoading,
  isError,
  getEditHref,
  onDelete,
  isDeleting,
}) {
  function handleDelete(row) {
    if (window.confirm(`Delete "${row.title ?? row.name ?? "this item"}"? This can't be undone.`)) {
      onDelete(row.id);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">{title}</h1>
        {createTo && (
          <Button to={createTo} size="sm" icon={<FiPlus size={14} />}>
            {createLabel}
          </Button>
        )}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)]">
        {isLoading && <RouteFallback />}
        {isError && <ErrorState message="Couldn't load this list — try refreshing." />}

        {!isLoading && !isError && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[var(--border)] bg-[var(--bg-subtle)]">
                <tr>
                  {columns.map((col) => (
                    <th key={col.key} className="px-5 py-3 font-semibold text-[var(--text-muted)]">
                      {col.label}
                    </th>
                  ))}
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} className="px-5 py-10 text-center text-[var(--text-muted)]">
                      Nothing here yet.
                    </td>
                  </tr>
                )}
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-[var(--border)] last:border-0">
                    {columns.map((col) => (
                      <td key={col.key} className="px-5 py-3">
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={getEditHref(row)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:border-primary hover:text-primary"
                          aria-label="Edit"
                        >
                          <FiEdit2 size={13} />
                        </Link>
                        <button
                          onClick={() => handleDelete(row)}
                          disabled={isDeleting}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:border-red-500 hover:text-red-500"
                          aria-label="Delete"
                        >
                          <FiTrash2 size={13} />
                        </button>
                      </div>
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
