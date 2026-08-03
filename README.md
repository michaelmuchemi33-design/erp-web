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

## Demo confirmation email

1. Run `supabase-schema.sql` (includes `phone` on `leads`).
2. Install Supabase CLI: `npm i -g supabase`
3. Login and link project:
   ```bash
   supabase login
   supabase link --project-ref otuhzmexmljmdmvetfym
   ```
4. Deploy the function:
   ```bash
   supabase functions deploy send-demo-email
   ```
5. Add Resend (free tier) for real email:
   - Create key at https://resend.com
   - Set secret:
     ```bash
     supabase secrets set RESEND_API_KEY=re_xxx
     supabase secrets set DEMO_URL=https://www.unity-software.online
     supabase secrets set SITE_URL=https://www.unity-software.online
     supabase secrets set FROM_EMAIL="Knight ERP <onboarding@yourdomain.com>"
     ```

Without `RESEND_API_KEY`, leads still save; email is skipped (logged only).


## Supabase tracking (required once)

1. Open [Supabase SQL Editor](https://supabase.com/dashboard/project/otuhzmexmljmdmvetfym/sql)
2. Paste and run `supabase-schema.sql` from this repo
3. In Vercel → Project → Settings → Environment Variables set:
   - `VITE_SUPABASE_URL` = `https://otuhzmexmljmdmvetfym.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = your publishable key
4. Redeploy

### Tables
| Table | Tracks |
|-------|--------|
| `leads` | Demo wizard, industry overlays |
| `contact_messages` | Contact + footer write-to-us |
| `applications` | Careers job applications |

View rows in Supabase → Table Editor. Never put `SUPABASE_SECRET_KEY` in the frontend.
