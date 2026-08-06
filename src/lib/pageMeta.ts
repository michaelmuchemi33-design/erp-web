/** Per-route title, short description (≤155), self-canonical */
export function trimTitle(s: string, max = 58) {
  const t = String(s || "").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trimEnd() + "…";
}

export function trimDesc(s: string, max = 155) {
  const t = String(s || "").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trimEnd() + "…";
}

export function setPageMeta(opts: {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
}) {
  if (typeof document === "undefined") return;
  const title = trimTitle(opts.title);
  const description = trimDesc(opts.description);
  const path = opts.path || "/";
  const url =
    path === "/"
      ? "https://www.unity-software.online/"
      : `https://www.unity-software.online${path.startsWith("/") ? path : "/" + path}`;

  document.title = title;

  const setAttr = (
    selector: string,
    attr: string,
    value: string,
    create?: "meta" | "link"
  ) => {
    let el = document.querySelector(selector) as HTMLElement | null;
    if (!el && create) {
      el = document.createElement(create);
      if (create === "meta") {
        const name = selector.match(/name="([^"]+)"/)?.[1];
        const prop = selector.match(/property="([^"]+)"/)?.[1];
        if (name) el.setAttribute("name", name);
        if (prop) el.setAttribute("property", prop);
      }
      if (create === "link") {
        const rel = selector.match(/rel="([^"]+)"/)?.[1];
        if (rel) el.setAttribute("rel", rel);
      }
      document.head.appendChild(el);
    }
    if (el) el.setAttribute(attr, value);
  };

  let d = document.querySelector('meta[name="description"]');
  if (!d) {
    d = document.createElement("meta");
    d.setAttribute("name", "description");
    document.head.appendChild(d);
  }
  d.setAttribute("content", description);

  if (opts.keywords) {
    let k = document.querySelector('meta[name="keywords"]');
    if (!k) {
      k = document.createElement("meta");
      k.setAttribute("name", "keywords");
      document.head.appendChild(k);
    }
    k.setAttribute("content", opts.keywords);
  }

  setAttr('link[rel="canonical"]', "href", url, "link");

  const setProp = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("property", property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };
  setProp("og:title", title);
  setProp("og:description", description);
  setProp("og:url", url);
  setProp("og:type", "website");

  const setName = (name: string, content: string) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };
  setName("twitter:title", title);
  setName("twitter:description", description);
}

/** Route → default meta map for main pages */
export const routeMeta: Record<
  string,
  { title: string; description: string; keywords?: string }
> = {
  "/": {
    title: "Unity ERP Kenya | Free Cloud ERP & CRM — No Credit Card",
    description:
      "Free cloud ERP & CRM for Kenya: inventory, POS, accounting, manufacturing. Free mode — no credit card. From KES 3,000/mo.",
    keywords: "ERP Kenya, free ERP, cloud ERP, CRM Kenya, Unity ERP, inventory software Kenya",
  },
  "/pricing": {
    title: "Unity ERP Pricing | Free Mode & KES Plans",
    description:
      "Free mode with no credit card. Then KES 3,000/month or KES 33,000/year. Unlimited users, CRM, AI and free website design.",
    keywords: "ERP pricing Kenya, cheap ERP Kenya, Unity ERP cost, free ERP trial",
  },
  "/features": {
    title: "Unity ERP Features | Inventory CRM Finance POS AI",
    description:
      "Inventory, CRM, finance, POS, manufacturing, HR and AI assistant in one cloud ERP. Free mode to explore — no card needed.",
    keywords: "ERP features, inventory CRM, POS Kenya, Unity ERP modules",
  },
  "/industries": {
    title: "Industry ERP Kenya | Manufacturing Retail Hospitality",
    description:
      "Unity ERP for manufacturing, retail, construction, hospitals, agriculture, logistics and more. Free mode available.",
    keywords: "manufacturing ERP Kenya, retail POS, industry ERP",
  },
  "/about": {
    title: "About Unity Software Solutions | Unity ERP",
    description:
      "Unity Software Solutions builds Unity ERP for African SMEs — Kenya, South Africa and Egypt. Cloud ERP with free mode.",
    keywords: "Unity Software Solutions, about Unity ERP",
  },
  "/contact": {
    title: "Contact Unity ERP | WhatsApp & Call Kenya",
    description:
      "Contact Unity ERP sales: WhatsApp +254 778 903 044 or call +254 793 832 286. Kenya, South Africa, Egypt.",
    keywords: "contact Unity ERP, WhatsApp ERP Kenya",
  },
  "/careers": {
    title: "Careers at Unity ERP | Jobs Kenya",
    description:
      "Join Unity Software Solutions. Careers in software, sales and design. Employee software benefits available.",
    keywords: "Unity ERP careers, jobs Kenya tech",
  },
  "/blog": {
    title: "Unity ERP Blog | ERP CRM Guides for Kenya SMEs",
    description:
      "Practical ERP, CRM, inventory and accounting guides for Kenyan and African SMEs. Free mode and trial tips.",
    keywords: "ERP blog Kenya, CRM guides, inventory management",
  },
  "/login": {
    title: "Sign in | Unity ERP",
    description:
      "Sign in with Google or email. Demo users open the shared demo; paid companies open their subdomain workspace.",
    keywords: "Unity ERP login, sign in ERP",
  },
  "/joined": {
    title: "Check your email | Unity ERP Demo",
    description:
      "Your demo request is in. Open the welcome email and start free mode — no credit card required.",
    keywords: "Unity ERP demo, free mode",
  },
  "/employee-discounts": {
    title: "Employee Software Benefits | Unity ERP",
    description:
      "Company-sponsored premium software for Unity team roles. Employee contribution plans and benefits overview.",
    keywords: "employee discounts, software benefits Unity",
  },
};
