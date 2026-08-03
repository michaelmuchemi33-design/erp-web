export type SeoPage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string;
  intro: string;
  sections: { h2: string; body: string; bullets?: string[] }[];
};

export const seoPages: SeoPage[] = [
  {
    slug: "best-erp-software-kenya",
    title: "Best ERP Software in Kenya (2026) | Unity ERP Free Trial",
    h1: "Best ERP Software in Kenya for Growing Businesses",
    description:
      "Unity ERP is cloud ERP software in Kenya for inventory, accounting, CRM, payroll, POS and manufacturing. 2-month free trial. KES 3,000/month. Support across Kenya, South Africa and Egypt.",
    keywords:
      "best ERP software Kenya, ERP Kenya, ERP software Kenya, cloud ERP Kenya, business software Kenya, Unity ERP",
    intro:
      "Kenyan teams need one system for stock, sales, cash and customers — without enterprise pricing. Unity ERP is built for that: ERP + CRM + AI in one cloud platform, with a full free trial.",
    sections: [
      {
        h2: "What to look for in ERP software in Kenya",
        body: "Look for inventory accuracy, invoicing, multi-user access, CRM, and support that understands M-Pesa-friendly payments and local operations.",
        bullets: [
          "Real-time inventory and multi-branch stock",
          "CRM pipeline with quotes and follow-ups",
          "Accounting-ready invoices and reports",
          "Affordable KES pricing and free trial",
        ],
      },
      {
        h2: "Why teams choose Unity ERP",
        body: "Unity Software Solutions delivers Unity ERP as an all-in-one alternative to stacking multiple tools. Unlimited users on the standard plan, AI Assistant, and regional support.",
      },
      {
        h2: "Start free",
        body: "Try every module for 60 days — no credit card required. Then continue from KES 3,000 per month or KES 33,000 per year.",
      },
    ],
  },
  {
    slug: "free-erp-software",
    title: "Free ERP Software Trial | Unity ERP Cloud",
    h1: "Free ERP Software Trial — Full Access for 2 Months",
    description:
      "Start free ERP software with Unity ERP: inventory, CRM, accounting, POS, manufacturing and AI. 60-day free trial, no credit card. Then simple KES pricing.",
    keywords:
      "free ERP software, free ERP trial, free cloud ERP, free inventory software, Unity ERP trial",
    intro:
      "Unity ERP offers a genuine free trial with unrestricted module access for 60 days — the same product paying customers use.",
    sections: [
      {
        h2: "What is included in the free trial",
        body: "CRM, inventory, purchasing, finance, manufacturing, retail POS capabilities, HR support, AI Assistant, reports and multi-user access.",
      },
      {
        h2: "After the trial",
        body: "Continue on transparent pricing: KES 3,000/month or KES 33,000/year. Active customers may receive a free custom business website design.",
      },
    ],
  },
  {
    slug: "inventory-management-software",
    title: "Inventory Management Software | Unity ERP",
    h1: "Inventory Management Software That Stays Accurate",
    description:
      "Unity ERP inventory management software: multi-warehouse stock, transfers, reorder points, POS deduction and AI low-stock alerts. Free trial available.",
    keywords:
      "inventory management software, stock control software, warehouse software, inventory software Kenya",
    intro:
      "Stop losing margin to stockouts and spreadsheet errors. Unity ERP keeps inventory, purchasing and sales in one ledger of truth.",
    sections: [
      {
        h2: "Inventory capabilities",
        body: "Multi-warehouse, transfers, adjustments, reorder points, branch stock and retail POS deduction in real time.",
      },
      {
        h2: "AI stock alerts",
        body: "Ask the AI Assistant which SKUs are below safety stock and get purchase recommendations from live data.",
      },
    ],
  },
  {
    slug: "manufacturing-erp-software",
    title: "Manufacturing ERP Software | Unity ERP",
    h1: "Manufacturing ERP for Production and Cost Control",
    description:
      "Manufacturing ERP software with BOM, work orders, WIP, finished goods and costing — plus CRM and inventory. Unity ERP free trial.",
    keywords: "manufacturing ERP, production ERP, BOM software, factory ERP Kenya",
    intro:
      "Connect materials, production and sales. Unity ERP manufacturing tools sit beside CRM and finance so cost and delivery stay visible.",
    sections: [
      {
        h2: "Shop floor to invoice",
        body: "Bill of materials, work orders, finished goods stock and batch-oriented costing patterns — with inventory already linked.",
      },
    ],
  },
  {
    slug: "construction-erp-software",
    title: "Construction ERP Software | Unity ERP",
    h1: "Construction ERP for Projects, Materials and Billing",
    description:
      "Construction ERP software for job costing, site materials, subcontractors and progress billing. Unity ERP free trial.",
    keywords: "construction ERP, project ERP, job costing software, construction software Kenya",
    intro:
      "Keep every site on budget. Unity ERP links materials, purchasing and billing for construction and project teams.",
    sections: [
      {
        h2: "Project control",
        body: "Job costing, material issues, supplier POs and progress-oriented invoicing in one operational system.",
      },
    ],
  },
  {
    slug: "school-management-erp",
    title: "School Management ERP Software | Unity ERP",
    h1: "School Management ERP for Fees, Staff and Stores",
    description:
      "School management ERP and education software for admissions-style CRM, fees, payroll and institutional inventory. Unity ERP.",
    keywords:
      "school management ERP, school ERP, education ERP, school management software Kenya",
    intro:
      "Schools run smoother when fees, inventory and staff costs share one system. Unity ERP supports education operations without separate silos.",
    sections: [
      {
        h2: "Education operations",
        body: "CRM-style admissions pipelines, fee collection patterns, staff payroll support and campus store inventory.",
      },
    ],
  },
  {
    slug: "hospital-erp-software",
    title: "Hospital ERP Software | Unity ERP",
    h1: "Hospital ERP for Pharmacy, Billing and Supplies",
    description:
      "Hospital and clinic ERP software for pharmacy stock, consumables, department costs and operational reporting. Unity ERP free trial.",
    keywords: "hospital ERP, clinic ERP, pharmacy inventory software, healthcare ERP Kenya",
    intro:
      "Reduce critical stockouts and speed operational billing cycles with one backbone for supplies and commercial records.",
    sections: [
      {
        h2: "Healthcare operations",
        body: "Pharmacy and consumables inventory, supplier lead times, department cost centres and management dashboards.",
      },
    ],
  },
  {
    slug: "pos-software",
    title: "POS Software & Retail System | Unity ERP",
    h1: "POS Software Connected to Real Inventory",
    description:
      "POS software and retail system with multi-branch stock, CRM customer profiles and daily cash-up. Unity ERP free trial.",
    keywords: "POS software, POS system, retail POS Kenya, point of sale software",
    intro:
      "Unity ERP POS posts straight to stock and finance — so retail teams stop reconciling three systems at closing time.",
    sections: [
      {
        h2: "Retail that scales",
        body: "Fast checkout, branch transfers, customer CRM profiles, cash-up reports and AI slow-mover alerts.",
      },
    ],
  },
  {
    slug: "accounting-software",
    title: "Accounting Software & Accounting ERP | Unity ERP",
    h1: "Accounting Software Tied to Real Operations",
    description:
      "Accounting software and accounting ERP: invoices, bills, payments, AR/AP and reports fed by live sales and stock. Unity ERP.",
    keywords:
      "accounting software, accounting ERP, invoicing software Kenya, bookkeeping software",
    intro:
      "When sales and stock post correctly, month-end stops being forensic work. Unity ERP connects operations to the books.",
    sections: [
      {
        h2: "Finance capabilities",
        body: "Chart of accounts patterns, receivables, payables, invoicing, payment recording and management reports.",
      },
    ],
  },
  {
    slug: "crm-software",
    title: "CRM Software with ERP | Unity ERP",
    h1: "CRM Software That Sees Stock and Cash",
    description:
      "CRM software built into ERP: pipeline, customers, quotes and AI sales insights — with live inventory visibility. Unity ERP free trial.",
    keywords: "CRM software, CRM Kenya, sales CRM, CRM with inventory",
    intro:
      "Sales should never promise what you cannot deliver. Unity ERP CRM sits next to inventory and finance in one platform.",
    sections: [
      {
        h2: "CRM capabilities",
        body: "Leads, deals, activities, follow-ups, quotes, customer history and AI sales summaries.",
      },
    ],
  },
  {
    slug: "payroll-software",
    title: "Payroll Software | Unity ERP HR & Payroll",
    h1: "Payroll Software with HR Records in One ERP",
    description:
      "Payroll software and HR records inside Unity ERP — employee data, payroll support and operational ERP in one place. Free trial.",
    keywords: "payroll software, payroll Kenya, HR payroll software, HR software",
    intro:
      "Unity ERP includes HR and payroll support so people costs stay connected to the same business system as stock and sales.",
    sections: [
      {
        h2: "HR & payroll",
        body: "Employee records, onboarding basics, time-off patterns and payroll processing support.",
      },
    ],
  },
  {
    slug: "cloud-erp-software",
    title: "Cloud ERP Software | Unity ERP",
    h1: "Cloud ERP Software — Access Anywhere",
    description:
      "Cloud ERP software for inventory, CRM, accounting, POS and manufacturing. Unity ERP with AI Assistant and free trial.",
    keywords: "cloud ERP, cloud ERP software, online ERP, SaaS ERP Kenya",
    intro:
      "Unity ERP runs in the cloud so teams across branches can work from one system of record — with API and webhook integrations.",
    sections: [
      {
        h2: "Cloud benefits",
        body: "No heavy on-premise footprint, multi-user access, backups, and integrations via REST API and webhooks.",
      },
    ],
  },
];

export const seoBySlug: Record<string, SeoPage> = Object.fromEntries(
  seoPages.map((p) => [p.slug, p])
);
