import { Seo } from "@/components/layout/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/animations/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { faqs } from "@/data/faq";

export default function Faq() {
  return (
    <>
      <Seo path="/faq" title="FAQ" description="Frequently asked questions about services, pricing, and availability." />
      <PageHeader eyebrow="FAQ" title="Frequently asked questions" />

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
