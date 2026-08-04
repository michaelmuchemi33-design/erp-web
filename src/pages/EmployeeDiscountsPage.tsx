import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { payWithPaystack, usdToKes } from "@/lib/paystack";
import { setPageMeta } from "@/lib/pageMeta";
import {
  Check,
  Loader2,
  Sparkles,
  Shield,
  Laptop,
  Video,
  Headset,
  Brain,
  LayoutGrid,
  Search,
  Share2,
  Link2,
  Users,
} from "lucide-react";

type SoftItem = {
  id: string;
  name: string;
  retail: string;
  /** Employee monthly contribution USD */
  employeePays: number;
  covers: string;
  domain: string;
  /** individual | team | enterprise seat */
  planType: "individual" | "team" | "enterprise";
  tierLabel: string;
};

function SoftLogo({ domain, name }: { domain: string; name: string }) {
  const [src, setSrc] = useState(
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
  );
  const [failed, setFailed] = useState(0);
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white">
      {failed > 1 ? (
        <span className="text-xs font-bold text-slate-400">
          {name.slice(0, 2).toUpperCase()}
        </span>
      ) : (
        <img
          src={src}
          alt={`${name} logo`}
          width={48}
          height={48}
          className="h-8 w-8 object-contain"
          loading="lazy"
          onError={() => {
            if (failed === 0) {
              setSrc(`https://logo.clearbit.com/${domain}`);
              setFailed(1);
            } else setFailed(2);
          }}
        />
      )}
    </div>
  );
}

function priceBadge(pays: number) {
  if (pays <= 12) return { label: "Entry", className: "bg-slate-100 text-slate-700" };
  if (pays <= 17) return { label: "Standard", className: "bg-emerald-50 text-emerald-800" };
  if (pays <= 25) return { label: "Pro", className: "bg-amber-50 text-amber-800" };
  if (pays <= 40) return { label: "Team", className: "bg-sky-50 text-sky-800" };
  return { label: "Premium seat", className: "bg-violet-50 text-violet-800" };
}

const s = (
  id: string,
  name: string,
  retail: string,
  pays: number,
  covers: string,
  domain: string,
  planType: SoftItem["planType"] = "individual",
  tierLabel = "Individual"
): SoftItem => ({
  id,
  name,
  retail,
  employeePays: pays,
  covers,
  domain,
  planType,
  tierLabel,
});

const DEVELOPER: SoftItem[] = [
  s("jetbrains", "JetBrains All Products Pack", "$89/mo", 17, "$72", "jetbrains.com"),
  s("jetbrains-team", "JetBrains Team License (5 seats)", "$445/mo", 49, "Balance", "jetbrains.com", "team", "Team · 5 seats"),
  s("github", "GitHub Enterprise", "$39/user/mo", 17, "Balance", "github.com"),
  s("github-team", "GitHub Team Org", "$4+/user/mo", 12, "Balance", "github.com", "team", "Team org"),
  s("postman", "Postman Enterprise", "$45+/mo", 19, "Balance", "postman.com"),
  s("docker", "Docker Business", "$24/user/mo", 15, "Balance", "docker.com"),
  s("mongodb", "MongoDB Atlas Professional", "$57+/mo", 22, "Balance", "mongodb.com", "team", "Team cluster"),
  s("azure-devops", "Azure DevOps Premium", "$52+/mo", 20, "Balance", "azure.microsoft.com"),
  s("gitlab", "GitLab Premium", "$29/user/mo", 16, "Balance", "gitlab.com"),
  s("linear", "Linear Business", "$12+/user/mo", 10, "Balance", "linear.app", "team", "Team"),
  s("sentry", "Sentry Business", "$80+/mo", 28, "Balance", "sentry.io", "team", "Team"),
  s("datadog", "Datadog Pro", "$15+/host/mo", 24, "Balance", "datadoghq.com", "team", "Team"),
  s("vercel", "Vercel Pro", "$20/user/mo", 14, "Balance", "vercel.com"),
  s("figma-dev", "Figma Professional", "$15/editor/mo", 12, "Balance", "figma.com"),
  s("figma-org", "Figma Organization", "$45/editor/mo", 29, "Balance", "figma.com", "team", "Org / team"),
  s("cursor", "Cursor Pro", "$20/mo", 14, "Balance", "cursor.com"),
  s("cursor-biz", "Cursor Business", "$40/user/mo", 32, "Balance", "cursor.com", "team", "Business"),
  s("copilot", "GitHub Copilot Business", "$19/user/mo", 14, "Balance", "github.com"),
  s("supabase", "Supabase Pro", "$25+/mo", 15, "Balance", "supabase.com"),
  s("supabase-team", "Supabase Team", "$599+/mo", 79, "Balance", "supabase.com", "enterprise", "Team plan"),
  s("cloudflare", "Cloudflare Pro", "$20+/mo", 12, "Balance", "cloudflare.com"),
  s("aws-support", "AWS Support Business", "Variable", 45, "Balance", "aws.amazon.com", "enterprise", "Business support"),
];

const VIDEO: SoftItem[] = [
  s("adobe-cc", "Adobe Creative Cloud All Apps", "$69.99/mo", 17, "$52.99", "adobe.com"),
  s("adobe-teams", "Adobe Creative Cloud for Teams", "$99.99/user/mo", 35, "Balance", "adobe.com", "team", "Teams"),
  s("envato", "Envato Elements", "$39/mo", 15, "Balance", "envato.com"),
  s("motionarray", "Motion Array Unlimited", "$50+/mo", 18, "Balance", "motionarray.com"),
  s("artlist", "Artlist Max", "$59.99/mo", 20, "$39.99", "artlist.io"),
  s("storyblocks", "Storyblocks Unlimited", "$65+/mo", 22, "Balance", "storyblocks.com"),
  s("epidemic", "Epidemic Sound Commercial", "$49/mo", 18, "Balance", "epidemicsound.com"),
  s("runway", "Runway AI Unlimited", "$76+/mo", 29, "Balance", "runwayml.com"),
  s("runway-team", "Runway Teams", "$120+/mo", 45, "Balance", "runwayml.com", "team", "Teams"),
  s("frameio", "Frame.io Pro", "$15+/user/mo", 12, "Balance", "frame.io"),
  s("frameio-team", "Frame.io Team", "$25+/user/mo", 19, "Balance", "frame.io", "team", "Team"),
  s("descript", "Descript Pro", "$24+/mo", 14, "Balance", "descript.com"),
  s("descript-team", "Descript Enterprise", "Custom", 55, "Balance", "descript.com", "enterprise", "Enterprise"),
  s("riverside", "Riverside.fm Standard", "$15+/mo", 12, "Balance", "riverside.fm"),
  s("vimeo", "Vimeo Premium", "$65+/mo", 24, "Balance", "vimeo.com"),
  s("canva", "Canva Pro", "$15+/mo", 10, "Balance", "canva.com"),
  s("canva-teams", "Canva for Teams", "$30+/user/mo", 22, "Balance", "canva.com", "team", "Teams"),
  s("midjourney", "Midjourney Standard", "$30/mo", 16, "Balance", "midjourney.com"),
  s("midjourney-pro", "Midjourney Pro", "$60/mo", 28, "Balance", "midjourney.com", "individual", "Pro"),
  s("elevenlabs", "ElevenLabs Creator", "$22+/mo", 14, "Balance", "elevenlabs.io"),
  s("elevenlabs-scale", "ElevenLabs Scale", "$99+/mo", 39, "Balance", "elevenlabs.io", "team", "Scale"),
  s("loom-biz", "Loom Business", "$15+/user/mo", 12, "Balance", "loom.com", "team", "Business"),
];

const SALES: SoftItem[] = [
  s("linkedin", "LinkedIn Sales Navigator Advanced", "$99.99/mo", 20, "$79.99", "linkedin.com"),
  s("linkedin-team", "Sales Navigator Team", "$135+/user/mo", 42, "Balance", "linkedin.com", "team", "Team seats"),
  s("apollo", "Apollo.io Professional", "$79/mo", 17, "$62", "apollo.io"),
  s("apollo-org", "Apollo.io Organization", "$119+/mo", 38, "Balance", "apollo.io", "team", "Organization"),
  s("zoom", "Zoom Workplace Business", "$50+/mo", 18, "Balance", "zoom.us", "team", "Business"),
  s("hubspot", "HubSpot Sales Professional", "$90+/mo", 25, "Balance", "hubspot.com"),
  s("hubspot-enterprise", "HubSpot Sales Enterprise", "$150+/mo", 55, "Balance", "hubspot.com", "enterprise", "Enterprise"),
  s("salesforce", "Salesforce Professional", "$100+/mo", 30, "Balance", "salesforce.com"),
  s("salesforce-ee", "Salesforce Enterprise", "$175+/mo", 65, "Balance", "salesforce.com", "enterprise", "Enterprise"),
  s("calendly", "Calendly Teams", "$50+/mo", 16, "Balance", "calendly.com", "team", "Teams"),
  s("seamless", "Seamless.AI Pro", "$147+/mo", 45, "Balance", "seamless.ai"),
  s("pipedrive", "Pipedrive Advanced", "$49+/user/mo", 18, "Balance", "pipedrive.com"),
  s("close", "Close CRM", "$49+/user/mo", 19, "Balance", "close.com"),
  s("zoominfo", "ZoomInfo Sales", "Enterprise", 75, "Balance", "zoominfo.com", "enterprise", "Enterprise"),
  s("lusha", "Lusha Pro", "$49+/mo", 17, "Balance", "lusha.com"),
  s("hunter", "Hunter.io Business", "$49+/mo", 17, "Balance", "hunter.io", "team", "Business"),
  s("lemlist", "Lemlist Expert", "$59+/mo", 20, "Balance", "lemlist.com"),
  s("instantly", "Instantly Growth", "$37+/mo", 15, "Balance", "instantly.ai"),
  s("fireflies", "Fireflies.ai Pro", "$18+/mo", 12, "Balance", "fireflies.ai"),
  s("pandadoc", "PandaDoc Business", "$49+/user/mo", 19, "Balance", "pandadoc.com", "team", "Business"),
  s("gong", "Gong Engage", "Enterprise", 89, "Balance", "gong.io", "enterprise", "Enterprise"),
];

const AI: SoftItem[] = [
  s("chatgpt", "ChatGPT Plus", "$20/mo", 12, "$8", "openai.com"),
  s("chatgpt-team", "ChatGPT Team", "$30/user/mo", 17, "$13", "openai.com", "team", "Team"),
  s("chatgpt-ent", "ChatGPT Enterprise", "Custom", 59, "Balance", "openai.com", "enterprise", "Enterprise"),
  s("claude", "Claude Pro", "$20/mo", 12, "$8", "anthropic.com"),
  s("claude-max", "Claude Max", "$100+/mo", 35, "Balance", "anthropic.com"),
  s("claude-team", "Claude Team", "$30+/user/mo", 22, "Balance", "anthropic.com", "team", "Team"),
  s("perplexity", "Perplexity Pro", "$20/mo", 12, "Balance", "perplexity.ai"),
  s("perplexity-ent", "Perplexity Enterprise Pro", "$40+/mo", 24, "Balance", "perplexity.ai", "enterprise", "Enterprise"),
  s("notion", "Notion Plus", "$10+/user/mo", 10, "Balance", "notion.so"),
  s("notion-biz", "Notion Business", "$18+/user/mo", 14, "Balance", "notion.so", "team", "Business"),
  s("grammarly", "Grammarly Business", "$45+/mo", 18, "Balance", "grammarly.com", "team", "Business"),
  s("m365", "Microsoft 365 Business Premium", "$52+/mo", 20, "Balance", "microsoft.com", "team", "Business"),
  s("gws", "Google Workspace Business Plus", "$22+/user/mo", 15, "Balance", "workspace.google.com", "team", "Business Plus"),
  s("gws-ent", "Google Workspace Enterprise", "$45+/user/mo", 28, "Balance", "workspace.google.com", "enterprise", "Enterprise"),
  s("gemini", "Google Gemini Advanced", "$20+/mo", 12, "Balance", "google.com"),
  s("copilot-ms", "Microsoft 365 Copilot", "$30+/user/mo", 22, "Balance", "microsoft.com", "team", "Copilot"),
  s("jasper", "Jasper Pro", "$49+/mo", 19, "Balance", "jasper.ai"),
  s("miro", "Miro Business", "$16+/user/mo", 12, "Balance", "miro.com", "team", "Business"),
  s("slack", "Slack Business+", "$12.50+/user/mo", 10, "Balance", "slack.com", "team", "Business+"),
  s("asana", "Asana Business", "$25+/user/mo", 15, "Balance", "asana.com", "team", "Business"),
  s("monday", "monday.com Pro", "$16+/seat/mo", 12, "Balance", "monday.com", "team", "Pro"),
  s("zapier", "Zapier Professional", "$29+/mo", 14, "Balance", "zapier.com"),
  s("zapier-team", "Zapier Team", "$69+/mo", 32, "Balance", "zapier.com", "team", "Team"),
];

const CATEGORIES = [
  { key: "all", label: "All software", icon: LayoutGrid },
  { key: "developers", label: "Developers", icon: Laptop, items: DEVELOPER },
  { key: "video", label: "Video & creative", icon: Video, items: VIDEO },
  { key: "sales", label: "Sales", icon: Headset, items: SALES },
  { key: "ai", label: "AI & productivity", icon: Brain, items: AI },
] as const;

const ALL_SOFTWARE: SoftItem[] = (() => {
  const map = new Map<string, SoftItem>();
  for (const list of [DEVELOPER, VIDEO, SALES, AI]) {
    for (const item of list) {
      if (!map.has(item.id)) map.set(item.id, item);
    }
  }
  return Array.from(map.values()).sort((a, b) => a.employeePays - b.employeePays);
})();

const PRICE_FILTERS = [
  { key: "all", label: "All prices" },
  { key: "under15", label: "Under $15" },
  { key: "15to25", label: "$15 – $25" },
  { key: "over25", label: "Over $25" },
  { key: "team", label: "Team / org plans" },
];

const BENEFITS = [
  "Company-sponsored premium software (role-based)",
  "Individual, team, and enterprise seat options",
  "Access to AI-powered productivity tools",
  "Professional development resources",
  "Remote work flexibility",
  "Career growth opportunities",
  "Performance-based bonuses",
  "Modern equipment and cloud-based tools",
];

export function EmployeeDiscountsShell() {
  const [tab, setTab] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SoftItem | null>(ALL_SOFTWARE[0]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Developer");
  const [accountEmail, setAccountEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const baseItems = useMemo(() => {
    if (tab === "all") return ALL_SOFTWARE;
    const cat = CATEGORIES.find((c) => c.key === tab);
    return (cat && "items" in cat ? cat.items : DEVELOPER) as SoftItem[];
  }, [tab]);

  const items = useMemo(() => {
    let list = baseItems;
    if (priceFilter === "under15") list = list.filter((i) => i.employeePays < 15);
    else if (priceFilter === "15to25")
      list = list.filter((i) => i.employeePays >= 15 && i.employeePays <= 25);
    else if (priceFilter === "over25") list = list.filter((i) => i.employeePays > 25);
    else if (priceFilter === "team")
      list = list.filter((i) => i.planType === "team" || i.planType === "enterprise");

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.domain.toLowerCase().includes(q) ||
          i.tierLabel.toLowerCase().includes(q)
      );
    }
    return list;
  }, [baseItems, priceFilter, query]);

  useEffect(() => {
    try {
      const id = new URLSearchParams(window.location.search).get("tool");
      if (id) {
        const found = ALL_SOFTWARE.find((x) => x.id === id);
        if (found) {
          setSelected(found);
          setTab("all");
        }
      }
    } catch {}
    setPageMeta({
      title: "Employee Software Discounts | $10–$89/mo share | Unity",
      description:
        "Company-sponsored software for Unity employees. Individual, team and enterprise plans. Employee share from about $10 to $89/month depending on the tool.",
      path: "/employee-discounts",
      keywords:
        "employee software discounts, team software plans, JetBrains team license, Adobe teams, ChatGPT team, Unity Software Solutions benefits",
    });
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (items.length && !items.find((i) => i.id === selected?.id)) {
      setSelected(items[0]);
    }
  }, [items, selected?.id]);

  async function submitInterest() {
    setErr("");
    setMsg("");
    if (!email.includes("@") || !selected) {
      setErr("Enter a valid email and select software.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/employee-discount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          name: name.trim() || null,
          role,
          software: selected.name,
          software_id: selected.id,
          employee_pays_usd: selected.employeePays,
          plan_type: selected.planType,
          tier_label: selected.tierLabel,
          account_email: accountEmail.trim() || email.trim(),
          source: "employee_discounts_page",
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error((j as { error?: string }).error || "Request failed");
      }
      setMsg("Request saved. Continue to Paystack to pay your employee share.");
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Could not save request");
    } finally {
      setLoading(false);
    }
  }

  async function pay() {
    setErr("");
    if (!email.includes("@") || !selected) {
      setErr("Enter work email and select a tool first.");
      return;
    }
    setLoading(true);
    try {
      await submitInterest();
      const kes = usdToKes(selected.employeePays);
      await payWithPaystack({
        email: email.trim().toLowerCase(),
        amountKes: kes,
        amountUsd: selected.employeePays,
        planLabel: `Employee discount — ${selected.name} (${selected.tierLabel})`,
        metadata: {
          product: "employee_software_discount",
          software: selected.name,
          role,
          plan_type: selected.planType,
          account_email: accountEmail || email,
          display_usd: String(selected.employeePays),
        },
      });
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Payment could not start");
    } finally {
      setLoading(false);
    }
  }

  const minP = Math.min(...ALL_SOFTWARE.map((i) => i.employeePays));
  const maxP = Math.max(...ALL_SOFTWARE.map((i) => i.employeePays));

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Header />
      <main className="pt-24 pb-20">
        <section className="border-b border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Sparkles className="h-3.5 w-3.5" />
              Employee benefits
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Company-sponsored premium software
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              Individual, <strong className="text-slate-900">team</strong>, and{" "}
              <strong className="text-slate-900">enterprise</strong> seats. Employee share is
              shown in <strong className="text-slate-900">USD (${minP}–${maxP}/mo)</strong> and
              charged in <strong className="text-slate-900">KES</strong> on Paystack. Unity covers
              the rest of the retail cost.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                Entry under $15
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800">
                Standard $15–$25
              </span>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-800">
                Team / Pro $25–$45
              </span>
              <span className="rounded-full bg-violet-50 px-3 py-1 text-violet-800">
                Premium seats $45+
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-sm text-slate-500">
              {ALL_SOFTWARE.length}+ tools. Availability depends on role and company
              policy. Retail prices change over time.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    tab === key
                      ? "bg-slate-950 text-white"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {PRICE_FILTERS.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setPriceFilter(f.key)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      priceFilter === f.key
                        ? "bg-emerald-600 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <label className="relative block w-full sm:max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search software or team plan…"
                  className="w-full rounded-full border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </label>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Showing <strong className="text-slate-800">{items.length}</strong> tools
            {query ? ` for “${query}”` : ""}
          </p>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((item) => {
                  const active = selected?.id === item.id;
                  const badge = priceBadge(item.employeePays);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelected(item)}
                      className={`flex gap-3 rounded-2xl border p-4 text-left transition ${
                        active
                          ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20"
                          : "border-slate-200 bg-white hover:border-emerald-200"
                      }`}
                    >
                      <SoftLogo domain={item.domain} name={item.name} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <p className="truncate text-sm font-bold text-slate-900">
                            {item.name}
                          </p>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badge.className}`}
                          >
                            {badge.label} · ${item.employeePays}/mo
                          </span>
                          {(item.planType === "team" ||
                            item.planType === "enterprise") && (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                              <Users className="h-2.5 w-2.5" />
                              {item.tierLabel}
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-xs text-slate-500">
                          Retail {item.retail}
                        </p>
                        <p className="text-xs text-slate-400">
                          Unity covers {item.covers}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
              {items.length === 0 && (
                <p className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
                  No tools match that filter. Try another price range or search.
                </p>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-24 lg:self-start rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
                {selected && (
                  <div className="mb-5 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                    <SoftLogo domain={selected.domain} name={selected.name} />
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {selected.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {selected.tierLabel} · Retail {selected.retail}
                      </p>
                      <p className="text-lg font-bold text-emerald-700">
                        ${selected.employeePays}
                        <span className="text-sm font-medium text-slate-500">
                          /month
                        </span>
                      </p>
                      <p className="text-xs text-slate-500">
                        Charged in KES via Paystack (≈ KES{" "}
                        {usdToKes(selected.employeePays).toLocaleString()})
                      </p>
                    </div>
                  </div>
                )}

                <h2 className="text-base font-bold text-slate-950">
                  Request & pay employee share
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Prices range by tool and plan type (individual, team, enterprise).
                  We activate the seat on the account email you provide after payment.
                </p>
                {selected && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        const url = `${window.location.origin}/employee-discounts?tool=${encodeURIComponent(selected.id)}`;
                        const text = `Unity employee software: ${selected.name} (${selected.tierLabel}) — employee share $${selected.employeePays}/mo\n${url}`;
                        try {
                          if (navigator.share) {
                            await navigator.share({
                              title: selected.name,
                              text,
                              url,
                            });
                          } else {
                            await navigator.clipboard.writeText(text);
                            setMsg("Share link copied to clipboard");
                          }
                        } catch {
                          try {
                            await navigator.clipboard.writeText(url);
                            setMsg("Share link copied");
                          } catch {
                            setErr("Could not copy link");
                          }
                        }
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      Share this tool
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        const url = `${window.location.origin}/employee-discounts?tool=${encodeURIComponent(selected.id)}`;
                        try {
                          await navigator.clipboard.writeText(url);
                          setMsg("Link copied — send it to a teammate");
                        } catch {
                          setErr("Could not copy link");
                        }
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      <Link2 className="h-3.5 w-3.5" />
                      Copy link
                    </button>
                  </div>
                )}

                <label className="mt-4 block text-xs font-semibold text-slate-600">
                  Your name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                    placeholder="Full name"
                  />
                </label>
                <label className="mt-3 block text-xs font-semibold text-slate-600">
                  Work email *
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                    placeholder="you@company.com"
                    required
                  />
                </label>
                <label className="mt-3 block text-xs font-semibold text-slate-600">
                  Account email for the subscription
                  <input
                    type="email"
                    value={accountEmail}
                    onChange={(e) => setAccountEmail(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                    placeholder="Same as work email if unsure"
                  />
                </label>
                <label className="mt-3 block text-xs font-semibold text-slate-600">
                  Your role
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    <option>Developer</option>
                    <option>Video Editor</option>
                    <option>Sales Professional</option>
                    <option>Operations</option>
                    <option>Other eligible employee</option>
                  </select>
                </label>

                {err && <p className="mt-3 text-sm text-rose-600">{err}</p>}
                {msg && <p className="mt-3 text-sm text-emerald-700">{msg}</p>}

                <button
                  type="button"
                  disabled={loading || !selected}
                  onClick={pay}
                  className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-950 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Pay ${selected?.employeePays ?? 17}/mo with Paystack
                    </>
                  )}
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={submitInterest}
                  className="mt-2 w-full text-center text-xs font-medium text-slate-500 hover:text-slate-800"
                >
                  Save request only (pay later)
                </button>

                <div className="mt-5 flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  Eligible employees only. Team and enterprise seats may need manager
                  approval before activation.
                </div>
              </div>
            </div>
          </div>

          <section className="mt-16 rounded-3xl border border-slate-100 bg-slate-50 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-slate-950">
              Additional employee benefits
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {BENEFITS.map((b) => (
                <li key={b} className="flex gap-2 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {b}
                </li>
              ))}
            </ul>
          </section>

          <p className="mt-8 text-center text-xs text-slate-400">
            Software names, retail prices, and employee share amounts are illustrative.
            Final amounts depend on Unity Software Solutions policy and vendor pricing.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
