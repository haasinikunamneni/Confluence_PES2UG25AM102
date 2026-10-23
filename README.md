# Confluence — Static Website + Full-Stack-Ready Prototype

An Astro-powered, statically generated public Confluence event website with a cinematic night-to-dawn environment, plus separate participant and organizer demo screens backed by a local mock service. Official event details that have not been supplied remain clearly marked as placeholders.

## Stack and architecture

- **Astro 5, static output:** the public homepage is prerendered into HTML at build time (`src/pages/index.astro`). This is genuine static-site generation, not a client-rendered single-page app.
- **Layout:** `src/layouts/SiteLayout.astro` owns document metadata, canonical URL, Open Graph tags, and shared head assets.
- **Public interactions:** lightweight classic JavaScript in `public/js/main.js`; content/configuration is centralized in `public/js/content.js`. No client framework or hydration runtime is required.
- **Styles and assets:** `public/css/`, `public/assets/`, and `public/favicon.svg`. Fonts are bundled locally.
- **Supplementary demos:** `public/portal.html`, `public/register.html`, and `public/admin.html`, with demo operations in `public/js/mock.js`. These are intentionally separate from official public registration.
- **Persistence:** browser-local, versioned demo data only. No database is configured.

## Run on macOS

1. Extract the ZIP and open the `confluence-immersive-prototype` folder in VS Code.
2. Install Node.js (LTS) if it is not already installed.
3. Open Terminal in the project folder.
4. Install dependencies: `npm install`
5. Start the development server: `npm run dev`
6. Open the local URL printed by Astro (normally `http://localhost:4321`).
7. Build static production files: `npm run build`
8. Preview the production build: `npm run preview` and open the URL printed by Astro.

The deployable static output is written to `dist/`. The public site does not need a database, paid API, or email configuration.

## Required configuration before launch

| Item | File / value | Action |
|---|---|---|
| **Official Google Form** | `public/js/content.js` → `REGISTRATION_URL` | Replace `https://REPLACE-WITH-OFFICIAL-GOOGLE-FORM-URL` with the actual URL supplied by the organisers. All public **Register now** CTAs open this configured URL in a new tab. They do not route to the demo registration screen. Until supplied, the click displays a clear configuration message. |
| Canonical domain | `astro.config.mjs` → `site`; `src/layouts/SiteLayout.astro` → `site` | Replace `https://your-domain.example` with the confirmed public domain. |
| Sitemap and robots | `public/sitemap.xml`, `public/robots.txt` | Replace the placeholder domain after deployment. |
| Event facts | `public/js/content.js` → `FACTS`, `LOCATION` | Confirm dates, venue, eligibility and team size. `null` facts render as “To be announced”. |
| Official themes / roadmap / FAQs | `public/js/content.js` → `THEMES`, `ROADMAP`, `FAQS` | Replace sample copy only when organisers confirm it. Current themes and roadmap are placeholders, not official 2026 facts. |
| Brand and contacts | `public/js/content.js` → `CONTACT_EMAIL`, `SOCIAL_LINKS`; `src/pages/index.astro` brand text | Add only verified contact details, social links, or official logo assets. |
| Social preview image | `src/layouts/SiteLayout.astro` | Optionally add a 1200×630 Open Graph image and `og:image` metadata. |

## Deploy to Vercel or Netlify

1. Push the project to a Git repository.
2. Import the repository into Vercel or Netlify.
3. Set the build command to `npm run build` and output directory to `dist`. Astro is auto-detected by both hosts in most cases.
4. Set the confirmed domain in `astro.config.mjs`, `src/layouts/SiteLayout.astro`, `public/robots.txt`, and `public/sitemap.xml`; rebuild and deploy.
5. Replace the registration placeholder with the official Google Form URL before announcing the site.

No deployment URL or official form URL has been supplied, and this project has not been deployed by this package step.

## Public experience and interactions

- Home, About, Themes, Roadmap, FAQs and closing registration CTA.
- A fixed architectural SVG environment whose sun, cloud layers and lighting progress with scroll; motion is disabled/simplified for reduced-motion preferences.
- Keyboard-operable theme tabs and accessible FAQ disclosure interactions.
- Responsive layouts, semantic landmarks, focus styles, metadata, robots and sitemap files.
- No fabricated countdown: the event date is unconfirmed.

## Supplementary demo features and limits

- `portal.html`: local participant demo, draft team creation, simulated invitations, submission status and announcements.
- `admin.html`: team search/filter and simulated approve/request-changes/reject actions with reasons and announcement controls.
- `register.html`: supplementary local demo registration only. It is **not** the public Register now destination.
- Use the Reset demo data control to restore seeded state. Browser-local data survives refresh in the same browser profile but does not synchronize across devices.
- Password input is validation-only and must not be treated as authentication. Invitations do not send email. Organizer controls are not protected by server-side authorization.

For production, integrate a trusted backend (for example, a Supabase adapter), server-side authentication and authorization, persistent database storage, expiring invitation tokens, real email delivery, validation, and audit logging. The current mock service and browser storage are demonstration tools, not a security boundary.

## Project structure

```text
src/
  layouts/SiteLayout.astro
  pages/index.astro          # Astro prerendered public homepage
public/
  assets/                    # Local fonts and optimized WebP atmosphere layers
  css/                       # Design tokens, base, environment, sections
  js/content.js              # Central editable event configuration
  js/main.js                 # Lightweight public interactions
  js/mock.js                 # Local demo service/data adapter
  portal.html                # Supplementary participant prototype
  admin.html                 # Supplementary organizer prototype
  register.html              # Supplementary local demo registration
  robots.txt
  sitemap.xml
astro.config.mjs
package.json
README.md
```

## Verification notes

The ZIP can be integrity-checked independently. Run `npm install`, `npm run build`, and `npm run preview` to verify the generated output in your environment. Browser-level cross-browser testing and a real hosted deployment are not claimed here unless separately completed.

## Official chapter logo

The supplied IEEE Computer Society — PES University Student Branch Chapter logo is bundled locally at `public/assets/ieee-computer-society-pesu.png`. The same transparent PNG is used in the navigation, About section, and footer; the hero keeps **CONFLUENCE** as the primary event identity. The asset is loaded locally and does not require an external image service. Replace it only with an approved official source asset if the chapter provides one; do not redraw or recolor the mark.

## Cinematic eclipse loading screen

The public site includes a reusable `src/components/EclipseLoader.astro` overlay. It uses CSS-built lunar silhouettes and a restrained icy corona rather than a heavy image, canvas, video, or WebGL. The overlay dismisses when the page load and font readiness complete, with a short minimum display time to avoid a flash and a 4.5-second fail-open safeguard. It respects `prefers-reduced-motion`; the static eclipse remains visible until readiness. The loader is decorative (`aria-hidden`) and does not trap focus. No fake progress percentage is shown.


## Branded error screens

The reusable `src/components/ErrorScreen.astro` component provides the crescent-moon and storm visual system. Static error routes include `/404.html`, `/500.html`, `/network-error.html`, `/timeout.html`, `/unauthorized.html`, `/forbidden.html`, `/form-error.html`, and `/unavailable.html`. Unknown routes use Astro's generated 404 page. Retry controls reload the current page, which is appropriate for page/request recovery; form submissions should retry their own operation and preserve field values rather than blindly replaying a potentially non-idempotent request.

During local development only, open `/error-preview` and use its state links to inspect the variants. The preview is guarded by Astro's development environment and is not exposed as an interactive gallery in production. Error messages are deliberately generic and do not display stack traces or raw backend details. The demo registration flow stores only local prototype data; it is not a real server submission or authentication flow.

The error routes are statically generated. A static host cannot emit a true server-side HTTP 500 response from these HTML pages; configure the host's fallback/error routing as needed for deployment, and integrate server-side logging/error boundaries when a backend is introduced.

## Immersive worlds, archive, roadmap and announcements

The public site now includes statically generated theme-world routes (`/themes`, `/themes/ai-human-wellbeing`, `/themes/sustainable-futures`, `/themes/intelligence-beyond-earth`), archive routes (`/archive`, `/archive/2025`, `/archive/2024`), an interactive roadmap (`/roadmap`), and an announcement centre (`/announcements`). The theme and edition content is centralized in `src/data/worlds.ts`. The theme worlds and archive records are fictional demonstration concepts, not official themes or verified history. Replace them only with organiser-approved material and sources.

The `public/css/immersive.css` stylesheet scopes atmospheric treatment to the feature pages, leaving the global navigation, IEEE Computer Society branding and shared typography stable. `public/js/ripple.js` adds a lightweight circular transition to marked internal links, updates the actual URL through normal navigation, and skips the effect for reduced-motion users and modified clicks. Direct links and refresh work because routes are statically generated.

The roadmap's stages are examples with no invented dates. Their demo status is configured in `public/js/roadmap.js`; set actual dates and statuses only from confirmed event information. The announcement centre uses local browser storage for public demo announcements and read state. A seeded team-specific record is deliberately excluded from the public feed. The organizer publishing desk is a local demonstration only; it is not authenticated, secure, synchronized between users, or connected to email/push delivery. Real audience authorization must be enforced by a trusted backend before production use.

For production, test with `npm run build` and `npm run preview`. Configure `site` in `astro.config.mjs`, the canonical URL in the shared layout, and the official registration URL in `public/js/content.js` before deploying. Archive projects, winners, sponsors, dates and statistics remain unverified placeholders until approved sources are provided.

## Refinement pass: loading and layout

- The eclipse is no longer a blocking page-entry overlay. `src/components/EclipseLoader.astro` now installs lightweight feedback around actual `fetch()` requests: a compact indicator appears after 1 second, and a compact eclipse treatment appears after 2.8 seconds. Fast requests never show it; it clears on success or failure. It does not infer internet speed or insert artificial delays.
- Theme and archive ripple transitions remain separate from request feedback.
- Shared layout tokens (`--content-max`, `--gutter`, `--section-space`, `--card-pad`, `--grid-gap`) live in `public/css/tokens.css`; public section containers and immersive page grids reuse them.
- `astro.config.mjs` disables Astro's development toolbar, which is the likely source of the bottom floating development pill in the screenshot. This does not remove application notifications or diagnostics.
- The confirmed public Google Form and production domain remain placeholders until the official values are supplied.

### Verification notes for this refinement

The inline request-feedback script passes `node --check`, and source checks confirm the old page-blocking loader is no longer referenced and Astro's development toolbar is disabled. A fresh Astro production build and real browser viewport/request timing tests could not be run in this environment because dependency installation timed out. After extracting locally, run `npm install`, `npm run build`, and `npm run dev`; then verify the responsive theme pages and test with a genuinely slow request in DevTools Network throttling.

### Theme-world visual direction
The three fictional theme worlds use locally stored, optimized WebP crops derived from the supplied “Confluence: Futures in Focus” visual reference. The crop regions intentionally remove the reference's embedded typography so live page headings remain accessible HTML. Replace these local art assets with approved final artwork when available; the themes themselves remain fictional demonstration concepts, not official event themes.
