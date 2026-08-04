import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupWizard } from "@/components/SignupWizard";
import { setPageMeta, trimDesc, trimTitle } from "@/lib/pageMeta";
import {
  Sparkles,
  MapPin,
  Clock,
  MessageCircle,
  Mail,
  ExternalLink,
  Check,
  Laptop,
  Brain,
  Palette,
  PenTool,
  Video,
  Headset,
  HeartHandshake,
  Megaphone,
  Search,
  Server,
  Bug,
  Layout,
} from "lucide-react";

const WA = "https://wa.me/254778903044";
const APPLY_EMAIL = "mykenyan254@gmail.com";
const APPLY_EMAIL_2 = "developerunityerp@proton.me";
const SITE = "https://www.unity-software.online";
const LOGO = "https://i.postimg.cc/qBnzqpqk/blck-logo-erp.png";

type Job = {
  id: string;
  title: string;
  summary: string;
  requirements: string[];
  tool: {
    name: string;
    retail: string;
    employeePays: number;
    unityCovers: string;
    note: string;
  };
  icon: typeof Laptop;
  employmentType: "FULL_TIME";
  occupationalCategory?: string;
};

const JOBS: Job[] = [
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    summary:
      "Build and maintain Unity ERP, APIs, integrations, and cloud infrastructure.",
    requirements: [
      "Experience with React, TypeScript, Node.js or similar",
      "Knowledge of Git and REST APIs",
      "Strong problem-solving skills",
      "Good communication skills",
    ],
    tool: {
      name: "JetBrains All Products Pack",
      retail: "$89/month",
      employeePays: 17,
      unityCovers: "$72/month",
      note: "Professional IDEs for software development",
    },
    icon: Laptop,
    employmentType: "FULL_TIME",
    occupationalCategory: "15-1252.00",
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    summary:
      "Develop AI assistants, automation workflows, and intelligent ERP features.",
    requirements: [
      "Python",
      "AI APIs",
      "Machine learning fundamentals",
      "Prompt engineering",
    ],
    tool: {
      name: "Claude Max",
      retail: "$100/month",
      employeePays: 20,
      unityCovers: "$80/month",
      note: "Enterprise AI assistant for advanced development",
    },
    icon: Brain,
    employmentType: "FULL_TIME",
    occupationalCategory: "15-2051.00",
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    summary: "Design modern interfaces and improve user experience across Unity ERP.",
    requirements: ["Figma", "Design systems", "Wireframing", "Prototyping"],
    tool: {
      name: "Adobe Creative Cloud",
      retail: "$69.99/month",
      employeePays: 17,
      unityCovers: "$52.99/month",
      note: "Creative suite for product design assets",
    },
    icon: Palette,
    employmentType: "FULL_TIME",
    occupationalCategory: "27-1024.00",
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    summary:
      "Create branding, marketing materials, social media graphics, and illustrations.",
    requirements: [
      "Portfolio required",
      "Photoshop experience",
      "Illustrator experience",
    ],
    tool: {
      name: "Adobe Creative Cloud",
      retail: "$69.99/month",
      employeePays: 17,
      unityCovers: "$52.99/month",
      note: "Full creative suite for brand and marketing",
    },
    icon: PenTool,
    employmentType: "FULL_TIME",
    occupationalCategory: "27-1024.00",
  },
  {
    id: "video-editor",
    title: "Video Editor",
    summary:
      "Create marketing videos, tutorials, advertisements, and product demonstrations.",
    requirements: [
      "Adobe Premiere Pro",
      "Storytelling skills",
      "Motion graphics",
    ],
    tool: {
      name: "Adobe Creative Cloud",
      retail: "$69.99/month",
      employeePays: 17,
      unityCovers: "$52.99/month",
      note: "Editing, motion, and creative production",
    },
    icon: Video,
    employmentType: "FULL_TIME",
    occupationalCategory: "27-4032.00",
  },
  {
    id: "sales-executive",
    title: "Sales Executive",
    summary: "Sell ERP, CRM, POS, and cloud software to growing businesses.",
    requirements: [
      "Good communication",
      "Sales skills",
      "Computer literacy",
    ],
    tool: {
      name: "LinkedIn Sales Navigator Advanced",
      retail: "$99.99/month",
      employeePays: 20,
      unityCovers: "$79.99/month",
      note: "Prospecting and outreach for B2B sales",
    },
    icon: Headset,
    employmentType: "FULL_TIME",
    occupationalCategory: "41-3091.00",
  },
  {
    id: "customer-success",
    title: "Customer Success Specialist",
    summary: "Help customers onboard and support Unity ERP users.",
    requirements: [
      "Customer service experience",
      "Communication skills",
      "Problem solving",
    ],
    tool: {
      name: "Zendesk Suite Professional",
      retail: "Approximately $115/month",
      employeePays: 20,
      unityCovers: "Approximately $95/month",
      note: "Support inbox and customer success workflows",
    },
    icon: HeartHandshake,
    employmentType: "FULL_TIME",
    occupationalCategory: "43-4051.00",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Specialist",
    summary: "Manage advertising campaigns and grow our online presence.",
    requirements: ["Meta Ads", "Google Ads", "Campaign management"],
    tool: {
      name: "Semrush Guru",
      retail: "Approximately $250/month",
      employeePays: 20,
      unityCovers: "Approximately $230/month",
      note: "SEO, competitive research, and campaign intelligence",
    },
    icon: Megaphone,
    employmentType: "FULL_TIME",
    occupationalCategory: "13-1161.00",
  },
  {
    id: "seo-content-writer",
    title: "SEO & Content Writer",
    summary: "Write blogs, landing pages, and documentation for Unity ERP.",
    requirements: [
      "SEO knowledge",
      "Excellent writing skills",
      "Keyword research",
    ],
    tool: {
      name: "Ahrefs Standard",
      retail: "Approximately $249/month",
      employeePays: 20,
      unityCovers: "Approximately $229/month",
      note: "Keyword research and content performance",
    },
    icon: Search,
    employmentType: "FULL_TIME",
    occupationalCategory: "27-3043.00",
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    summary: "Maintain servers, deployments, backups, and security.",
    requirements: ["Linux", "Docker", "CI/CD", "Cloud platforms"],
    tool: {
      name: "Docker Business",
      retail: "Approximately $24/user/month",
      employeePays: 17,
      unityCovers: "Approximately $7/month",
      note: "Container tooling for reliable deployments",
    },
    icon: Server,
    employmentType: "FULL_TIME",
    occupationalCategory: "15-1244.00",
  },
  {
    id: "qa-engineer",
    title: "QA Engineer",
    summary: "Test Unity ERP before every release.",
    requirements: [
      "Manual testing",
      "API testing",
      "Attention to detail",
    ],
    tool: {
      name: "BrowserStack Team Plan",
      retail: "Approximately $58/month",
      employeePays: 17,
      unityCovers: "Approximately $41/month",
      note: "Cross-browser and device testing",
    },
    icon: Bug,
    employmentType: "FULL_TIME",
    occupationalCategory: "15-1253.00",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    summary: "Lead product strategy and feature planning for Unity ERP.",
    requirements: ["Leadership", "Agile", "Product planning"],
    tool: {
      name: "Jira Premium",
      retail: "Approximately $47/month",
      employeePays: 17,
      unityCovers: "Approximately $30/month",
      note: "Roadmaps, issues, and agile delivery",
    },
    icon: Layout,
    employmentType: "FULL_TIME",
    occupationalCategory: "11-2021.00",
  },
];

function applyMailto(role: string) {
  const subject = encodeURIComponent(`Application — ${role} | Unity Software Solutions`);
  const body = encodeURIComponent(
    `Hello Unity Software Solutions,\n\nI would like to apply for the ${role} role.\n\nName:\nPhone:\nLocation:\nPortfolio / LinkedIn:\n\nBrief introduction:\n\nThank you.`
  );
  return `mailto:${APPLY_EMAIL}?cc=${APPLY_EMAIL_2}&subject=${subject}&body=${body}`;
}

function applyWhatsApp(role: string) {
  const text = encodeURIComponent(
    `Hello Unity Software Solutions — I want to apply for *${role}*.\n\nName:\nEmail:\nLocation:\nPortfolio/LinkedIn:\n\nShort intro:`
  );
  return `${WA}?text=${text}`;
}

function jobDescriptionHtml(job: Job) {
  const reqs = job.requirements.map((r) => `<li>${r}</li>`).join("");
  return `<p>${job.summary}</p>
<p><strong>Location:</strong> Remote · <strong>Employment:</strong> Full-time</p>
<p><strong>Requirements:</strong></p><ul>${reqs}</ul>
<p><strong>Required premium tool (company-sponsored):</strong> ${job.tool.name}. Retail ${job.tool.retail}. Employee contributes $${job.tool.employeePays}/month. Unity covers ${job.tool.unityCovers}. ${job.tool.note}</p>
<p>Apply via WhatsApp +254 778 903 044 or email ${APPLY_EMAIL}. Careers: ${SITE}/careers#${job.id}</p>`;
}

export function CareersPageShell() {
  const [signupOpen, setSignupOpen] = useState(false);

  useEffect(() => {
    setPageMeta({
      title: trimTitle(
        "Careers — Now Hiring | Unity Software Solutions Jobs Kenya"
      ),
      description: trimDesc(
        "Unity Software Solutions is hiring Full Stack Developer, AI Engineer, UI/UX, Video Editor, Sales, SEO, DevOps and more. Remote full-time. Apply WhatsApp +254778903044."
      ),
      path: "/careers",
      keywords:
        "Unity Software Solutions careers, jobs Kenya, hiring developer Kenya, ERP jobs, remote SaaS jobs East Africa, video editor job, sales executive job, AI engineer Kenya, now hiring",
    });
    window.scrollTo(0, 0);

    const existing = document.getElementById("job-jsonld");
    if (existing) existing.remove();

    const org = {
      "@type": "Organization",
      name: "Unity Software Solutions",
      sameAs: SITE,
      logo: LOGO,
      url: SITE,
      email: APPLY_EMAIL,
      telephone: "+254778903044",
    };
    const place = {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressRegion: "Nairobi",
        addressCountry: "KE",
      },
    };

    const graph = JOBS.map((job) => ({
      "@type": "JobPosting",
      title: job.title,
      description: jobDescriptionHtml(job),
      identifier: {
        "@type": "PropertyValue",
        name: "Unity Software Solutions",
        value: `USS-${job.id.toUpperCase()}`,
      },
      datePosted: "2026-08-04",
      validThrough: "2026-12-31T23:59:59+03:00",
      employmentType: job.employmentType,
      hiringOrganization: org,
      jobLocation: place,
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: {
        "@type": "Country",
        name: "Kenya",
      },
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          value: job.tool.employeePays,
          unitText: "MONTH",
        },
      },
      // Note: baseSalary above is the employee tool contribution signal;
      // role compensation is discussed during hiring.
      directApply: true,
      url: `${SITE}/careers#${job.id}`,
      industry: "Software",
      occupationalCategory: job.occupationalCategory,
    }));

    const script = document.createElement("script");
    script.id = "job-jsonld";
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": graph,
    });
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950">
      <Header onOpenSignup={() => setSignupOpen(true)} />
      <main>
        <div className="pt-16">
          <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-white via-emerald-50/40 to-white">
            <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
            <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <Sparkles className="h-3.5 w-3.5" />
                  Now hiring · {JOBS.length} open roles
                </span>
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
                  Careers at Unity Software Solutions
                </h1>
                <p className="mt-3 text-lg text-slate-600 md:text-xl">
                  Build the future of Unity ERP — remote full-time roles
                </p>
                <p className="mx-auto mt-4 max-w-2xl text-slate-500">
                  Apply by WhatsApp or email. Every full-time role includes one
                  company-sponsored premium tool — you contribute only $17–$20/month.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a
                    href={WA}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white hover:bg-emerald-500"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp +254 778 903 044
                  </a>
                  <a
                    href={`mailto:${APPLY_EMAIL}`}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    <Mail className="h-4 w-4" />
                    {APPLY_EMAIL}
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Premium benefit callout */}
          <section className="border-b border-slate-100 bg-slate-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
              <h2 className="text-xl font-bold md:text-2xl">
                Premium software benefit
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
                Every full-time employee receives access to professional software
                sponsored by Unity. Employees contribute only{" "}
                <strong className="text-white">$17–$20 per month</strong> toward one
                role-specific premium subscription, while Unity covers the remaining
                cost — the same model used by established technology teams.
              </p>
              <a
                href="/employee-discounts"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
              >
                See employee discounts
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </section>

          {/* Role grid */}
          <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              Open positions
            </h2>
            <p className="mt-2 text-slate-600">
              Remote · Full-time · Apply via WhatsApp or email
            </p>

            <div className="mt-10 space-y-8">
              {JOBS.map((job) => {
                const Icon = job.icon;
                return (
                  <article
                    key={job.id}
                    id={job.id}
                    className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
                  >
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-950">
                              {job.title}
                            </h3>
                            <div className="mt-1 flex flex-wrap gap-3 text-xs font-medium text-slate-500">
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" /> Remote
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" /> Full-time
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="mt-4 text-slate-600">{job.summary}</p>
                        <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                          Requirements
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {job.requirements.map((r) => (
                            <li
                              key={r}
                              className="flex gap-2 text-sm text-slate-700"
                            >
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="w-full shrink-0 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 md:w-72">
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                          Required premium tool
                        </p>
                        <p className="mt-2 text-base font-bold text-slate-950">
                          {job.tool.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">{job.tool.note}</p>
                        <dl className="mt-4 space-y-1.5 text-sm">
                          <div className="flex justify-between gap-2">
                            <dt className="text-slate-500">Retail</dt>
                            <dd className="font-medium text-slate-800">
                              {job.tool.retail}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-2">
                            <dt className="text-slate-500">You pay</dt>
                            <dd className="font-bold text-emerald-700">
                              ${job.tool.employeePays}/mo
                            </dd>
                          </div>
                          <div className="flex justify-between gap-2">
                            <dt className="text-slate-500">Unity covers</dt>
                            <dd className="font-medium text-slate-800">
                              {job.tool.unityCovers}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
                      <a
                        href={applyWhatsApp(job.title)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white hover:bg-emerald-500"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Apply on WhatsApp
                      </a>
                      <a
                        href={applyMailto(job.title)}
                        className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                      >
                        <Mail className="h-4 w-4" />
                        Email {APPLY_EMAIL}
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="border-t border-slate-100 bg-slate-50">
            <div className="mx-auto max-w-3xl px-6 py-14 text-center">
              <h2 className="text-2xl font-bold text-slate-950">How to apply</h2>
              <p className="mt-3 text-slate-600">
                Send your name, role, CV or portfolio link, and a short intro on
                WhatsApp or email. No long form required — we reply quickly.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={WA}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <MessageCircle className="h-4 w-4" />
                  +254 778 903 044
                </a>
                <a
                  href={`mailto:${APPLY_EMAIL}`}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold"
                >
                  <Mail className="h-4 w-4" />
                  {APPLY_EMAIL}
                </a>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Also: {APPLY_EMAIL_2}
              </p>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
      <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
