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
} from "lucide-react";

type SoftItem = {
  id: string;
  name: string;
  retail: string;
  employeePays: number; // USD
  covers: string;
  logo: string;
  domain: string;
};

const DEVELOPER: SoftItem[] = [
  { id: "jetbrains", name: "JetBrains All Products Pack", retail: "$89/mo", employeePays: 17, covers: "$72", logo: "https://logo.clearbit.com/jetbrains.com", domain: "jetbrains.com" },
  { id: "adobe-dev", name: "Adobe Creative Cloud All Apps", retail: "$69.99/mo", employeePays: 17, covers: "$52.99", logo: "https://logo.clearbit.com/adobe.com", domain: "adobe.com" },
  { id: "github", name: "GitHub Enterprise", retail: "$39/user/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/github.com", domain: "github.com" },
  { id: "postman", name: "Postman Enterprise", retail: "$45+/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/postman.com", domain: "postman.com" },
  { id: "docker", name: "Docker Business", retail: "$24/user/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/docker.com", domain: "docker.com" },
  { id: "mongodb", name: "MongoDB Atlas Professional", retail: "$57+/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/mongodb.com", domain: "mongodb.com" },
  { id: "azure", name: "Azure DevOps Premium", retail: "$52+/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/microsoft.com", domain: "azure.microsoft.com" },
];

const VIDEO: SoftItem[] = [
  { id: "adobe-video", name: "Adobe Creative Cloud All Apps", retail: "$69.99/mo", employeePays: 17, covers: "$52.99", logo: "https://logo.clearbit.com/adobe.com", domain: "adobe.com" },
  { id: "envato", name: "Envato Elements", retail: "$39/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/envato.com", domain: "envato.com" },
  { id: "motionarray", name: "Motion Array Unlimited", retail: "$50+/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/motionarray.com", domain: "motionarray.com" },
  { id: "artlist", name: "Artlist Max", retail: "$59.99/mo", employeePays: 17, covers: "$42.99", logo: "https://logo.clearbit.com/artlist.io", domain: "artlist.io" },
  { id: "storyblocks", name: "Storyblocks Unlimited", retail: "$65+/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/storyblocks.com", domain: "storyblocks.com" },
  { id: "epidemic", name: "Epidemic Sound Commercial", retail: "$49/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/epidemicsound.com", domain: "epidemicsound.com" },
  { id: "runway", name: "Runway AI Unlimited", retail: "$76+/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/runwayml.com", domain: "runwayml.com" },
];

const SALES: SoftItem[] = [
  { id: "linkedin", name: "LinkedIn Sales Navigator Advanced", retail: "$99.99/mo", employeePays: 20, covers: "$79.99", logo: "https://logo.clearbit.com/linkedin.com", domain: "linkedin.com" },
  { id: "apollo", name: "Apollo.io Professional", retail: "$79/mo", employeePays: 17, covers: "$62", logo: "https://logo.clearbit.com/apollo.io", domain: "apollo.io" },
  { id: "zoom", name: "Zoom Workplace Business", retail: "$50+/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/zoom.us", domain: "zoom.us" },
  { id: "hubspot", name: "HubSpot Sales Professional", retail: "$90+/mo", employeePays: 20, covers: "Balance", logo: "https://logo.clearbit.com/hubspot.com", domain: "hubspot.com" },
  { id: "salesforce", name: "Salesforce Professional", retail: "$100+/mo", employeePays: 20, covers: "Balance", logo: "https://logo.clearbit.com/salesforce.com", domain: "salesforce.com" },
  { id: "calendly", name: "Calendly Teams", retail: "$50+/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/calendly.com", domain: "calendly.com" },
  { id: "seamless", name: "Seamless.AI Pro", retail: "$147+/mo", employeePays: 20, covers: "Balance", logo: "https://logo.clearbit.com/seamless.ai", domain: "seamless.ai" },
];

const AI: SoftItem[] = [
  { id: "chatgpt", name: "ChatGPT Team", retail: "$30/user/mo", employeePays: 17, covers: "$13", logo: "https://logo.clearbit.com/openai.com", domain: "openai.com" },
  { id: "claude", name: "Claude Max", retail: "$100+/mo", employeePays: 20, covers: "Balance", logo: "https://logo.clearbit.com/anthropic.com", domain: "anthropic.com" },
  { id: "perplexity", name: "Perplexity Enterprise Pro", retail: "$40+/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/perplexity.ai", domain: "perplexity.ai" },
  { id: "notion", name: "Notion Enterprise", retail: "$50+/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/notion.so", domain: "notion.so" },
  { id: "grammarly", name: "Grammarly Business", retail: "$45+/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/grammarly.com", domain: "grammarly.com" },
  { id: "m365", name: "Microsoft 365 Business Premium", retail: "$52+/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/microsoft.com", domain: "microsoft.com" },
  { id: "gws", name: "Google Workspace Enterprise", retail: "$45+/mo", employeePays: 17, covers: "Balance", logo: "https://logo.clearbit.com/google.com", domain: "workspace.google.com" },
];

const CATEGORIES = [
  { key: "developers", label: "For Developers", icon: Laptop, items: DEVELOPER },
  { key: "video", label: "For Video Editors", icon: Video, items: VIDEO },
  { key: "sales", label: "For Sales Professionals", icon: Headset, items: SALES },
  { key: "ai", label: "AI & Productivity (All)", icon: Brain, items: AI },
] as const;

const BENEFITS = [
  "Company-sponsored premium software",
  "Access to AI-powered productivity tools",
  "Professional development resources",
  "Remote work flexibility",
  "Career growth opportunities",
  "Performance-based bonuses",
  "Modern equipment and cloud-based tools",
  "Collaborative and innovative work environment",
];

export function EmployeeDiscountsShell() {
  const [tab, setTab] = useState<(typeof CATEGORIES)[number]["key"]>("developers");
  const [selected, setSelected] = useState<SoftItem | null>(DEVELOPER[0]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Developer");
  const [accountEmail, setAccountEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const items = useMemo(
    () => CATEGORIES.find((c) => c.key === tab)?.items || DEVELOPER,
    [tab]
  );

  useEffect(() => {
    setPageMeta({
      title: "Employee Discounts | Premium Software Benefits",
      description:
        "Unity Software Solutions employee discounts: premium software for $17–$20/month. JetBrains, Adobe, ChatGPT, LinkedIn Sales Navigator and more.",
      path: "/employee-discounts",
      keywords:
        "employee discounts, company sponsored software, Unity Software Solutions benefits, JetBrains employee, Adobe Creative Cloud discount",
    });
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSelected(items[0] || null);
  }, [items]);

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
        {/* Banner */}
        <section className="border-b border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Sparkles className="h-3.5 w-3.5" />
              Premium employee benefits
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Employee discounts on world-class software
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              Work with the industry&apos;s best tools for a fraction of the cost. Unity
              sponsors premium subscriptions so eligible employees pay only{" "}
              <strong className="text-slate-900">$17–$20 per month</strong> while the
              company covers the majority of the cost.
            </p>
            <p className="mt-3 max-w-2xl text-sm text-slate-500">
              Availability depends on role and company policy. Listed retail prices may
              change over time; your employee contribution stays in the $17–$20 range for
              approved tools.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6 py-12">
          {/* Category tabs */}
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

          <div className="mt-10 grid gap-10 lg:grid-cols-5">
            {/* Catalog */}
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold text-slate-950">
                Company-sponsored premium software
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Select a tool to see the logo, pricing, and subscribe with your email.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
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
                          : "border-slate-150 border-slate-200 bg-white hover:border-emerald-200"
                      }`}
                    >
                      <img
                        src={item.logo}
                        alt=""
                        className="h-12 w-12 shrink-0 rounded-xl border border-slate-100 bg-white object-contain p-1.5"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://www.google.com/s2/favicons?domain=${item.domain}&sz=128`;
                        }}
                      />
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

              {/* Comparison table */}
              <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Software</th>
                      <th className="px-4 py-3 font-semibold">Retail</th>
                      <th className="px-4 py-3 font-semibold">You pay</th>
                      <th className="px-4 py-3 font-semibold">Unity covers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-t border-slate-100">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={item.logo}
                              alt=""
                              className="h-6 w-6 rounded object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  `https://www.google.com/s2/favicons?domain=${item.domain}&sz=64`;
                              }}
                            />
                            <span className="font-medium text-slate-800">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{item.retail}</td>
                        <td className="px-4 py-3 font-semibold text-emerald-700">
                          ${item.employeePays}
                        </td>
                        <td className="px-4 py-3 text-slate-600">{item.covers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Checkout card */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
                {selected && (
                  <div className="mb-5 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                    <img
                      src={selected.logo}
                      alt={selected.name}
                      className="h-14 w-14 rounded-xl border border-slate-100 bg-white object-contain p-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://www.google.com/s2/favicons?domain=${selected.domain}&sz=128`;
                      }}
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{selected.name}</p>
                      <p className="text-xs text-slate-500">Retail {selected.retail}</p>
                      <p className="text-lg font-bold text-emerald-700">
                        ${selected.employeePays}
                        <span className="text-sm font-medium text-slate-500">/month</span>
                      </p>
                    </div>
                  </div>
                )}

                <h3 className="text-base font-bold text-slate-950">
                  Request & pay employee share
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Submit your details, then pay ${selected?.employeePays ?? 17} via
                  Paystack. We will set up the sponsored seat on the account email you
                  provide.
                </p>

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
                      Pay ${selected?.employeePays ?? 17} with Paystack
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
                  Eligible employees only. Approval may be required before seat activation.
                  Documents and access instructions are emailed after payment confirmation.
                </div>
              </div>
            </div>
          </div>

          {/* Extra benefits */}
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
            Software names and retail prices are for illustration. Final availability and
            plan tiers depend on Unity Software Solutions policy and vendor agreements.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
