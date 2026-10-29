import { Seo } from "@/components/layout/Seo";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { SkillsPreview } from "@/components/sections/SkillsPreview";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { TestimonialsSlider } from "@/components/sections/TestimonialsSlider";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/data/siteConfig";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  url: "https://michael.ofi-cia.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location,
  },
  sameAs: Object.values(siteConfig.social),
};

export default function Home() {
  return (
    <>
      <Seo path="/" jsonLd={personJsonLd} />
      <Hero />
      <StatsBar />
      <SkillsPreview />
      <ServicesPreview />
      <FeaturedProjects />
      <TestimonialsSlider />
      <PricingPreview />
      <CTASection />
    </>
  );
}
