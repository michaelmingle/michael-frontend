import { FiArrowLeft, FiHome } from "react-icons/fi";
import { Seo } from "@/components/layout/Seo";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Reveal } from "@/components/animations/Reveal";

export default function NotFound() {
  return (
    <>
      <Seo path="/404" title="Page Not Found" />
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(255,90,31,0.12),transparent)]" />
        <Reveal>
          <div className="text-center">
            <p className="font-display text-[8rem] font-extrabold leading-none text-gradient sm:text-[10rem]">404</p>
            <h1 className="mt-2 font-display text-2xl font-bold sm:text-3xl">This page took a wrong turn</h1>
            <p className="mx-auto mt-3 max-w-md text-[var(--text-muted)]">
              The page you're looking for doesn't exist or has moved. Let's get you back on track.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <Button to="/" icon={<FiHome size={14} />}>
                  Back to Home
                </Button>
              </MagneticButton>
              <Button to="/projects" variant="secondary" icon={<FiArrowLeft size={14} />}>
                View Projects
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
