export const servicePricing = [
  {
    tier: "Starter",
    price: 800,
    period: "project",
    description: "For simple websites and MVPs that need to launch fast.",
    features: [
      "Up to 5 pages/screens",
      "Laravel + React build",
      "Basic SEO setup",
      "2 weeks delivery",
      "1 round of revisions",
    ],
    highlighted: false,
  },
  {
    tier: "Professional",
    price: 2500,
    period: "project",
    description: "For full web apps with custom backend logic and integrations.",
    features: [
      "Custom Laravel API",
      "React frontend + admin panel",
      "Payment gateway integration",
      "4-6 weeks delivery",
      "3 rounds of revisions",
      "30 days post-launch support",
    ],
    highlighted: true,
  },
  {
    tier: "Enterprise",
    price: null,
    period: "custom",
    description: "For complex, multi-module platforms and ongoing partnerships.",
    features: [
      "Full product architecture",
      "Mobile app (React Native/Flutter)",
      "Dedicated support & SLAs",
      "CI/CD & cloud deployment",
      "Ongoing maintenance retainer",
    ],
    highlighted: false,
  },
];

export const consultationPricing = {
  price: 60,
  currency: "USD",
  duration: "45 min",
  description: "One-on-one technical consultation — architecture reviews, code audits, or project scoping.",
};
