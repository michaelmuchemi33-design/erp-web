const LINKS = [
  { href: "/erp-system-kenya", label: "ERP system Kenya" },
  { href: "/best-erp-software-kenya", label: "Best ERP software Kenya" },
  { href: "/sage-alternative", label: "Sage alternative Kenya" },
  { href: "/sage-300-kenya", label: "Sage 300 Kenya" },
  { href: "/sage-accounting-software-kenya", label: "Sage accounting Kenya" },
  { href: "/sap-alternative-kenya", label: "SAP alternative Kenya" },
  { href: "/odoo-alternative-kenya", label: "Odoo alternative Kenya" },
  { href: "/kra-etims-erp", label: "KRA eTIMS ERP" },
  { href: "/erp-software-cost-kenya", label: "ERP software cost Kenya" },
  { href: "/payroll-software-kenya", label: "Payroll software Kenya" },
  { href: "/top-erp-software-kenya-2026", label: "Top ERP Kenya 2026" },
  { href: "/mpesa-erp", label: "M-Pesa ERP" },
  { href: "/inventory-management", label: "Inventory management" },
  { href: "/crm", label: "CRM software" },
  { href: "/free-erp-software", label: "Free ERP software" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "ERP blog" },
];

export function SeoInternalLinks({
  title = "Explore Unity ERP guides",
}: {
  title?: string;
}) {
  return (
    <section className="border-t border-slate-100 bg-slate-50/80 py-12 md:py-14">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-lg font-bold tracking-tight text-slate-950 md:text-xl">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Guides for Kenyan and African businesses comparing ERP, Sage, SAP, payroll,
          eTIMS-oriented operations and cloud pricing.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-flex rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-800"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
