# Knight ERP — Website

Enterprise ERP landing page with wishlist, contact form, and multi-step demo signup.

## Pricing (KES)

| Plan | Price |
|------|-------|
| Monthly | KES 3,000 |
| Yearly | KES 33,000 (1 month free) |

Payment: [Swypt](https://checkout.swypt.io/erp)

## Features

- Multi-step demo signup (industry → size → need → email) → saved to Supabase `leads`
- Footer wishlist → Supabase `wishlist`
- Footer contact form → Supabase `contact_messages`
- Knight ERP branding + logo

## Setup

### 1. Supabase tables

In [Supabase SQL Editor](https://supabase.com/dashboard), run `supabase-schema.sql`.

### 2. Environment

```env
VITE_SUPABASE_URL=https://otuhzmexmljmdmvetfym.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

### 3. Local

```bash
npm install
npm run dev
```

### 4. Vercel

Connect the GitHub repo. Add the same env vars in Project Settings → Environment Variables.

Build: `npm run build` · Output: `dist`
