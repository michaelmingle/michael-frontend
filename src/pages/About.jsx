import { FiAward, FiCheckCircle, FiMapPin } from "react-icons/fi";
import { Seo } from "@/components/layout/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";
import { GeneratedCover } from "@/components/ui/GeneratedCover";
import { CTASection } from "@/components/sections/CTASection";
import { CareerTimeline } from "@/components/sections/CareerTimeline";
import { siteConfig } from "@/data/siteConfig";
import { missionVision, education } from "@/data/timeline";
import { useProfile } from "@/hooks/api/useProfile";

export default function About() {
  const { data: profile } = useProfile();

  return (
    <>
      <Seo path="/about" title="About" description="Learn about Michael Awuah Sarpong's story, mission, and journey as a full stack developer." />
      <PageHeader eyebrow="About Me" title="The engineer behind the code" />

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal direction="right">
            <TiltCard maxTilt={5}>
              {profile?.photo ? (
                <img
                  src={profile.photo}
                  alt={siteConfig.name}
                  className="aspect-[4/5] w-full rounded-3xl border border-[var(--border)] object-cover"
                />
              ) : (
                <GeneratedCover
                  seed="michael-profile"
                  label={siteConfig.name}
                  className="aspect-[4/5] w-full rounded-3xl border border-[var(--border)]"
                />
              )}
            </TiltCard>
            <Card className="-mt-10 mx-4 flex items-center justify-between gap-3 py-4 text-sm" hover={false}>
              <span className="flex items-center gap-2 text-[var(--text-muted)]">
                <FiMapPin size={14} /> {siteConfig.location}
              </span>
              <span className="flex items-center gap-2 font-semibold text-emerald-500">
                <FiCheckCircle size={14} /> Available
              </span>
            </Card>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">My Story</h2>
              <p className="mt-4 leading-relaxed text-[var(--text-muted)]">{missionVision.story}</p>
            </Reveal>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Reveal delay={0.05}>
                <Card>
                  <h3 className="font-display text-lg font-bold text-primary">Mission</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{missionVision.mission}</p>
                </Card>
              </Reveal>
              <Reveal delay={0.1}>
                <Card>
                  <h3 className="font-display text-lg font-bold text-primary">Vision</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{missionVision.vision}</p>
                </Card>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Location</p>
                  <p className="mt-1 font-semibold">{siteConfig.location}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Timezone</p>
                  <p className="mt-1 font-semibold">{siteConfig.timezone}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Languages</p>
                  <p className="mt-1 font-semibold">{siteConfig.languages.map((l) => l.name).join(", ")}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-extrabold sm:text-4xl">Education</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {education.map((edu, i) => (
              <Reveal key={edu.school} delay={i * 0.05}>
                <Card className="h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <FiAward size={18} />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold">{edu.school}</h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{edu.credential}</p>
                  <p className="mt-3 text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    {edu.date} · {edu.location}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-subtle)]/50 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-extrabold sm:text-4xl">Career Journey</h2>
          </Reveal>
          <div className="mt-14">
            <CareerTimeline />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
