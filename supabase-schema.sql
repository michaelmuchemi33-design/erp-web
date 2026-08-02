-- Run this in Supabase SQL Editor (Dashboard → SQL)

create table if not exists public.wishlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text default 'footer',
  created_at timestamptz default now()
);

create unique index if not exists wishlist_email_idx on public.wishlist (lower(email));

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  phone text,
  industry text,
  company_size text,
  primary_need text,
  source text default 'signup_wizard',
  created_at timestamptz default now()
);

-- If table already exists, add phone column
alter table public.leads add column if not exists phone text;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

alter table public.wishlist enable row level security;
alter table public.leads enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can join wishlist" on public.wishlist;
drop policy if exists "Anyone can submit lead" on public.leads;
drop policy if exists "Anyone can send contact" on public.contact_messages;

create policy "Anyone can join wishlist"
  on public.wishlist for insert to anon, authenticated with check (true);

create policy "Anyone can submit lead"
  on public.leads for insert to anon, authenticated with check (true);

create policy "Anyone can send contact"
  on public.contact_messages for insert to anon, authenticated with check (true);
