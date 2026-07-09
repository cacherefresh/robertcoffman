# Running & Deploying CACHE_REFRESH

## Requirements

- Node.js 20+
- npm 10+

## 1. Run locally (development)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server hot-reloads on save.

## 2. Run locally (production build)

Builds and serves the optimized production bundle, same as what `next start` would run on a server:

```bash
npm install
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## 3. Host on GitHub Pages with a custom domain

GitHub Pages only serves static files, so the site is built as a static
export (`output: "export"` in [next.config.ts](next.config.ts), gated behind
the `GITHUB_PAGES=true` env var so local dev/build is unaffected). It's
served at the custom domain root — `robertcoffman.cacherefresh.io` — via a
[public/CNAME](public/CNAME) file, so there's no `/robertcoffman` basePath.

### One-time DNS setup

In your DNS management for `cacherefresh.io`, add a CNAME record
(the same pattern you already used for `guilds.cacherefresh.io`):

| Type  | Name          | Value                  | TTL       |
|-------|---------------|-------------------------|-----------|
| CNAME | `robertcoffman` | `cacherefresh.github.io` | 1 hour (default) |

This makes `robertcoffman.cacherefresh.io` resolve to your GitHub Pages
site. DNS changes can take anywhere from a few minutes to a few hours to
propagate.

### One-time GitHub repo setup

1. Push this repo to GitHub (already done: `cacherefresh/robertcoffman`).
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Under **Custom domain**, enter `robertcoffman.cacherefresh.io` and save.
   - GitHub will check the DNS record you added above. Once it resolves,
     GitHub provisions an HTTPS certificate for the domain automatically
     (this can take a little while the first time).
   - Once the cert is ready, check **Enforce HTTPS**.

The `public/CNAME` file in this repo also declares the custom domain, so it
survives every fresh static export/deploy — you shouldn't need to
re-enter it in the UI after the first time.

### Branch flow

```
feature/*  --PR-->  sanctuary  --PR-->  release  --> deploy to Pages
           (protected, CI-gated)         (deploy trigger)
```

- **`feature/*`** — day-to-day work. [test-build.yml](.github/workflows/test-build.yml)
  runs lint/typecheck/build on every push to these branches.
- **`sanctuary`** — the protected integration branch (see branch protection
  setup below). All changes land here via PR from a `feature/*` branch.
- **`release`** — deploying to production means opening a PR from
  `sanctuary` into `release`. Merging that PR is what triggers the deploy —
  nothing else does.

### Automatic deploys

[.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)
builds and deploys the site automatically **whenever a pull request from
`sanctuary` is merged into `release`**. Direct pushes to `release`, and
anything happening on `sanctuary` itself, do *not* trigger a deploy — open a
PR `sanctuary` → `release` when you want to publish, or use **Actions tab →
Deploy to GitHub Pages → Run workflow** to trigger it manually.

Once it runs, the site is live at:

```
https://robertcoffman.cacherefresh.io/
```

### Building the static export locally (optional, for previewing)

```bash
npm run build:pages
npx serve out
```

This produces a static site in `out/` (asset URLs at the root, matching how
the custom domain will serve them) so you can sanity-check it before merging.

### Notes

- If you ever retire the custom domain and want to fall back to the plain
  `https://cacherefresh.github.io/robertcoffman/` URL, delete
  `public/CNAME` and reintroduce a `basePath`/`assetPrefix` of
  `/robertcoffman` in `next.config.ts` — GitHub Pages serves project sites
  without a custom domain from that subpath, not the domain root.

## 4. CI check on feature branches

[.github/workflows/test-build.yml](.github/workflows/test-build.yml) runs on
every push to a branch starting with `feature/` (or manually via **Actions
tab → Test Build → Run workflow**). It installs dependencies and runs:

1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run build:pages` (the same static-export build the deploy workflow uses)

This is a validation-only check — it doesn't publish anything — so you catch
lint/type/build errors on a `feature/*` branch before merging into
`sanctuary`.

## 5. Branch protection on `sanctuary`

This has to be set up once by hand in the GitHub UI (no `gh` CLI available
in this environment to script it):

1. Go to **Settings → Branches** in the repo.
2. Click **Add branch protection rule** (or **Add rule**).
3. Branch name pattern: `sanctuary`.
4. Enable **Require a pull request before merging**.
5. Enable **Require status checks to pass before merging**, then search for
   and add the **Test Build** check (it only shows up in the picker after
   `test-build.yml` has run at least once on a PR into `sanctuary`).
6. Save.

This blocks direct pushes to `sanctuary` and blocks merging a PR into it
until `test-build.yml` is green — matching the `feature/*` → `sanctuary`
flow above. It does not need a `release` counterpart rule; `release` is a
deploy trigger, not a place people work directly.
