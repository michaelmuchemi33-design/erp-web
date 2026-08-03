/** Per-route title, short description (≤155), self-canonical */

export function trimDesc(text: string, max = 155): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

export function trimTitle(text: string, max = 58): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

export function setPageMeta(opts: {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
}) {
  const path = opts.path ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const url = `https://www.unity-software.online${path === "/" ? "/" : path.replace(/\/$/, "") || ""}`;
  const title = trimTitle(opts.title);
  const description = trimDesc(opts.description);

  document.title = title;

  const ensure = (sel: string, attr: string, create: "meta" | "link", nameAttr: string, nameVal: string) => {
    let el = document.querySelector(sel) as HTMLElement | null;
    if (!el) {
      el = document.createElement(create);
      el.setAttribute(nameAttr, nameVal);
      document.head.appendChild(el);
    }
    el.setAttribute(attr, create === "link" ? url : description);
    return el;
  };

  // description
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

  // self-canonical (fixes audit: all pages pointed at /)
  let can = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!can) {
    can = document.createElement("link");
    can.setAttribute("rel", "canonical");
    document.head.appendChild(can);
  }
  can.href = url;

  // OG
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
    title: "Unity ERP Kenya | Free Cloud ERP & CRM",
    description:
      "Unity ERP: cloud ERP + CRM + AI for inventory, accounting, POS and manufacturing. Free trial. KES 3,000/mo. Kenya & Africa.",
    keywords: "Unity ERP, ERP Kenya, free ERP trial, cloud ERP, CRM software Kenya",
  },
  "/pricing": {
    title: "Unity ERP Pricing | Free Trial",
    description:
      "Unity ERP pricing: KES 3,000/month or KES 33,000/year. Free limited mode and 60-day trial. Pay with Paystack.",
  },
  "/features": {
    title: "Unity ERP Features | CRM Inventory AI",
    description:
      "Explore Unity ERP features: CRM, inventory, purchasing, finance, POS, manufacturing, HR and AI Assistant.",
  },
  "/industries": {
    title: "Unity ERP Industries | Retail & More",
    description:
      "Unity ERP for manufacturing, retail POS, construction, hospitals, schools, agriculture, logistics and finance.",
  },
  "/about": {
    title: "About Unity Software Solutions",
    description:
      "Unity Software Solutions builds Unity ERP for African SMEs — Kenya, South Africa and Egypt. Our story and timeline.",
  },
  "/contact": {
    title: "Contact Unity ERP | Sales & Support",
    description:
      "Contact Unity ERP: erpintergration@gmail.com, WhatsApp +254 778 903 044, call +254 793 832 286.",
  },
  "/careers": {
    title: "Careers at Unity Software Solutions",
    description:
      "Join Unity Software Solutions. Open roles: Video Editor and Sales Executive. Apply by email or WhatsApp.",
  },
  "/blog": {
    title: "Unity ERP Blog | Guides for SMEs",
    description:
      "ERP guides for Kenyan SMEs: choose ERP, implementation, inventory, accounting, CRM and AI automation.",
  },
  "/login": {
    title: "Login | Unity ERP",
    description: "Log in to your Unity ERP workspace or request access from sales.",
  },
  "/joined": {
    title: "You're In | Unity ERP",
    description: "Your Unity ERP request is received. Sales will contact you to activate access.",
  },
};
