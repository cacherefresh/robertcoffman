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

### Automatic deploys

[.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)
builds and deploys the site automatically **whenever a pull request from a
branch starting with `feature/` is merged into `sanctuary`**. Direct pushes
to `sanctuary` do *not* trigger a deploy — merge through a PR from a
`feature/*` branch, or use **Actions tab → Deploy to GitHub Pages → Run
workflow** to trigger it manually.

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
`sanctuary` and triggering the real deploy.
