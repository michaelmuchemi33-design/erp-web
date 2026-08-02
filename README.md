# Unity ERP — Website

All-in-one intelligent ERP landing page. Ready for Netlify.

## Pricing

| Plan    | Price              |
|---------|--------------------|
| Monthly | **KES 3,000** / month |
| Yearly  | **KES 33,000** / year (1 month free) |

Payment: [Swypt Checkout](https://checkout.swypt.io/erp)

## Deploy to Netlify

### Option A — Drag & drop
1. Run locally: `npm install && npm run build`
2. Drag the `dist` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

### Option B — Git
1. Push this folder to GitHub
2. In Netlify: New site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `dist`

### Option C — Netlify CLI
```bash
npm install
npm run build
npx netlify deploy --prod --dir=dist
```

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide icons
- Recharts
- Swypt payment button
