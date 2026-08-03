/**
 * Post-build: write crawlable HTML for each route (self-canonical, H1, body text).
 * Vercel serves /path/index.html for /path so bots see content without JS.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");
const pages = JSON.parse(
  fs.readFileSync(path.join(__dirname, "prerender-pages.json"), "utf8")
);

if (!fs.existsSync(dist)) {
  console.error("dist/ missing — run vite build first");
  process.exit(1);
}

const shell = fs.readFileSync(path.join(dist, "index.html"), "utf8");

// Extract asset tags from Vite build (script/link)
const headExtras = [];
const m = shell.match(/<head>([\s\S]*)<\/head>/i);
const headInner = m ? m[1] : "";
const assetTags = (headInner.match(/<(?:script|link)[^>]*>/gi) || [])
  .filter((t) => /src=|href=/.test(t) && !/canonical|preconnect|fonts\.google/.test(t))
  .join("\n    ");
const bodyScripts = (shell.match(/<script[^>]*src=[^>]*><\/script>/gi) || []).join(
  "\n    "
);

function pageHtml(p) {
  const url =
    p.path === "/"
      ? "https://www.unity-software.online/"
      : `https://www.unity-software.online${p.path}`;
  const title = (p.title || p.h1 || "Unity ERP").slice(0, 58);
  const desc = (p.description || p.intro || "").slice(0, 155);
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(desc)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(desc)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="website" />
    <link rel="icon" type="image/png" href="https://i.postimg.cc/qBnzqpqk/blck-logo-erp.png" />
    ${assetTags}
  </head>
  <body>
    <main id="prerender-content" style="max-width:48rem;margin:0 auto;padding:2rem 1.25rem;font-family:system-ui,sans-serif;color:#0f172a">
      <p style="font-size:0.75rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#059669">Unity ERP</p>
      <h1 style="font-size:2rem;line-height:1.2;margin:0.5rem 0 1rem">${escapeHtml(p.h1 || title)}</h1>
      <p style="font-size:1.05rem;line-height:1.65;color:#475569">${escapeHtml(p.intro || desc)}</p>
      <p style="font-size:1rem;line-height:1.65;color:#475569">${escapeHtml(desc)}</p>
      <p style="margin-top:1.5rem;font-size:0.95rem;line-height:1.6;color:#334155">
        Unity ERP by Unity Software Solutions is cloud ERP and CRM software for inventory, accounting,
        POS, manufacturing, HR and AI. Free trial available. Pricing from KES 3,000 per month or KES 33,000 per year.
        Serving businesses in Kenya, South Africa and Egypt.
      </p>
      <nav style="margin-top:2rem;display:flex;flex-wrap:wrap;gap:0.75rem">
        <a href="/">Home</a>
        <a href="/features">Features</a>
        <a href="/pricing">Pricing</a>
        <a href="/industries">Industries</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
        <a href="/careers">Careers</a>
      </nav>
    </main>
    <div id="root"></div>
    <script>
      // When SPA boots, remove static prerender block to avoid duplicate UI
      window.addEventListener("DOMContentLoaded", function () {
        var obs = new MutationObserver(function () {
          var root = document.getElementById("root");
          if (root && root.childNodes.length) {
            var pr = document.getElementById("prerender-content");
            if (pr) pr.style.display = "none";
            obs.disconnect();
          }
        });
        obs.observe(document.getElementById("root") || document.body, { childList: true, subtree: true });
      });
    </script>
    ${bodyScripts}
  </body>
</html>`;
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

let n = 0;
for (const p of pages) {
  const html = pageHtml(p);
  if (p.path === "/") {
    fs.writeFileSync(path.join(dist, "index.html"), html);
  } else {
    const dir = path.join(dist, p.path.replace(/^\//, ""));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html);
  }
  n++;
}

console.log(`Prerendered ${n} HTML pages for crawlers`);
# deploy 2026-08-03T12:54:09Z
