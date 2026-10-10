# plat.website — Ramil Mustaev portfolio

Live: **https://plat.website** · Junior Data Engineer portfolio (React + Tailwind via CDN, Babel standalone).

## Contents

- `index.html` — entry point (markup, CDN links, background layer)
- `css/style.css` — all custom styles and animations
- `js/tailwind.config.js` — Tailwind theme tokens (colors, fonts)
- `js/app.jsx` — React components (hero, about, skills, projects, contact)
- `js/boot-guard.js` — fallback message if CDN scripts fail
- `assets/` — resume PDF and images

## Local preview

Babel fetches `js/app.jsx` over HTTP, so a local server is required:

```bash
npx serve .
# or:
python -m http.server 8000
```

Then open <http://localhost:3000> (or :8000).
Double-clicking `index.html` will NOT work.

## Projects shown

- SQL Migration Tool (MS SQL → PostgreSQL) — github.com/muctaev/sql-migration-tool
- Automated ETL Pipeline (CBR / HH.ru API) — github.com/muctaev/cbr-etl-pipeline
