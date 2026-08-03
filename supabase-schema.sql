-- Unity ERP / Unity Software Solutions
-- Run once in Supabase Dashboard → SQL Editor
-- Project: https://otuhzmexmljmdmvetfym.supabase.co

-- Demo / trial / industry leads
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  phone text,
  industry text,
  company_size text,
  primary_need text,
  source text default 'signup_wizard',
  status text default 'new',
  created_at timestamptz default now()
);

alter table public.leads add column if not exists phone text;
alter table public.leads add column if not exists status text default 'new';

-- Contact form messages
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  message text not null,
  status text default 'new',
  created_at timestamptz default now()
);

alter table public.contact_messages add column if not exists status text default 'new';

-- Optional wishlist (legacy)
create table if not exists public.wishlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text default 'footer',
  created_at timestamptz default now()
);

create unique index if not exists wishlist_email_idx on public.wishlist (lower(email));

-- Career applications (Video Editor, Sales Executive, open applications)
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  name text not null,
  email text not null,
  phone text,
  portfolio_url text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

-- RLS: public can INSERT only (no public SELECT)
alter table public.leads enable row level security;
alter table public.contact_messages enable row level security;
alter table public.wishlist enable row level security;
alter table public.applications enable row level security;

drop policy if exists "Anyone can submit lead" on public.leads;
drop policy if exists "Anyone can send contact" on public.contact_messages;
drop policy if exists "Anyone can join wishlist" on public.wishlist;
drop policy if exists "Anyone can apply" on public.applications;

create policy "Anyone can submit lead"
  on public.leads for insert to anon, authenticated with check (true);

create policy "Anyone can send contact"
  on public.contact_messages for insert to anon, authenticated with check (true);

create policy "Anyone can join wishlist"
  on public.wishlist for insert to anon, authenticated with check (true);

create policy "Anyone can apply"
  on public.applications for insert to anon, authenticated with check (true);

-- Helpful indexes for your dashboard in Supabase Table Editor
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_source_idx on public.leads (source);
create index if not exists applications_created_at_idx on public.applications (created_at desc);
create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);


-- Optional: track login page interest (also stored in leads with source=login_page)
create table if not exists public.login_events (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  method text default 'magic_link',
  created_at timestamptz default now()
);
alter table public.login_events enable row level security;
drop policy if exists "Anyone can log login interest" on public.login_events;
create policy "Anyone can log login interest"
  on public.login_events for insert to anon, authenticated with check (true);
