# Recipai website

The public site for Recipai: a **home page**, a **privacy policy** and
**terms of service**, in one small React app that is built to plain static
HTML. It exists to host the pages Google asks for when an app uses Google
sign-in (a homepage, a privacy policy and, optionally, terms), and to give
the app a home. The look is the app's: same tokens, fonts and
illustrations (`docs/DESIGN.md`), light and dark following the system.

Free software like the rest of the repository: **GPL-3.0-or-later**
(see `../LICENSE`). Nothing here sets a cookie, runs analytics, or loads a
font, script or image from another site; the three fonts are served from
`public/fonts` under the SIL Open Font License (licenses alongside them).

## Pages

| Route | File | What |
|---|---|---|
| `/` | `src/pages/Home.tsx` | What Recipai is and does, the optional Drive backup (with Google's Limited Use statement), privacy at a glance, open source, how to install |
| `/privacy/` | `src/pages/Privacy.tsx` | The privacy policy, written against what the app actually does |
| `/terms/` | `src/pages/Terms.tsx` | The terms of service |
| `/404.html` | `src/pages/NotFound.tsx` | Not found (static hosts serve it for unknown paths) |

`src/config.ts` holds the facts the pages state (repository and release
links, license, contact, "last updated"). **The policy text must match the
app.** If a change to the app alters what data it handles or where it
sends it, update `src/pages/Privacy.tsx` and `policyUpdated` in the same
change (`docs/SYSTEM_STATE.md` is the source of truth for what the app does).

## Develop

Node 20+ (built with 22).

```
cd website
npm ci
npm run dev        # http://localhost:5173
npm run typecheck
```

## Build

```
npm run build      # typecheck, client build, server build, prerender -> dist/
npm run preview    # serve dist/ locally
```

`dist/` is the whole site: `index.html`, `privacy/index.html`,
`terms/index.html`, `404.html`, `robots.txt`, `assets/`, `fonts/`,
`favicon.svg`. Every page is **prerendered** (`scripts/prerender.mjs`), so it
reads fine without JavaScript and to crawlers, such as Google's reviewers.
The React code then takes over for instant in-site navigation and the
interactive scale demo on the home page.

Optional environment variables for the build:

| Variable | Default | Use |
|---|---|---|
| `SITE_URL` | empty | The public address, e.g. `https://recipai.example.org` (no trailing slash). Adds canonical links, `og:url`, `sitemap.xml` and the sitemap line in `robots.txt` |
| `SITE_BASE` | `/` | The path the site is served from. `/recipai/` for a GitHub Pages project site |

## Host it

It is plain static files, so anything works. Whichever you pick, serve it
over **HTTPS** on a domain you control and make sure `/privacy/` and
`/terms/` are reachable by anyone without signing in.

- **Cloudflare Pages / Netlify / Vercel:** connect the repository, root
  directory `website`, build command `npm run build`, output `dist`. Set
  `SITE_URL` to your address.
- **GitHub Pages:** the `Website` workflow (`.github/workflows/website.yml`)
  builds the site and attaches `recipai-website` as an artifact; publish its
  contents with your Pages setup. A project site needs `SITE_BASE=/recipai/`.
- **Any server:** copy `dist/` to its web root. Unknown paths should return
  `404.html`.

For Google OAuth the site needs a custom domain that you can verify in Google
Search Console; see "Publishing the OAuth consent screen" in
`docs/RELEASING.md`.

## Before you submit it to Google

1. Check the contact on the policy pages. By default the pages point to the
   repository's GitHub issues; to also show an email address, set
   `contactEmail` in `src/config.ts` (it becomes public).
2. Have the text read by someone who can give legal advice if that matters
   to you. It is written in good faith from how the app works, not by a
   lawyer; the terms name no governing law or court.
3. Rebuild with `SITE_URL` set and deploy.
