import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const snippet = `Route::middleware('auth:sanctum')
  ->get('/api/projects', function () {
    return ProjectResource::collection(
      Project::query()
        ->published()
        ->latest()
        ->paginate(12)
    );
  });

export function ProjectGrid() {
  const { data } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  return <Grid items={data} />;
}`;

const lines = snippet.split("\n");

function highlight(line) {
  return line
    .replace(/(Route|function|export|return|const)/g, '<span class="text-[#c586c0]">$1</span>')
    .replace(/('[^']*')/g, '<span class="text-[#ce9178]">$1</span>')
    .replace(/(Project|ProjectResource|ProjectGrid|Grid|useQuery)/g, '<span class="text-[#4ec9b0]">$1</span>');
}

export function CodeTerminal({ className }) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0d] shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 text-xs text-white/40">api/routes.php — ProjectGrid.jsx</span>
        </div>
        <div className="px-5 py-5 font-mono text-[13px] leading-relaxed">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.09, duration: 0.3 }}
              className="whitespace-pre text-white/70"
              dangerouslySetInnerHTML={{ __html: highlight(line) || "&nbsp;" }}
            />
          ))}
          <div className="mt-2 flex items-center text-[#4ec9b0]">
            <span className="mr-2 text-white/40">$</span>
            <TypeAnimation
              sequence={["php artisan serve", 1400, "npm run build", 1400, "✓ build complete in 2.4s", 2000]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
              cursor
            />
          </div>
        </div>
      </div>
    </div>
  );
}
