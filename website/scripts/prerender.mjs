// Turns the built single-page app into one static HTML file per page, so any
// static host can serve it with no server and no JavaScript needed to read it:
//   dist/index.html, dist/privacy/index.html, dist/terms/index.html, dist/404.html
// Run by `npm run build`, after the client build (dist/) and the server
// build (dist-ssr/). SITE_URL (e.g. https://recipai.example.org, no trailing
// slash) is optional; with it the pages get canonical links and a sitemap.
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssr = join(root, "dist-ssr");
const siteUrl = (process.env.SITE_URL ?? "").replace(/\/+$/, "");
const base = process.env.SITE_BASE || "/";

const { render, routes, notFound } = await import(pathToFileURL(join(ssr, "entry-server.js")).href);
const template = await readFile(join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-->") || !template.includes("<!--head-->")) {
  throw new Error("dist/index.html is missing the <!--app--> / <!--head--> markers");
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const urlFor = (path) => siteUrl + base.replace(/\/$/, "") + (path === "/" ? "/" : path + "/");

function head(route, { index }) {
  const lines = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<meta property="og:site_name" content="Recipai" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta name="twitter:card" content="summary" />`,
  ];
  if (!index) lines.push(`<meta name="robots" content="noindex" />`);
  if (index && siteUrl) {
    lines.push(`<link rel="canonical" href="${esc(urlFor(route.path))}" />`);
    lines.push(`<meta property="og:url" content="${esc(urlFor(route.path))}" />`);
  }
  if (route.path === "/") {
    const data = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Recipai",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Android 8.0+",
      description: route.description,
      license: "https://www.gnu.org/licenses/gpl-3.0.html",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      ...(siteUrl ? { url: urlFor("/") } : {}),
    };
    lines.push(`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`);
  }
  return lines.join("\n    ");
}

async function emit(file, route, path, opts) {
  const html = template.replace("<!--head-->", head(route, opts)).replace("<!--app-->", render(path));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  console.log("prerendered", file.slice(root.length + 1));
}

for (const route of routes) {
  const file = route.path === "/" ? join(dist, "index.html") : join(dist, route.path.slice(1), "index.html");
  await emit(file, route, route.path, { index: true });
}
await emit(join(dist, "404.html"), notFound, notFound.path, { index: false });

await writeFile(
  join(dist, "robots.txt"),
  ["User-agent: *", "Allow: /", ...(siteUrl ? [`Sitemap: ${urlFor("/").replace(/\/$/, "")}/sitemap.xml`] : [])].join("\n") + "\n",
);
if (siteUrl) {
  const urls = routes.map((r) => `  <url><loc>${esc(urlFor(r.path))}</loc></url>`).join("\n");
  await writeFile(
    join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
}
await rm(ssr, { recursive: true, force: true });
