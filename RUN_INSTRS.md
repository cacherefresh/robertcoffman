# Running & Deploying The Oracle Chamber

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

## 3. Host on GitHub Pages

GitHub Pages only serves static files, so the site is built as a static export
(`output: "export"` in [next.config.ts](next.config.ts), gated behind the
`GITHUB_PAGES=true` env var so local dev/build is unaffected).

### One-time repo setup

1. Push this repo to GitHub (already done: `cacherefresh/robertcoffman`).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.

That's it — no gh-pages branch to manage.

### Automatic deploys

[.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) builds
and deploys the site automatically on every push to `sanctuary`. You can also
trigger it manually from the **Actions** tab (**Deploy to GitHub Pages → Run
workflow**).

Once it runs, the site is live at:

```
https://cacherefresh.github.io/robertcoffman/
```

### Building the static export locally (optional, for previewing)

```bash
npm run build:pages
npx serve out
```

This produces a static site in `out/` with all asset URLs prefixed with the
`/robertcoffman` base path, matching how GitHub Pages will serve it, and opens
a local preview server so you can sanity-check it before pushing.

### Notes

- If you rename the GitHub repo, update `repoName` in
  [next.config.ts](next.config.ts) to match — it's used to compute the
  `basePath`/`assetPrefix` so assets resolve correctly under
  `https://cacherefresh.github.io/<repo-name>/`.
- If you ever move this to a custom domain or a user/org page
  (`cacherefresh.github.io` repo), drop the `basePath`/`assetPrefix` override
  in `next.config.ts` since the site would then be served from the domain
  root.
