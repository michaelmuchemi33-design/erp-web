import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupWizard } from "@/components/SignupWizard";
import { PageBanner } from "@/components/PageBanner";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  Briefcase,
  ArrowRight,
  Video,
  Headset,
  Check,
  Sparkles,
} from "lucide-react";

const EMAIL = "erpintergration@gmail.com";
const APPLY = `mailto:${EMAIL}?subject=`;

const jobs = [
  {
    id: "video-editor",
    title: "Video Editor",
    type: "Full-time / Contract",
    location: "Kenya · Remote-friendly (East Africa)",
    icon: Video,
    summary:
      "Create engaging videos for marketing, tutorials, product launches, and social media campaigns for Unity ERP and Unity Software Solutions.",
    responsibilities: [
      "Edit marketing, tutorial and product launch videos",
      "Produce short-form content for social and ads",
      "Color grade and sound-design to a clean SaaS standard",
      "Collaborate with marketing on scripts and storyboards",
      "Maintain a consistent brand look across all video assets",
    ],
    requirements: [
      "Proven editing work (Showreel or portfolio required)",
      "Comfortable with Premiere Pro, Final Cut, or DaVinci Resolve",
      "Strong sense of pacing, typography on video, and motion",
      "Ability to turn around campaign assets quickly",
    ],
  },
  {
    id: "sales-executive",
    title: "Sales Executive",
    type: "Full-time",
    location: "Kenya · South Africa · Egypt (hybrid)",
    icon: Headset,
    summary:
      "Help businesses discover Unity ERP, build relationships, and grow our customer base across manufacturing, retail, and services.",
    responsibilities: [
      "Own outbound and inbound pipeline for Unity ERP",
      "Run demos and discovery calls with decision makers",
      "Manage CRM deals from lead to close",
      "Partner with support on smooth onboarding handoffs",
      "Hit monthly acquisition and revenue targets",
    ],
    requirements: [
      "2+ years B2B or SaaS sales experience preferred",
      "Confident on calls and in writing",
      "Comfort explaining software value (ERP/CRM a plus)",
      "Based in or willing to cover Kenya, South Africa or Egypt markets",
    ],
  },
];

export function CareersPageShell() {
  const [signupOpen, setSignupOpen] = useState(false);

  useEffect(() => {
    document.title =
      "Careers — Now Hiring Video Editor & Sales Executive | Unity Software Solutions";
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      desc.setAttribute("name", "description");
      document.head.appendChild(desc);
    }
    desc.setAttribute(
      "content",
      "Unity Software Solutions is hiring. Apply for Video Editor and Sales Executive roles. Build the future of Unity ERP across Kenya, South Africa and Egypt. Now hiring."
    );
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement("meta");
      keywords.setAttribute("name", "keywords");
      document.head.appendChild(keywords);
    }
    keywords.setAttribute(
      "content",
      "Unity Software Solutions careers, now hiring, video editor job Kenya, sales executive ERP jobs, Unity ERP jobs, SaaS jobs East Africa, hiring video editor, hiring sales executive"
    );

    // JSON-LD JobPosting for Google Jobs
    const existing = document.getElementById("job-jsonld");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "job-jsonld";
    script.type = "application/ld+json";
    script.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: "Video Editor",
        description:
          "Create engaging videos for marketing, tutorials, product launches, and social media campaigns for Unity ERP.",
        datePosted: "2026-08-03",
        employmentType: "FULL_TIME",
        hiringOrganization: {
          "@type": "Organization",
          name: "Unity Software Solutions",
          sameAs: "https://www.unity-software.online",
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressCountry: "KE",
            addressRegion: "Kenya",
          },
        },
        applicantLocationRequirements: {
          "@type": "Country",
          name: "Kenya",
        },
        directApply: true,
        url: "https://www.unity-software.online/careers#video-editor",
      },
      {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: "Sales Executive",
        description:
          "Help businesses discover Unity ERP, build relationships, and grow our customer base.",
        datePosted: "2026-08-03",
        employmentType: "FULL_TIME",
        hiringOrganization: {
          "@type": "Organization",
          name: "Unity Software Solutions",
          sameAs: "https://www.unity-software.online",
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressCountry: "KE",
            addressRegion: "Kenya",
          },
        },
        url: "https://www.unity-software.online/careers#sales-executive",
        directApply: true,
      },
    ]);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950">
      <Header onOpenSignup={() => setSignupOpen(true)} />
      <main>
        <div className="pt-16">
          {/* Premium hero — image generated + fallback gradient */}
          <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-white via-emerald-50/40 to-white">
            <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />

            <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <Sparkles className="h-3.5 w-3.5" />
                  Now hiring
                </span>
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
                  Join Our Team
                </h1>
                <p className="mt-3 text-lg text-slate-600 md:text-xl">
                  Build the Future With Us
                </p>
                <p className="mx-auto mt-4 max-w-2xl text-slate-500">
                  Unity Software Solutions is hiring talent to grow Unity ERP —
                  creative storytellers and sales leaders across Kenya, South Africa and Egypt.
                </p>
              </motion.div>

              {/* Two hiring cards in hero */}
              <div className="mt-12 grid gap-5 md:grid-cols-2">
                {jobs.map((job, i) => (
                  <motion.a
                    key={job.id}
                    href={`#${job.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="group rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg md:p-8"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <job.icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-950">{job.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {job.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 group-hover:gap-2">
                      View role <ArrowRight className="h-4 w-4" />
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Open roles detail */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-3xl space-y-14 px-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Open positions
              </h2>
              <p className="mt-2 text-slate-600">
                Apply by email with your CV and a short note. We reply to every serious application.
              </p>
            </div>

            {jobs.map((job) => (
              <article
                key={job.id}
                id={job.id}
                className="scroll-mt-28 rounded-3xl border border-slate-100 bg-slate-50/50 p-6 md:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-950">{job.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium text-slate-500">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 ring-1 ring-slate-100">
                        <Briefcase className="h-3.5 w-3.5" />
                        {job.type}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 ring-1 ring-slate-100">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-emerald-800 ring-1 ring-emerald-100">
                        <Clock className="h-3.5 w-3.5" />
                        Now hiring
                      </span>
                    </div>
                  </div>
                  <a
                    href={`${APPLY}Application%20—%20${encodeURIComponent(job.title)}`}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Apply now
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <p className="mt-5 text-slate-600 leading-relaxed">{job.summary}</p>

                <h4 className="mt-6 text-sm font-bold uppercase tracking-wider text-slate-400">
                  Responsibilities
                </h4>
                <ul className="mt-3 space-y-2">
                  {job.responsibilities.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      {r}
                    </li>
                  ))}
                </ul>

                <h4 className="mt-6 text-sm font-bold uppercase tracking-wider text-slate-400">
                  Requirements
                </h4>
                <ul className="mt-3 space-y-2">
                  {job.requirements.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      {r}
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            <div className="rounded-3xl bg-slate-950 p-8 text-center text-white">
              <h3 className="text-xl font-bold">Don&apos;t see your role?</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-300">
                Send an open application to{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-amber-300 underline-offset-2 hover:underline"
                >
                  {EMAIL}
                </a>
                . We hire exceptional people year-round.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
