# forx-legal

Static website for **FORX** — functional fitness race tracker for iPhone & Apple Watch. Published via GitHub Pages at [forxrace.com](https://forxrace.com).

## Contents

| Path | Purpose |
| --- | --- |
| `index.html` | Landing page |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of use |
| `support.html` | Support page |
| `de/`, `fr/`, `pt-br/`, `tr/` | Localized terms & support pages |
| `assets/` | App icon, OG image, screenshots |
| `styles.css`, `script.js` | Shared styles and behavior |
| `CNAME`, `robots.txt`, `sitemap.xml`, `site.webmanifest` | SEO / hosting config |

## Local development

Plain HTML/CSS/JS — no build step. Serve with any static server:

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deployment

Pushes to `main` are published automatically by GitHub Pages. The custom domain (`forxrace.com`) is configured via `CNAME`.