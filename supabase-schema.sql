-- Run this in Supabase SQL Editor (Dashboard → SQL)

-- Wishlist emails from footer
create table if not exists public.wishlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text default 'footer',
  created_at timestamptz default now()
);

create unique index if not exists wishlist_email_idx on public.wishlist (lower(email));

-- Signup wizard leads (demo requests)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  industry text,
  company_size text,
  primary_need text,
  source text default 'signup_wizard',
  created_at timestamptz default now()
);

-- Contact form messages
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Allow public inserts (anon key) — no public reads
alter table public.wishlist enable row level security;
alter table public.leads enable row level security;
alter table public.contact_messages enable row level security;

create policy "Anyone can join wishlist"
  on public.wishlist for insert
  to anon, authenticated
  with check (true);

create policy "Anyone can submit lead"
  on public.leads for insert
  to anon, authenticated
  with check (true);

create policy "Anyone can send contact"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);
