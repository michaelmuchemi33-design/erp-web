-- Unity ERP — demo tenant seed + daily reset (run in Supabase SQL editor)
-- Adjust table names to match your live schema if they differ.

-- 1) Demo company / tenant
create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  company_name text not null,
  industry text,
  status text default 'active',
  created_at timestamptz default now()
);

insert into public.tenants (slug, company_name, industry, status)
values ('demo', 'Unity ERP Demo', 'Retail & POS', 'active')
on conflict (slug) do update
  set company_name = excluded.company_name,
      status = 'active';

-- Resolve demo tenant id
-- select id from tenants where slug = 'demo';

-- 2) Core operational tables (minimal — extend to match your ERP)
create table if not exists public.demo_products (
  id uuid primary key default gen_random_uuid(),
  tenant_slug text not null default 'demo',
  sku text not null,
  name text not null,
  category text,
  qty numeric default 0,
  unit_price_kes numeric default 0,
  updated_at timestamptz default now()
);

create table if not exists public.demo_customers (
  id uuid primary key default gen_random_uuid(),
  tenant_slug text not null default 'demo',
  name text not null,
  phone text,
  email text,
  city text default 'Nairobi'
);

create table if not exists public.demo_orders (
  id uuid primary key default gen_random_uuid(),
  tenant_slug text not null default 'demo',
  order_no text not null,
  customer_name text,
  total_kes numeric default 0,
  status text default 'Completed',
  ordered_at date default current_date
);

-- 3) Seed function (idempotent clear + insert)
create or replace function public.seed_unity_demo()
returns void
language plpgsql
as $$
begin
  delete from public.demo_orders where tenant_slug = 'demo';
  delete from public.demo_customers where tenant_slug = 'demo';
  delete from public.demo_products where tenant_slug = 'demo';

  insert into public.demo_products (sku, name, category, qty, unit_price_kes) values
    ('SKU-1001', 'Maize flour 2kg', 'Retail', 420, 280),
    ('SKU-1002', 'Cooking oil 1L', 'Retail', 310, 450),
    ('SKU-1003', 'Rice 5kg', 'Retail', 180, 950),
    ('SKU-2001', 'Cement 50kg', 'Construction', 90, 850),
    ('SKU-2002', 'Steel bar 12mm', 'Construction', 200, 1200),
    ('SKU-3001', 'Fertilizer NPK 50kg', 'Agriculture', 75, 3200),
    ('SKU-3002', 'Seed maize 10kg', 'Agriculture', 60, 2100),
    ('SKU-4001', 'Wireless headphones', 'Electronics', 120, 4500),
    ('SKU-4002', 'Smart watch', 'Electronics', 85, 6200),
    ('SKU-5001', 'Office chair', 'Furniture', 40, 8500);

  insert into public.demo_customers (name, phone, email, city) values
    ('Westlands Kiosk', '+254700000001', 'kiosk@example.com', 'Nairobi'),
    ('Kisumu Distributors', '+254700000002', 'kisumu@example.com', 'Kisumu'),
    ('Mombasa Hardware', '+254700000003', 'msa@example.com', 'Mombasa'),
    ('Demo Walk-in', null, null, 'Nairobi'),
    ('Co-op Society', '+254700000004', 'coop@example.com', 'Nakuru');

  insert into public.demo_orders (order_no, customer_name, total_kes, status, ordered_at) values
    ('ORD-00125', 'John Smith', 1250, 'Completed', current_date - 1),
    ('ORD-00124', 'Emily Johnson', 980.5, 'Processing', current_date - 2),
    ('ORD-00123', 'Michael Brown', 1760, 'Completed', current_date - 2),
    ('ORD-00122', 'Sarah Davis', 540, 'Pending', current_date - 3),
    ('ORD-00121', 'David Wilson', 1320, 'Cancelled', current_date - 3);
end;
$$;

-- Run seed now
select public.seed_unity_demo();

-- 4) Daily reset at 00:00 UTC via pg_cron (enable extension in Supabase first)
-- Dashboard → Database → Extensions → enable "pg_cron"
create extension if not exists pg_cron;

-- Remove old job if re-running
-- select cron.unschedule('unity-demo-daily-reset');

select cron.schedule(
  'unity-demo-daily-reset',
  '0 0 * * *',  -- every day 00:00 UTC (≈ 03:00 EAT)
  $$select public.seed_unity_demo();$$
);

-- Verify schedule:
-- select * from cron.job where jobname = 'unity-demo-daily-reset';
