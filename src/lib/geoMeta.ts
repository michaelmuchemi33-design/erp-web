/** Country-aware titles & descriptions for search / social */

export type GeoPack = {
  code: string;
  regionLabel: string;
  titleHome: string;
  descriptionHome: string;
};

const packs: Record<string, GeoPack> = {
  KE: {
    code: "KE",
    regionLabel: "Kenya",
    titleHome: "Unity ERP Kenya — Free Cloud ERP Software for African Businesses",
    descriptionHome:
      "Unity ERP Kenya: free trial cloud ERP for inventory, CRM, accounting, POS, manufacturing and payroll. Built for Kenyan SMEs. KES pricing. Start free today.",
  },
  UG: {
    code: "UG",
    regionLabel: "Uganda",
    titleHome: "Unity ERP Uganda — Cloud ERP & CRM for Growing Businesses",
    descriptionHome:
      "Unity ERP for Uganda: inventory, CRM, accounting, POS and AI Assistant. Affordable cloud ERP with free trial for Ugandan SMEs.",
  },
  TZ: {
    code: "TZ",
    regionLabel: "Tanzania",
    titleHome: "Unity ERP Tanzania — Cloud ERP Software for SMEs",
    descriptionHome:
      "Unity ERP Tanzania: all-in-one ERP + CRM + AI for inventory, finance and sales. Free trial for Tanzanian businesses.",
  },
  RW: {
    code: "RW",
    regionLabel: "Rwanda",
    titleHome: "Unity ERP Rwanda — Cloud ERP & CRM Software",
    descriptionHome:
      "Unity ERP Rwanda: inventory, accounting, CRM and POS in one cloud system. Free trial available.",
  },
  NG: {
    code: "NG",
    regionLabel: "Nigeria",
    titleHome: "Unity ERP Nigeria — Affordable Cloud ERP for SMEs",
    descriptionHome:
      "Unity ERP for Nigerian businesses: CRM, inventory, accounting and AI. Cloud ERP with free trial.",
  },
  ZA: {
    code: "ZA",
    regionLabel: "South Africa",
    titleHome: "Unity ERP South Africa — Cloud ERP, CRM & AI",
    descriptionHome:
      "Unity ERP South Africa: all-in-one ERP for inventory, finance, CRM and manufacturing. Free trial. Regional support.",
  },
  EG: {
    code: "EG",
    regionLabel: "Egypt",
    titleHome: "Unity ERP Egypt — Cloud ERP Software for Businesses",
    descriptionHome:
      "Unity ERP Egypt: inventory, CRM, accounting and POS. Cloud ERP with AI Assistant and free trial.",
  },
  GH: {
    code: "GH",
    regionLabel: "Ghana",
    titleHome: "Unity ERP Ghana — Cloud ERP & CRM for SMEs",
    descriptionHome:
      "Unity ERP Ghana: affordable cloud ERP for inventory, sales and finance. Free trial for Ghanaian businesses.",
  },
  DEFAULT: {
    code: "INTL",
    regionLabel: "Global",
    titleHome: "Unity ERP — Free Cloud ERP Software | CRM, Inventory & AI",
    descriptionHome:
      "Unity ERP by Unity Software Solutions: all-in-one cloud ERP + CRM + AI for inventory, accounting, POS, manufacturing and payroll. 2-month free trial. Affordable for SMEs worldwide.",
  },
};

const tzMap: Record<string, string> = {
  "Africa/Nairobi": "KE",
  "Africa/Kampala": "UG",
  "Africa/Dar_es_Salaam": "TZ",
  "Africa/Kigali": "RW",
  "Africa/Lagos": "NG",
  "Africa/Johannesburg": "ZA",
  "Africa/Cairo": "EG",
  "Africa/Accra": "GH",
};

export function detectCountryCode(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tzMap[tz]) return tzMap[tz];
    const lang = (navigator.language || "").toLowerCase();
    if (lang.includes("sw-ke") || lang.endsWith("-ke")) return "KE";
    if (lang.endsWith("-ug")) return "UG";
    if (lang.endsWith("-tz")) return "TZ";
    if (lang.endsWith("-ng")) return "NG";
    if (lang.endsWith("-za")) return "ZA";
    if (lang.endsWith("-eg")) return "EG";
    if (lang.endsWith("-gh")) return "GH";
  } catch {}
  return "DEFAULT";
}

export function getGeoPack(code?: string): GeoPack {
  const c = code || detectCountryCode();
  return packs[c] || packs.DEFAULT;
}

export function applyHomeMeta(pack: GeoPack) {
  document.title = pack.titleHome;
  let d = document.querySelector('meta[name="description"]');
  if (!d) {
    d = document.createElement("meta");
    d.setAttribute("name", "description");
    document.head.appendChild(d);
  }
  d.setAttribute("content", pack.descriptionHome);

  let ogt = document.querySelector('meta[property="og:title"]');
  if (!ogt) {
    ogt = document.createElement("meta");
    ogt.setAttribute("property", "og:title");
    document.head.appendChild(ogt);
  }
  ogt.setAttribute("content", pack.titleHome);

  let ogd = document.querySelector('meta[property="og:description"]');
  if (!ogd) {
    ogd = document.createElement("meta");
    ogd.setAttribute("property", "og:description");
    document.head.appendChild(ogd);
  }
  ogd.setAttribute("content", pack.descriptionHome);
}

/** Optional IP refine (non-blocking) */
export async function refineCountryFromIp(): Promise<string | null> {
  try {
    const res = await fetch("https://ipapi.co/country_code/", {
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;
    const code = (await res.text()).trim().toUpperCase();
    if (code && packs[code]) return code;
  } catch {}
  return null;
}
