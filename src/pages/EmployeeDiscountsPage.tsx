import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { payWithPaystack } from "@/lib/paystack";
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
} from "lucide-react";

type SoftItem = {
  id: string;
  name: string;
  retail: string;
  employeePays: number;
  covers: string;
  domain: string;
};

function logoUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

function SoftLogo({ domain, name }: { domain: string; name: string }) {
  const [src, setSrc] = useState(logoUrl(domain));
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
            } else {
              setFailed(2);
            }
          }}
        />
      )}
    </div>
  );
}

const s = (
  id: string,
  name: string,
  retail: string,
  pays: number,
  covers: string,
  domain: string
): SoftItem => ({ id, name, retail, employeePays: pays, covers, domain });

const DEVELOPER: SoftItem[] = [
  s("jetbrains", "JetBrains All Products Pack", "$89/mo", 17, "$72", "jetbrains.com"),
  s("adobe-dev", "Adobe Creative Cloud All Apps", "$69.99/mo", 17, "$52.99", "adobe.com"),
  s("github", "GitHub Enterprise", "$39/user/mo", 17, "Balance", "github.com"),
  s("postman", "Postman Enterprise", "$45+/mo", 17, "Balance", "postman.com"),
  s("docker", "Docker Business", "$24/user/mo", 17, "Balance", "docker.com"),
  s("mongodb", "MongoDB Atlas Professional", "$57+/mo", 17, "Balance", "mongodb.com"),
  s("azure-devops", "Azure DevOps Premium", "$52+/mo", 17, "Balance", "azure.microsoft.com"),
  s("gitlab", "GitLab Premium", "$29/user/mo", 17, "Balance", "gitlab.com"),
  s("linear", "Linear Business", "$12+/user/mo", 17, "Balance", "linear.app"),
  s("sentry", "Sentry Business", "$80+/mo", 17, "Balance", "sentry.io"),
  s("datadog", "Datadog Pro", "$15+/host/mo", 17, "Balance", "datadoghq.com"),
  s("aws", "AWS Support Business", "Variable", 17, "Balance", "aws.amazon.com"),
  s("vercel", "Vercel Pro", "$20/user/mo", 17, "Balance", "vercel.com"),
  s("figma-dev", "Figma Professional", "$15/editor/mo", 17, "Balance", "figma.com"),
  s("notion-dev", "Notion Plus", "$10+/user/mo", 17, "Balance", "notion.so"),
  s("cursor", "Cursor Pro", "$20/mo", 17, "Balance", "cursor.com"),
  s("copilot", "GitHub Copilot Business", "$19/user/mo", 17, "Balance", "github.com"),
  s("terraform", "Terraform Cloud Team", "$20+/user/mo", 17, "Balance", "hashicorp.com"),
  s("redis", "Redis Cloud Pro", "Variable", 17, "Balance", "redis.io"),
  s("supabase", "Supabase Pro", "$25+/mo", 17, "Balance", "supabase.com"),
  s("cloudflare", "Cloudflare Pro", "$20+/mo", 17, "Balance", "cloudflare.com"),
  s("npm", "npm Pro", "$7+/user/mo", 17, "Balance", "npmjs.com"),
];

const VIDEO: SoftItem[] = [
  s("adobe-video", "Adobe Creative Cloud All Apps", "$69.99/mo", 17, "$52.99", "adobe.com"),
  s("envato", "Envato Elements", "$39/mo", 17, "Balance", "envato.com"),
  s("motionarray", "Motion Array Unlimited", "$50+/mo", 17, "Balance", "motionarray.com"),
  s("artlist", "Artlist Max", "$59.99/mo", 17, "$42.99", "artlist.io"),
  s("storyblocks", "Storyblocks Unlimited", "$65+/mo", 17, "Balance", "storyblocks.com"),
  s("epidemic", "Epidemic Sound Commercial", "$49/mo", 17, "Balance", "epidemicsound.com"),
  s("runway", "Runway AI Unlimited", "$76+/mo", 17, "Balance", "runwayml.com"),
  s("frameio", "Frame.io Pro", "$15+/user/mo", 17, "Balance", "frame.io"),
  s("davinci", "DaVinci Resolve Studio", "License", 17, "Balance", "blackmagicdesign.com"),
  s("capcut", "CapCut Pro", "$8+/mo", 17, "Balance", "capcut.com"),
  s("descript", "Descript Pro", "$24+/mo", 17, "Balance", "descript.com"),
  s("riverside", "Riverside.fm Standard", "$15+/mo", 17, "Balance", "riverside.fm"),
  s("vimeo", "Vimeo Premium", "$65+/mo", 17, "Balance", "vimeo.com"),
  s("canva-video", "Canva Pro", "$15+/mo", 17, "Balance", "canva.com"),
  s("midjourney", "Midjourney Standard", "$30/mo", 17, "Balance", "midjourney.com"),
  s("elevenlabs", "ElevenLabs Creator", "$22+/mo", 17, "Balance", "elevenlabs.io"),
  s("premiere-rush", "Adobe Premiere Pro", "via CC", 17, "Balance", "adobe.com"),
  s("after-effects", "Adobe After Effects", "via CC", 17, "Balance", "adobe.com"),
  s("audition", "Adobe Audition", "via CC", 17, "Balance", "adobe.com"),
  s("musicbed", "Musicbed License", "Variable", 17, "Balance", "musicbed.com"),
  s("soundstripe", "Soundstripe Unlimited", "$15+/mo", 17, "Balance", "soundstripe.com"),
  s("loom", "Loom Business", "$15+/user/mo", 17, "Balance", "loom.com"),
];

const SALES: SoftItem[] = [
  s("linkedin", "LinkedIn Sales Navigator Advanced", "$99.99/mo", 20, "$79.99", "linkedin.com"),
  s("apollo", "Apollo.io Professional", "$79/mo", 17, "$62", "apollo.io"),
  s("zoom", "Zoom Workplace Business", "$50+/mo", 17, "Balance", "zoom.us"),
  s("hubspot", "HubSpot Sales Professional", "$90+/mo", 20, "Balance", "hubspot.com"),
  s("salesforce", "Salesforce Professional", "$100+/mo", 20, "Balance", "salesforce.com"),
  s("calendly", "Calendly Teams", "$50+/mo", 17, "Balance", "calendly.com"),
  s("seamless", "Seamless.AI Pro", "$147+/mo", 20, "Balance", "seamless.ai"),
  s("pipedrive", "Pipedrive Advanced", "$49+/user/mo", 17, "Balance", "pipedrive.com"),
  s("close", "Close CRM", "$49+/user/mo", 17, "Balance", "close.com"),
  s("outreach", "Outreach", "Enterprise", 20, "Balance", "outreach.io"),
  s("gong", "Gong Engage", "Enterprise", 20, "Balance", "gong.io"),
  s("chorus", "Chorus.ai", "Enterprise", 20, "Balance", "chorus.ai"),
  s("zoominfo", "ZoomInfo Sales", "Enterprise", 20, "Balance", "zoominfo.com"),
  s("lusha", "Lusha Pro", "$49+/mo", 17, "Balance", "lusha.com"),
  s("hunter", "Hunter.io Business", "$49+/mo", 17, "Balance", "hunter.io"),
  s("lemlist", "Lemlist Expert", "$59+/mo", 17, "Balance", "lemlist.com"),
  s("instantly", "Instantly Growth", "$37+/mo", 17, "Balance", "instantly.ai"),
  s("reply", "Reply.io", "$60+/mo", 17, "Balance", "reply.io"),
  s("fireflies", "Fireflies.ai Pro", "$18+/mo", 17, "Balance", "fireflies.ai"),
  s("chili", "Chili Piper", "Enterprise", 17, "Balance", "chilipiper.com"),
  s("docsend", "DocSend Personal", "$10+/mo", 17, "Balance", "docsend.com"),
  s("pandadoc", "PandaDoc Business", "$49+/user/mo", 17, "Balance", "pandadoc.com"),
];

const AI: SoftItem[] = [
  s("chatgpt", "ChatGPT Team", "$30/user/mo", 17, "$13", "openai.com"),
  s("claude", "Claude Max", "$100+/mo", 20, "Balance", "anthropic.com"),
  s("perplexity", "Perplexity Enterprise Pro", "$40+/mo", 17, "Balance", "perplexity.ai"),
  s("notion", "Notion Enterprise", "$50+/mo", 17, "Balance", "notion.so"),
  s("grammarly", "Grammarly Business", "$45+/mo", 17, "Balance", "grammarly.com"),
  s("m365", "Microsoft 365 Business Premium", "$52+/mo", 17, "Balance", "microsoft.com"),
  s("gws", "Google Workspace Enterprise", "$45+/mo", 17, "Balance", "workspace.google.com"),
  s("gemini", "Google Gemini Advanced", "$20+/mo", 17, "Balance", "google.com"),
  s("copilot-ms", "Microsoft Copilot", "$30+/user/mo", 17, "Balance", "microsoft.com"),
  s("jasper", "Jasper Pro", "$49+/mo", 17, "Balance", "jasper.ai"),
  s("copyai", "Copy.ai Pro", "$36+/mo", 17, "Balance", "copy.ai"),
  s("miro", "Miro Business", "$16+/user/mo", 17, "Balance", "miro.com"),
  s("slack", "Slack Business+", "$12.50+/user/mo", 17, "Balance", "slack.com"),
  s("asana", "Asana Business", "$25+/user/mo", 17, "Balance", "asana.com"),
  s("monday", "monday.com Pro", "$16+/seat/mo", 17, "Balance", "monday.com"),
  s("clickup", "ClickUp Business", "$12+/user/mo", 17, "Balance", "clickup.com"),
  s("zapier", "Zapier Professional", "$29+/mo", 17, "Balance", "zapier.com"),
  s("make", "Make Teams", "$16+/mo", 17, "Balance", "make.com"),
  s("airtable", "Airtable Team", "$20+/user/mo", 17, "Balance", "airtable.com"),
  s("coda", "Coda Pro", "$10+/user/mo", 17, "Balance", "coda.io"),
  s("otter", "Otter.ai Pro", "$17+/mo", 17, "Balance", "otter.ai"),
  s("deepl", "DeepL Pro", "$8+/user/mo", 17, "Balance", "deepl.com"),
];

const CATEGORIES = [
  { key: "all", label: "All software", icon: LayoutGrid, items: [] as SoftItem[] },
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
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
})();

const BENEFITS = [
  "Company-sponsored premium software (role-based)",
  "Access to AI-powered productivity tools",
  "Professional development resources",
  "Remote work flexibility",
  "Career growth opportunities",
  "Performance-based bonuses",
  "Modern equipment and cloud-based tools",
  "Collaborative and innovative work environment",
];

export function EmployeeDiscountsShell() {
  const [tab, setTab] = useState<string>("all");
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
    return CATEGORIES.find((c) => c.key === tab)?.items || DEVELOPER;
  }, [tab]);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return baseItems;
    return baseItems.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.domain.toLowerCase().includes(q)
    );
  }, [baseItems, query]);

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
      title: "Employee Software Discounts | Unity Software Solutions",
      description:
        "Company-sponsored premium software for Unity employees. JetBrains, Adobe, ChatGPT, LinkedIn Sales Navigator and 80+ tools. Pay a fraction; Unity covers the rest.",
      path: "/employee-discounts",
      keywords:
        "employee software discounts, company sponsored JetBrains, Adobe Creative Cloud employee, Unity Software Solutions benefits, staff software subsidy Kenya",
    });
    // FAQ schema for SEO
    const id = "emp-discount-jsonld";
    document.getElementById(id)?.remove();
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Employee Software Discounts | Unity Software Solutions",
      description:
        "Company-sponsored premium software subscriptions for eligible Unity Software Solutions employees.",
      url: "https://www.unity-software.online/employee-discounts",
      isPartOf: {
        "@type": "WebSite",
        name: "Unity ERP",
        url: "https://www.unity-software.online",
      },
    });
    document.head.appendChild(script);
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
      await payWithPaystack({
        email: email.trim().toLowerCase(),
        amount: selected.employeePays,
        currency: "USD",
        planLabel: `Employee discount — ${selected.name}`,
        metadata: {
          product: "employee_software_discount",
          software: selected.name,
          role,
          account_email: accountEmail || email,
        },
      });
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Payment could not start");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Header />
      <main className="pt-24 pb-20">
        <section className="border-b border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-14 md:py-18">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Sparkles className="h-3.5 w-3.5" />
              Employee benefits
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Company-sponsored premium software
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              Eligible Unity team members work with industry tools for a fraction of
              retail cost. You contribute{" "}
              <strong className="text-slate-900">$17–$20 per month</strong> toward one
              approved subscription; Unity covers the rest.
            </p>
            <p className="mt-3 max-w-2xl text-sm text-slate-500">
              {ALL_SOFTWARE.length}+ tools listed across development, creative, sales,
              and AI. Availability depends on role and company policy. Retail prices change
              over time.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
            <label className="relative block w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search software…"
                className="w-full rounded-full border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </label>
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
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Retail {item.retail}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-emerald-700">
                          You pay ${item.employeePays}/mo
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
                  No tools match that search. Try another keyword.
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
                        Retail {selected.retail}
                      </p>
                      <p className="text-lg font-bold text-emerald-700">
                        ${selected.employeePays}
                        <span className="text-sm font-medium text-slate-500">
                          /month
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                <h2 className="text-base font-bold text-slate-950">
                  Request & pay employee share
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  We activate the sponsored seat on the account email you provide after
                  payment.
                </p>
                {selected && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        const url = `${window.location.origin}/employee-discounts?tool=${encodeURIComponent(selected.id)}`;
                        const text = `Unity employee software benefit: ${selected.name} — you pay $${selected.employeePays}/mo, Unity covers the rest.\n${url}`;
                        try {
                          if (navigator.share) {
                            await navigator.share({ title: selected.name, text, url });
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
                    <>Pay ${selected?.employeePays ?? 17} with Paystack</>
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
                  Eligible employees only. Approval may be required before seat activation.
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
            Software names and retail prices are illustrative. Final availability depends
            on Unity Software Solutions policy and vendor agreements.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
