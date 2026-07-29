export const projects = [
  {
    slug: "school-management-system",
    title: "School Management System",
    category: "Web Platform",
    tech: ["Laravel", "React", "MySQL", "Sanctum"],
    summary:
      "An all-in-one platform for schools covering admissions, fees, attendance, examinations, and dedicated portals for parents, teachers, and admins.",
    cover: "/images/projects/school-management/cover.svg",
    gallery: [
      "/images/projects/school-management/1.svg",
      "/images/projects/school-management/2.svg",
      "/images/projects/school-management/3.svg",
    ],
    features: [
      "Student Management",
      "Fees & Billing",
      "Attendance Tracking",
      "Examinations & Report Cards",
      "SMS Notifications",
      "Parents Portal",
      "Teachers Portal",
      "Admin Dashboard",
    ],
    demoUrl: null,
    githubUrl: null,
    problem:
      "A cluster of private schools were managing admissions, fees, and grading across spreadsheets and paper registers, causing lost records and slow parent communication.",
    solution:
      "Built a unified Laravel + React platform with role-based portals for admins, teachers, and parents, replacing manual processes with real-time dashboards and automated SMS updates.",
    architecture:
      "Laravel API backend with Sanctum-secured role-based access, MySQL for relational student/fee data, queued jobs for SMS/email notifications, and a React SPA frontend consuming the API.",
    challenges: [
      "Modelling complex fee structures with discounts, installments, and scholarships",
      "Keeping attendance and grading fast on low-bandwidth school networks",
      "Designing a permissions system that scales across dozens of staff roles",
    ],
    results: [
      "70% reduction in time spent on fee reconciliation",
      "Parent SMS updates cut absentee follow-up calls by half",
      "Report card generation time dropped from days to minutes",
    ],
    testimonial: {
      quote: "The system transformed how we run the school. Fees, attendance, and report cards that used to take our staff days now take minutes.",
      author: "School Administrator",
      role: "Headteacher",
    },
  },
  {
    slug: "ecclesia-church-management",
    title: "Ecclesia — Church Management System",
    category: "Web Platform",
    tech: ["Laravel", "React", "MySQL", "Biometrics API"],
    summary:
      "A church management platform handling membership, attendance, biometric check-in, tithes & offerings, departments, and events.",
    cover: "/images/projects/ecclesia/cover.svg",
    gallery: ["/images/projects/ecclesia/1.svg", "/images/projects/ecclesia/2.svg"],
    features: [
      "Attendance Tracking",
      "Departments",
      "Biometric Integration",
      "SMS",
      "Tithes & Offerings",
      "Events",
      "Reports",
      "Dashboard",
    ],
    demoUrl: "https://ecclesia.ofi-cia.com",
    githubUrl: null,
    problem:
      "A growing congregation needed accurate attendance, giving records, and department coordination beyond what manual registers could support.",
    solution:
      "Delivered a dashboard-driven system with biometric check-in devices integrated over a local API, automated giving records, and department/event management.",
    architecture:
      "Laravel API with biometric-device webhook ingestion, MySQL reporting schema, scheduled jobs for weekly/monthly financial reports, React dashboard for church leadership.",
    challenges: [
      "Integrating third-party biometric hardware with reliable offline queuing",
      "Building financial reports that satisfy both leadership and auditors",
      "Multi-branch data isolation for a church with several campuses",
    ],
    results: [
      "Attendance capture time dropped from ~20 minutes to under 2 minutes per service",
      "Giving reconciliation now fully digital and auditable",
      "Department leaders self-serve their own reports",
    ],
    testimonial: {
      quote: "Ecclesia gave our leadership real visibility into attendance and giving for the first time. It's become essential to how we run the church.",
      author: "Church Administrator",
      role: "Operations Lead",
    },
  },
  {
    slug: "aspen-restaurant-management",
    title: "Aspen — Restaurant Management System",
    category: "Web Platform",
    tech: ["Laravel", "React", "MySQL", "POS"],
    summary:
      "A restaurant operations platform spanning kitchen display, orders, table reservations, POS, inventory, delivery, and reporting.",
    cover: "/images/projects/aspen/cover.svg",
    gallery: ["/images/projects/aspen/1.svg", "/images/projects/aspen/2.svg"],
    features: ["Kitchen Display", "Orders", "Reservations", "POS", "Inventory", "Reports", "Delivery"],
    demoUrl: "https://aspen.ofi-cia.com",
    githubUrl: null,
    problem:
      "A multi-outlet restaurant group needed to unify orders, kitchen workflow, and inventory across front-of-house, kitchen, and delivery.",
    solution:
      "Built a real-time order pipeline from POS to kitchen display screens, with live inventory deduction and a reservations calendar.",
    architecture:
      "Laravel API with WebSocket-driven live order updates, MySQL for menu/inventory data, POS terminal client, and a React admin dashboard for reporting.",
    challenges: [
      "Sub-second order sync between POS terminals and kitchen displays",
      "Inventory deduction accuracy across combo items and modifiers",
      "Reservation and walk-in conflicts during peak hours",
    ],
    results: [
      "Average order-to-kitchen latency under 1 second",
      "Inventory waste reporting reduced stock discrepancies by 35%",
      "Reservation no-shows tracked and reduced with automated reminders",
    ],
    testimonial: {
      quote: "Our kitchen and front-of-house finally work off the same real-time picture. Service is faster and far less chaotic.",
      author: "Restaurant Manager",
      role: "Operations Manager, Aspen",
    },
  },
  {
    slug: "vendex-pos",
    title: "Vendex POS",
    category: "Web Platform",
    tech: ["Laravel", "React", "MySQL", "Offline Sync"],
    summary:
      "A multi-branch point-of-sale system with offline-first sales sync, supplier management, and detailed reporting.",
    cover: "/images/projects/vendex/cover.svg",
    gallery: ["/images/projects/vendex/1.svg", "/images/projects/vendex/2.svg"],
    features: ["Inventory", "Sales", "Receipts", "Customers", "Suppliers", "Branches", "Reports", "Offline Sync"],
    demoUrl: "https://vendex.ofi-cia.com",
    githubUrl: null,
    problem:
      "Retail chains with unreliable internet needed a POS that kept selling during outages without losing transaction data.",
    solution:
      "Built an offline-first POS client that queues sales locally and syncs to the central Laravel API once connectivity returns, with conflict-safe merge logic.",
    architecture:
      "Local-first storage layer in the POS client, Laravel API with idempotent sync endpoints, MySQL as source of truth, branch-level data partitioning.",
    challenges: [
      "Conflict resolution when the same stock is sold offline across branches",
      "Keeping receipt printing consistent across thermal printer models",
      "Supplier and purchase-order workflows that stay in sync with live stock",
    ],
    results: [
      "Zero lost sales during internet outages since launch",
      "Multi-branch stock visibility in a single dashboard",
      "Supplier reconciliation time cut significantly",
    ],
    testimonial: {
      quote: "Vendex keeps ringing up sales even when our internet goes down — that alone paid for itself in the first month.",
      author: "Retail Chain Owner",
      role: "Founder",
    },
  },
  {
    slug: "lixxie-project-management",
    title: "Lixxie — Project Management",
    category: "Web Platform",
    tech: ["Laravel", "React", "MySQL", "Stripe"],
    summary:
      "A project & team management SaaS with Kanban boards, invoicing, time tracking, and subscription billing.",
    cover: "/images/projects/lixxie/cover.svg",
    gallery: ["/images/projects/lixxie/1.svg", "/images/projects/lixxie/2.svg"],
    features: ["Tasks", "Teams", "Kanban", "Invoices", "Time Tracking", "Projects", "Subscriptions", "Reports"],
    demoUrl: "https://lixxie.ofi-cia.com",
    githubUrl: null,
    problem:
      "Small agencies needed a lightweight alternative to expensive project-management SaaS, tailored to how African freelance teams invoice clients.",
    solution:
      "Delivered a Kanban-based project tool with built-in time tracking that converts logged hours directly into client invoices.",
    architecture:
      "Laravel API with Cashier-driven subscription billing, MySQL for projects/tasks/time entries, React drag-and-drop Kanban UI.",
    challenges: [
      "Real-time drag-and-drop board updates across multiple team members",
      "Accurate time-to-invoice conversion across multiple currencies",
      "Subscription tier gating without disrupting active projects",
    ],
    results: [
      "Agencies cut invoicing prep time from hours to minutes",
      "Kanban adoption led to measurably faster task turnaround",
      "Built-in subscriptions replaced three separate paid tools for early customers",
    ],
    testimonial: {
      quote: "Lixxie replaced our Trello, Toggl, and invoicing app with one clean tool our whole team actually uses.",
      author: "Agency Founder",
      role: "Creative Director",
    },
  },
  {
    slug: "invoiceflow-africa",
    title: "InvoiceFlow Africa",
    category: "Mobile App",
    tech: ["Flutter", "Laravel", "MySQL"],
    summary:
      "A Flutter invoicing app for African freelancers and small businesses with offline support and mobile-money-aware payments.",
    cover: "/images/projects/invoiceflow/cover.svg",
    gallery: ["/images/projects/invoiceflow/1.svg"],
    features: ["Invoices", "Clients", "Payments", "Reports", "Offline Mode"],
    demoUrl: null,
    storeLinks: {
      googlePlay: "#",
      appStore: "#",
    },
    githubUrl: null,
    problem:
      "Freelancers and micro-businesses across Africa needed simple invoicing that worked offline and understood local payment habits.",
    solution:
      "Built a Flutter app that creates, sends, and tracks invoices offline, syncing to a Laravel backend once online, with clear payment status tracking.",
    architecture:
      "Flutter client with local SQLite cache, Laravel REST API, background sync service, PDF invoice generation.",
    challenges: [
      "Reliable offline-to-online sync without duplicate invoices",
      "PDF generation that renders identically across devices",
      "Designing for low-end Android devices with limited storage",
    ],
    results: [
      "Used by hundreds of small businesses across multiple countries",
      "Average invoice creation time under 60 seconds",
      "Consistently rated highly for offline reliability",
    ],
    testimonial: {
      quote: "I create and send invoices between job sites with no signal, and they go out the moment I'm back online. Exactly what I needed.",
      author: "Freelance Contractor",
      role: "App User",
    },
  },
  {
    slug: "buildwithgkb",
    title: "BuildWithGKB",
    category: "Mobile App",
    tech: ["Flutter", "Laravel", "MySQL", "Maps API"],
    summary:
      "A property marketplace connecting buyers, artisans, and landlords with bookings, messaging, and integrated payments.",
    cover: "/images/projects/buildwithgkb/cover.svg",
    gallery: ["/images/projects/buildwithgkb/1.svg"],
    features: ["Property Marketplace", "Artisans", "Payments", "Messaging", "Booking", "Maps"],
    demoUrl: null,
    storeLinks: {
      googlePlay: "#",
      appStore: "#",
    },
    githubUrl: null,
    problem:
      "Property buyers and artisans lacked a trusted, unified marketplace to discover listings, hire vetted tradespeople, and transact safely.",
    solution:
      "Built a two-sided Flutter marketplace with map-based property discovery, in-app messaging, artisan booking, and escrow-style payments.",
    architecture:
      "Flutter client with Google Maps integration, Laravel API with role-based marketplace logic, real-time messaging via WebSockets, payment gateway integration.",
    challenges: [
      "Trust & verification flow for artisans and listings",
      "Real-time chat at scale between buyers and sellers",
      "Location-based search performance across dense listings",
    ],
    results: [
      "Marketplace live with verified artisans and active listings",
      "In-app messaging reduced off-platform deal leakage",
      "Booking-to-completion flow fully trackable end to end",
    ],
    testimonial: {
      quote: "BuildWithGKB made it possible for us to trust who we were hiring and hold conversations, bookings, and payment all in one place.",
      author: "Property Buyer",
      role: "App User",
    },
  },
];

export const projectCategories = ["All", "Web Platform", "Mobile App"];
