import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCommand, FiSearch } from "react-icons/fi";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { siteConfig } from "@/data/siteConfig";
import { useProjects } from "@/hooks/api/useProjects";
import { useBlogPosts } from "@/hooks/api/useBlogPosts";

export function CommandPalette() {
  const { open, close } = useCommandPalette();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { data: projects } = useProjects();
  const { data: blogPosts } = useBlogPosts();

  const items = useMemo(() => {
    const nav = siteConfig.nav.map((n) => ({ label: n.label, to: n.to, group: "Navigate" }));
    const proj = (projects ?? []).map((p) => ({ label: p.title, to: `/projects/${p.slug}`, group: "Projects" }));
    const posts = (blogPosts ?? []).map((p) => ({ label: p.title, to: `/blog/${p.slug}`, group: "Blog" }));
    const all = [...nav, ...proj, ...posts];
    if (!query.trim()) return all.slice(0, 8);
    const q = query.toLowerCase();
    return all.filter((i) => i.label.toLowerCase().includes(q)).slice(0, 10);
  }, [query, projects, blogPosts]);

  function go(to) {
    navigate(to);
    setQuery("");
    close();
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="glass relative z-10 w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-4">
              <FiSearch className="text-[var(--text-muted)]" size={18} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, projects, articles..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--text-muted)]"
              />
              <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 text-xs text-[var(--text-muted)]">
                Esc
              </kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {items.length === 0 && (
                <p className="px-4 py-6 text-center text-sm text-[var(--text-muted)]">No results found.</p>
              )}
              {items.map((item) => (
                <button
                  key={item.to}
                  onClick={() => go(item.to)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm hover:bg-[var(--bg-subtle)]"
                >
                  <span>
                    <span className="mr-2 text-xs text-[var(--text-muted)]">{item.group}</span>
                    {item.label}
                  </span>
                  <FiArrowRight className="text-[var(--text-muted)]" size={14} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 border-t border-[var(--border)] px-5 py-3 text-xs text-[var(--text-muted)]">
              <FiCommand size={12} /> K to toggle · Esc to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
