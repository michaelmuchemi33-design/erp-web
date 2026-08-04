export type ResourcePage = {
  slug: string;
  section: string;
  title: string;
  description: string;
  keywords: string;
  hero: string;
  intro: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  cta?: string;
};

function page(
  partial: Omit<ResourcePage, "keywords"> & { keywords?: string }
): ResourcePage {
  return {
    keywords:
      partial.keywords ||
      `${partial.title}, Unity ERP, Unity Software Solutions, CRM, AI ERP, all-in-one ERP`,
    ...partial,
  };
}

export const resourcePages: ResourcePage[] = [
  // LEARN
  page({
    slug: "learn/documentation",
    section: "Learn",
    title: "Unity ERP Documentation",
    description:
      "Complete documentation for Unity ERP — setup, modules, CRM, AI assistant, inventory, finance and integrations.",
    hero: "Documentation",
    intro:
      "Everything you need to configure, run, and scale Unity ERP across inventory, CRM, finance, manufacturing and AI automation.",
    sections: [
      {
        heading: "What is covered",
        body: "Our docs are written for operators, not only IT teams. Each module includes setup steps, daily workflows, and troubleshooting.",
        bullets: [
          "Getting started and workspace setup",
          "Inventory, warehouse and purchasing",
          "CRM, sales pipeline and customer records",
          "Finance, invoicing and reporting",
          "AI Assistant prompts and permissions",
          "API, webhooks and integrations",
        ],
      },
      {
        heading: "All-in-one platform",
        body: "Unity ERP unifies CRM, stock, accounting and operations so your team works from one source of truth — with AI that answers from your live data.",
      },
      {
        heading: "Stay current",
        body: "Docs track every release. Check Release Notes after upgrades for new fields, reports and AI capabilities.",
      },
      {
        heading: "Module map",
        body: "Unity ERP covers the operational stack end to end so CRM, stock and cash stay aligned.",
        bullets: [
          "CRM: leads, deals, activities, customer history",
          "Inventory: warehouses, transfers, reorder points",
          "Purchasing: POs, receipts, supplier scores",
          "Finance: invoices, bills, payments, reports",
          "Manufacturing: BOM, work orders, costing",
          "AI Assistant: natural-language operational answers",
        ],
      },
      {
        heading: "Implementation path",
        body: "Most teams go live in phases: company setup, stock and customers, then CRM and AI. Unity Software Solutions can assist with data migration and training.",
      },
    ],
    cta: "Start free trial",
  }),
  page({
    slug: "learn/getting-started",
    section: "Learn",
    title: "Getting Started with Unity ERP",
    description:
      "Launch Unity ERP in days: company setup, users, chart of accounts, first products and your first AI-assisted report.",
    hero: "Getting Started",
    intro:
      "Go from empty workspace to live operations with a clear path — no six-month implementation project required.",
    sections: [
      {
        heading: "Day 1 checklist",
        body: "Create your company profile, invite users, and set roles. Import or add your first products and customers.",
        bullets: [
          "Company details and currency (KES supported)",
          "Users and role-based access",
          "Chart of accounts starter template",
          "Products, warehouses and opening stock",
          "First customer and invoice",
        ],
      },
      {
        heading: "Turn on CRM + AI",
        body: "Enable the CRM pipeline for sales teams and introduce Knight AI for natural-language questions on sales and stock.",
      },
      {
        heading: "Go live safely",
        body: "Run parallel for a short period if needed, then make Unity ERP the system of record for orders, stock and cash.",
      },
      {
        heading: "Week 1 goals",
        body: "Aim for one complete sales cycle and one complete purchase cycle recorded in Unity ERP — that proves the loop from CRM to stock to cash.",
        bullets: [
          "Create a quote and convert to order",
          "Deliver and invoice",
          "Receive supplier stock",
          "Ask AI for a daily sales summary",
        ],
      },
    ],
  }),
  page({
    slug: "learn/video-tutorials",
    section: "Learn",
    title: "Unity ERP Video Tutorials",
    description:
      "Short video tutorials for Unity ERP — POS, inventory, CRM pipeline, AI assistant, manufacturing and finance.",
    hero: "Video Tutorials",
    intro:
      "Learn by watching. Bite-sized walkthroughs designed for busy operators across Africa and beyond.",
    sections: [
      {
        heading: "Featured series",
        body: "Start with the fundamentals, then dive into industry-specific flows.",
        bullets: [
          "5-minute workspace tour",
          "Creating invoices and recording payment",
          "POS sale and stock deduction",
          "CRM deal stages from lead to won",
          "Asking the AI Assistant for a sales summary",
          "Bill of materials and production order",
        ],
      },
      {
        heading: "Who they are for",
        body: "Owners, accountants, store managers and operations leads — each video focuses on one outcome you can apply the same day.",
      },
    ],
  }),
  page({
    slug: "learn/feature-guides",
    section: "Learn",
    title: "Unity ERP Feature Guides",
    description:
      "In-depth feature guides for Unity ERP modules including CRM, inventory, AI, manufacturing, HR and multi-branch retail.",
    hero: "Feature Guides",
    intro:
      "Deep dives into each capability so you can unlock more value without hiring a full-time systems analyst.",
    sections: [
      {
        heading: "Core modules",
        body: "Guides cover configuration and best practice for daily use.",
        bullets: [
          "Multi-warehouse inventory and transfers",
          "CRM pipeline, activities and follow-ups",
          "Purchase orders and supplier scorecards",
          "Financial period close",
          "AI insights and alert rules",
        ],
      },
      {
        heading: "CRM + AI as one solution",
        body: "See how customer history, open quotes and stock availability surface together — so sales never promise what you cannot deliver.",
      },
    ],
  }),
  page({
    slug: "learn/ai-assistant-guide",
    section: "Learn",
    title: "AI Assistant Guide — Unity ERP",
    description:
      "How to use Unity ERP AI Assistant for sales summaries, inventory alerts, finance insights and purchase recommendations.",
    hero: "AI Assistant Guide",
    intro:
      "Your ERP should answer questions in plain language. Unity AI reads your live data and returns actionable insight — not generic chat.",
    sections: [
      {
        heading: "What you can ask",
        body: "Examples that work out of the box:",
        bullets: [
          "Sales summary for this month vs last",
          "Which SKUs are below safety stock?",
          "Cash position and overdue receivables",
          "Purchase recommendations for slow movers",
          "Top customers by margin",
        ],
      },
      {
        heading: "Permissions and trust",
        body: "AI responses respect user roles. Sensitive finance data stays limited to authorized accounts.",
      },
      {
        heading: "From insight to action",
        body: "Many answers include next steps — create a PO, follow up a CRM deal, or review an inventory alert — inside the same platform.",
      },
    ],
  }),

  // INDUSTRIES
  page({
    slug: "industries/manufacturing-erp",
    section: "Industries",
    title: "Manufacturing ERP Software | Unity ERP",
    description:
      "Manufacturing ERP with BOM, production orders, shop floor tracking, quality and inventory — plus CRM and AI in one platform.",
    hero: "Manufacturing ERP",
    intro:
      "Connect engineering, production and finance. Unity ERP gives manufacturers live visibility from raw materials to finished goods.",
    sections: [
      {
        heading: "Built for the shop floor",
        body: "Plan work orders, consume materials against BOMs, and capture output without spreadsheets.",
        bullets: [
          "Multi-level bill of materials",
          "Work order scheduling",
          "WIP and finished goods stock",
          "Scrap and quality notes",
          "Cost per batch",
        ],
      },
      {
        heading: "CRM for B2B manufacturers",
        body: "Track quotes, customer specs and repeat orders alongside production capacity.",
      },
    ],
  }),
  page({
    slug: "industries/construction-erp",
    section: "Industries",
    title: "Construction ERP Software | Unity ERP",
    description:
      "Construction ERP for project costing, materials, subcontractors, progress billing and site inventory.",
    hero: "Construction ERP",
    intro:
      "Keep every site on budget. Unity ERP links materials, labour and billing to the projects that drive your margin.",
    sections: [
      {
        heading: "Project control",
        body: "Budgets, variations and material requests per site — with AI alerts when costs drift.",
        bullets: [
          "Job costing by phase",
          "Site material issues",
          "Subcontractor tracking",
          "Progress invoices",
          "Equipment utilisation",
        ],
      },
    ],
  }),
  page({
    slug: "industries/hospital-erp",
    section: "Industries",
    title: "Hospital ERP Software | Unity ERP",
    description:
      "Hospital and clinic ERP for pharmacy, billing, inventory, departments and operational reporting.",
    hero: "Hospital ERP",
    intro:
      "Clinical and commercial teams share one operational backbone — stock, billing and departments in sync.",
    sections: [
      {
        heading: "Operational excellence",
        body: "Reduce stockouts of critical supplies and speed up patient billing cycles.",
        bullets: [
          "Pharmacy and consumables",
          "Department cost centres",
          "Supplier lead times",
          "Management dashboards",
        ],
      },
    ],
  }),
  page({
    slug: "industries/retail-pos",
    section: "Industries",
    title: "Retail & POS ERP | Unity ERP",
    description:
      "Retail ERP and POS with multi-branch stock, promotions, CRM loyalty and AI demand insights.",
    hero: "Retail & POS",
    intro:
      "Sell in-store and online with one inventory truth. Unity ERP POS posts straight to stock and finance.",
    sections: [
      {
        heading: "Retail that scales",
        body: "From a single counter to multi-branch chains across Kenya, South Africa and Egypt.",
        bullets: [
          "Fast POS checkout",
          "Branch transfers",
          "Customer CRM profiles",
          "Daily cash-up reports",
          "AI slow-mover alerts",
        ],
      },
    ],
  }),
  page({
    slug: "industries/education-erp",
    section: "Industries",
    title: "Education ERP Software | Unity ERP",
    description:
      "Education ERP for admissions, fees, staff payroll and institutional inventory.",
    hero: "Education ERP",
    intro:
      "Schools and colleges run smoother when fees, inventory and staff costs live in one system.",
    sections: [
      {
        heading: "Institution operations",
        body: "Admissions pipelines in CRM, fee collection in finance, and store inventory for materials.",
        bullets: [
          "Student and guardian records",
          "Fee schedules and arrears",
          "Staff payroll",
          "Campus store stock",
        ],
      },
    ],
  }),
  page({
    slug: "industries/agriculture-erp",
    section: "Industries",
    title: "Agriculture ERP Software | Unity ERP",
    description:
      "Agriculture ERP for farm inputs, harvests, inventory, buyer contracts and cost per acre.",
    hero: "Agriculture ERP",
    intro:
      "See cost and yield clearly. Unity ERP tracks inputs, harvests and sales for commercial farms and agribusiness.",
    sections: [
      {
        heading: "From field to market",
        body: "Plot-level costs, input stock and buyer contracts in one operational view.",
        bullets: [
          "Farm and plot records",
          "Input inventory",
          "Harvest logging",
          "Contract sales",
        ],
      },
    ],
  }),
  page({
    slug: "industries/hospitality-erp",
    section: "Industries",
    title: "Hospitality ERP Software | Unity ERP",
    description:
      "Hospitality ERP for hotels and restaurants — F&B inventory, outlets, purchasing and CRM guests.",
    hero: "Hospitality ERP",
    intro:
      "Control food cost and guest experience. Unity ERP connects kitchen stock, outlets and purchasing.",
    sections: [
      {
        heading: "Hospitality operations",
        body: "Recipe-level costing optional; strong purchasing and outlet sales reporting by default.",
        bullets: [
          "F&B inventory",
          "Multi-outlet sales",
          "Supplier POs",
          "Guest CRM notes",
        ],
      },
    ],
  }),
  page({
    slug: "industries/logistics-erp",
    section: "Industries",
    title: "Logistics ERP Software | Unity ERP",
    description:
      "Logistics ERP for warehouse, fleet costs, delivery performance and customer billing.",
    hero: "Logistics ERP",
    intro:
      "Dispatch and warehouse teams share live stock and order status — finance gets clean billing data.",
    sections: [
      {
        heading: "Move goods with clarity",
        body: "Pick, pack, ship and invoice without re-entering data between tools.",
        bullets: [
          "Warehouse bins",
          "Delivery tracking",
          "Fleet cost capture",
          "Customer SLAs",
        ],
      },
    ],
  }),
  page({
    slug: "industries/finance-accounting",
    section: "Industries",
    title: "Finance & Accounting ERP | Unity ERP",
    description:
      "Finance and accounting in Unity ERP — GL, AR, AP, bank reconciliation and management reports with AI insights.",
    hero: "Finance & Accounting",
    intro:
      "Close faster with operational data already flowing into the ledger from sales, purchasing and inventory.",
    sections: [
      {
        heading: "Finance that reflects reality",
        body: "Invoices, bills and stock valuations post correctly so reports match the business.",
        bullets: [
          "Chart of accounts",
          "Receivables and payables",
          "Bank reconciliation",
          "Period close",
          "AI cash insights",
        ],
      },
    ],
  }),

  // DOWNLOADS
  page({
    slug: "downloads/product-brochure",
    section: "Downloads",
    title: "Unity ERP Product Brochure",
    description:
      "Download overview of Unity ERP modules, AI assistant, CRM, pricing approach and industry coverage.",
    hero: "Product Brochure",
    intro:
      "A concise overview of the all-in-one platform — ideal for sharing with partners and leadership teams.",
    sections: [
      {
        heading: "Inside the brochure",
        body: "Module map, AI capabilities, industry snapshots and how Unity Software Solutions supports Kenya, South Africa and Egypt.",
        bullets: [
          "Platform overview",
          "CRM + AI highlights",
          "Industry use cases",
          "Security and cloud",
        ],
      },
      {
        heading: "Request the PDF",
        body: "Contact erpintergration@gmail.com or use the Contact page — we will send the latest brochure within one business day.",
      },
    ],
  }),
  page({
    slug: "downloads/company-profile",
    section: "Downloads",
    title: "Unity Software Solutions Company Profile",
    description:
      "Company profile for Unity Software Solutions — Unity ERP vendor with presence in Kenya, South Africa and Egypt.",
    hero: "Company Profile",
    intro:
      "Learn who builds Unity ERP, where we operate, and how we partner with growing businesses.",
    sections: [
      {
        heading: "About Unity Software Solutions",
        body: "We design all-in-one ERP with CRM and AI for operators who need clarity without enterprise complexity.",
        bullets: [
          "Headquarters focus: Kenya",
          "Regional reach: South Africa & Egypt",
          "Product: Unity ERP",
          "Support: erpintergration@gmail.com",
        ],
      },
    ],
  }),
  page({
    slug: "downloads/feature-comparison",
    section: "Downloads",
    title: "Unity ERP Feature Comparison",
    description:
      "Compare Unity ERP capabilities across inventory, CRM, finance, manufacturing, AI and multi-branch retail.",
    hero: "Feature Comparison",
    intro:
      "See what is included in the all-in-one plan — unlimited users, core modules and AI assistant access.",
    sections: [
      {
        heading: "Included by default",
        body: "One plan philosophy: you should not unlock basic CRM or stock reports as paid add-ons.",
        bullets: [
          "Inventory & warehouse",
          "CRM & sales",
          "Finance & reporting",
          "Purchasing",
          "AI Assistant",
          "Multi-user access",
        ],
      },
    ],
  }),
  page({
    slug: "downloads/api-documentation",
    section: "Downloads",
    title: "Unity ERP API Documentation Download",
    description:
      "API documentation for Unity ERP integrations — REST endpoints, authentication and examples.",
    hero: "API Documentation",
    intro:
      "Integrate Unity ERP with your website, mobile apps or data warehouse using documented REST APIs.",
    sections: [
      {
        heading: "For technical teams",
        body: "Auth, rate limits, resource endpoints for products, orders, customers and webhooks.",
      },
      {
        heading: "Also see",
        body: "Developers → API Documentation and Webhooks pages for live reference content.",
      },
    ],
  }),
  page({
    slug: "downloads/release-notes",
    section: "Downloads",
    title: "Unity ERP Release Notes",
    description:
      "Unity ERP release notes — new features, AI improvements, fixes and upgrade guidance.",
    hero: "Release Notes",
    intro:
      "Track what changed in each Unity ERP release so your team adopts new capability quickly.",
    sections: [
      {
        heading: "How we ship",
        body: "Continuous improvements to modules, performance and the AI assistant — with clear notes per version.",
      },
    ],
  }),

  // SUPPORT
  page({
    slug: "support/help-center",
    section: "Support",
    title: "Unity ERP Help Center",
    description:
      "Help Center for Unity ERP — guides, troubleshooting and contact paths for Unity Software Solutions.",
    hero: "Help Center",
    intro:
      "Find answers fast, or reach humans who understand ERP operations across Kenya, South Africa and Egypt.",
    sections: [
      {
        heading: "Popular topics",
        body: "Password and users, stock adjustments, invoice templates, POS offline tips and AI permissions.",
        bullets: [
          "Account and login",
          "Inventory corrections",
          "CRM pipeline setup",
          "Report exports",
        ],
      },
      {
        heading: "Contact support",
        body: "Email erpintergration@gmail.com or call +254 793 832 286. WhatsApp available on the same number.",
      },
    ],
  }),
  page({
    slug: "support/knowledge-base",
    section: "Support",
    title: "Unity ERP Knowledge Base",
    description:
      "Knowledge base articles for Unity ERP configuration, best practices and industry workflows.",
    hero: "Knowledge Base",
    intro:
      "Searchable operational knowledge — written from real implementations, not generic software theory.",
    sections: [
      {
        heading: "Article themes",
        body: "Opening balances, multi-branch retail, manufacturing BOMs, CRM hygiene and month-end close.",
      },
    ],
  }),
  page({
    slug: "support/faq",
    section: "Support",
    title: "Unity ERP Frequently Asked Questions",
    description:
      "FAQs on Unity ERP pricing, trial, modules, AI, data security and onboarding.",
    hero: "Frequently Asked Questions",
    intro:
      "Straight answers to the questions buyers and operators ask most.",
    sections: [
      {
        heading: "Product",
        body: "Unity ERP is an all-in-one cloud ERP with CRM and AI. Pricing is simple monthly or yearly in KES.",
        bullets: [
          "2-month free trial available",
          "KES 3,000 / month or KES 33,000 / year",
          "Unlimited users on the standard plan",
          "Data hosted securely in the cloud",
        ],
      },
      {
        heading: "Support regions",
        body: "Unity Software Solutions supports customers with focus across Kenya, South Africa and Egypt.",
      },
    ],
  }),
  page({
    slug: "support/contact-support",
    section: "Support",
    title: "Contact Unity ERP Support",
    description:
      "Contact Unity Software Solutions support — email erpintergration@gmail.com or call +254 793 832 286.",
    hero: "Contact Support",
    intro:
      "Talk to people who implement ERP — not a black-box ticket queue.",
    sections: [
      {
        heading: "Reach us",
        body: "We respond within one business day on standard requests; urgent production issues are prioritised.",
        bullets: [
          "Email: erpintergration@gmail.com",
          "Phone / WhatsApp: +254 793 832 286",
          "Regions: Kenya · South Africa · Egypt",
        ],
      },
    ],
    cta: "Open contact form",
  }),
  page({
    slug: "support/system-status",
    section: "Support",
    title: "Unity ERP System Status",
    description:
      "Unity ERP system status — platform availability and maintenance notices.",
    hero: "System Status",
    intro:
      "We aim for continuous availability of the Unity ERP cloud platform.",
    sections: [
      {
        heading: "Current status",
        body: "All systems operational. Scheduled maintenance is announced in advance by email to administrators.",
      },
      {
        heading: "Report an incident",
        body: "Email erpintergration@gmail.com with your company name and a short description.",
      },
    ],
  }),

  // DEVELOPERS
  page({
    slug: "developers/api-documentation",
    section: "Developers",
    title: "Unity ERP API Documentation",
    description:
      "REST API documentation for Unity ERP — authenticate, list resources, create orders and sync CRM data.",
    hero: "API Documentation",
    intro:
      "Build on top of Unity ERP. Stable REST endpoints for products, customers, orders, invoices and more.",
    sections: [
      {
        heading: "Getting API access",
        body: "Generate API keys from your admin workspace. Rotate keys regularly and store them as secrets.",
      },
      {
        heading: "Common resources",
        body: "Products, variants, warehouses, customers, sales orders, invoices, payments and CRM deals.",
      },
    ],
  }),
  page({
    slug: "developers/webhooks",
    section: "Developers",
    title: "Unity ERP Webhooks",
    description:
      "Webhooks for Unity ERP events — order created, stock low, invoice paid and CRM stage changes.",
    hero: "Webhooks",
    intro:
      "Push events to your systems the moment something important happens in Unity ERP.",
    sections: [
      {
        heading: "Event examples",
        body: "Subscribe to the events your automation needs.",
        bullets: [
          "order.created / order.fulfilled",
          "inventory.low_stock",
          "invoice.paid",
          "crm.deal.stage_changed",
        ],
      },
    ],
  }),
  page({
    slug: "developers/integrations",
    section: "Developers",
    title: "Unity ERP Integrations",
    description:
      "Integrate Unity ERP with e-commerce, payment gateways, SMS, accounting exports and custom apps.",
    hero: "Integrations",
    intro:
      "Unity ERP sits at the centre — connect payments, messaging and storefronts without losing operational control.",
    sections: [
      {
        heading: "Integration patterns",
        body: "Use API + webhooks for real-time sync, or scheduled exports for data warehouses.",
        bullets: [
          "Payment confirmations",
          "Online order import",
          "SMS order alerts",
          "BI / spreadsheet exports",
        ],
      },
    ],
  }),
  page({
    slug: "developers/sdks",
    section: "Developers",
    title: "Unity ERP SDKs",
    description:
      "SDK guidance for Unity ERP — JavaScript/TypeScript patterns for calling the REST API securely.",
    hero: "SDKs",
    intro:
      "Start quickly with clear client patterns for server-side integrations.",
    sections: [
      {
        heading: "Recommended approach",
        body: "Call the API from your backend only. Never expose secret keys in browser code.",
      },
    ],
  }),
  page({
    slug: "developers/changelog",
    section: "Developers",
    title: "Unity ERP Developer Changelog",
    description:
      "Developer changelog for Unity ERP API, webhooks and integration-facing changes.",
    hero: "Changelog",
    intro:
      "Breaking changes are rare and announced early. Additive endpoints ship continuously.",
    sections: [
      {
        heading: "Stay informed",
        body: "Watch this page and Release Notes when you maintain a production integration.",
      },
    ],
  }),

  // BLOG
  page({
    slug: "blog/erp-guides",
    section: "Blog",
    title: "ERP Guides | Unity Software Solutions",
    description:
      "Practical ERP guides for African and global businesses — selection, implementation and daily operations.",
    hero: "ERP Guides",
    intro:
      "Clear writing on how to choose and run ERP without drowning in enterprise jargon.",
    sections: [
      {
        heading: "Start here",
        body: "Map your processes before you map vendors. Inventory, sales and cash must connect.",
        bullets: [
          "When spreadsheets stop scaling",
          "ERP vs separate accounting + POS tools",
          "Phased go-live checklist",
        ],
      },
    ],
  }),
  page({
    slug: "blog/business-growth",
    section: "Blog",
    title: "Business Growth with ERP & CRM",
    description:
      "How unified ERP and CRM help businesses grow margins, retain customers and expand branches.",
    hero: "Business Growth",
    intro:
      "Growth creates complexity. Unity ERP keeps multi-branch and multi-team operations coherent.",
    sections: [
      {
        heading: "Growth levers",
        body: "Faster quotes via CRM, fewer stockouts, cleaner cash collection and AI that highlights what needs attention.",
      },
    ],
  }),
  page({
    slug: "blog/ai-automation",
    section: "Blog",
    title: "AI & Automation in ERP",
    description:
      "AI and automation inside ERP — inventory alerts, sales summaries and finance insights with Unity AI.",
    hero: "AI & Automation",
    intro:
      "Automation should remove repetitive checking — not add another dashboard you ignore.",
    sections: [
      {
        heading: "Practical AI",
        body: "Ask for sales, stock and cash in natural language. Route low-stock events into purchase workflows.",
      },
    ],
  }),
  page({
    slug: "blog/inventory-management",
    section: "Blog",
    title: "Inventory Management Best Practices",
    description:
      "Inventory management tips for retail, wholesale and manufacturing using Unity ERP.",
    hero: "Inventory Management",
    intro:
      "Stock accuracy is a habit. ERP makes the habit enforceable across branches.",
    sections: [
      {
        heading: "Practices that stick",
        body: "Cycle counts, reorder points, ownership per warehouse and no silent spreadsheet adjustments.",
      },
    ],
  }),
  page({
    slug: "blog/accounting-tips",
    section: "Blog",
    title: "Accounting Tips for Growing Companies",
    description:
      "Accounting tips that connect operational ERP data to clean books and faster closes.",
    hero: "Accounting Tips",
    intro:
      "When sales and stock post correctly, month-end stops being a forensic exercise.",
    sections: [
      {
        heading: "Close with confidence",
        body: "Reconcile banks weekly, review AR aging, and lock periods after review.",
      },
    ],
  }),
  page({
    slug: "blog/manufacturing-insights",
    section: "Blog",
    title: "Manufacturing Insights",
    description:
      "Manufacturing insights on BOM control, production cost and shop floor visibility with ERP.",
    hero: "Manufacturing Insights",
    intro:
      "Margin hides in scrap, rework and inaccurate BOMs. Visibility is the first fix.",
    sections: [
      {
        heading: "What to measure",
        body: "Yield, cost per batch, schedule adherence and material variance.",
      },
    ],
  }),
  page({
    slug: "blog/product-updates",
    section: "Blog",
    title: "Unity ERP Product Updates",
    description:
      "Product updates from Unity Software Solutions — new Unity ERP features, AI and industry improvements.",
    hero: "Product Updates",
    intro:
      "We ship continuously. Here is where we highlight meaningful capability for customers.",
    sections: [
      {
        heading: "Recent themes",
        body: "AI assistant depth, industry overlays, stronger CRM workflows and regional support coverage.",
      },
    ],
  }),
];

export const pagesBySlug: Record<string, any> = Object.fromEntries(
  resourcePages.filter((p): p is NonNullable<typeof p> => Boolean(p?.slug)).map((p) => [p.slug, p])
);

export function slugFromLabel(section: string, label: string): string {
  const map: Record<string, string> = {
    "Documentation": "learn/documentation",
    "Getting Started": "learn/getting-started",
    "Video Tutorials": "learn/video-tutorials",
    "Feature Guides": "learn/feature-guides",
    "AI Assistant Guide": "learn/ai-assistant-guide",
    "Manufacturing ERP": "industries/manufacturing-erp",
    "Construction ERP": "industries/construction-erp",
    "Hospital ERP": "industries/hospital-erp",
    "Retail & POS": "industries/retail-pos",
    "Education ERP": "industries/education-erp",
    "Agriculture ERP": "industries/agriculture-erp",
    "Hospitality ERP": "industries/hospitality-erp",
    "Logistics ERP": "industries/logistics-erp",
    "Finance & Accounting": "industries/finance-accounting",
    "Product Brochure": "downloads/product-brochure",
    "Company Profile": "downloads/company-profile",
    "Feature Comparison": "downloads/feature-comparison",
    "API Documentation": section === "Developers" ? "developers/api-documentation" : "downloads/api-documentation",
    "Release Notes": "downloads/release-notes",
    "Employee Discounts": "employee-discounts",
    "Help Center": "support/help-center",
    "Knowledge Base": "support/knowledge-base",
    "Frequently Asked Questions": "support/faq",
    "Contact Support": "support/contact-support",
    "System Status": "support/system-status",
    "Webhooks": "developers/webhooks",
    "Integrations": "developers/integrations",
    "SDKs": "developers/sdks",
    "Changelog": "developers/changelog",
    "ERP Guides": "blog/erp-guides",
    "Business Growth": "blog/business-growth",
    "AI & Automation": "blog/ai-automation",
    "Inventory Management": "blog/inventory-management",
    "Accounting Tips": "blog/accounting-tips",
    "Manufacturing Insights": "blog/manufacturing-insights",
    "Product Updates": "blog/product-updates",
  };
  return map[label] || "";
}
