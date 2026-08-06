-- Map logged-in users to company subdomains (paid workspaces)
create table if not exists public.workspace_members (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  slug text not null,
  company_name text,
  status text not null default 'active', -- active | suspended
  role text default 'owner',
  created_at timestamptz default now(),
  unique (email, slug)
);

create index if not exists workspace_members_email_idx on public.workspace_members (email);

alter table public.workspace_members enable row level security;

-- Users can read their own membership (for redirect)
create policy "read own membership"
  on public.workspace_members for select
  using (lower(email) = lower(auth.jwt() ->> 'email'));

-- Service role / dashboard inserts rows when payment succeeds
-- Example after Paystack:
-- insert into workspace_members (email, slug, company_name, status)
-- values ('owner@acme.com', 'acme', 'Acme Ltd', 'active');

-- Demo users: no row → app redirects to https://demo.unity-software.online
