-- =============================================================================
-- Unity ERP — ALL INDUSTRIES demo seed + daily reset (ONE SCRIPT)
-- Industries: Manufacturing, Construction, Hospital / Healthcare, Retail & POS,
-- Education, Agriculture, Hospitality, Logistics, Finance & Accounting, Other
-- Run in Supabase SQL Editor. Enable Extensions → pg_cron for midnight reset.
-- =============================================================================

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  company_name text not null,
  industry text,
  status text default 'active',
  created_at timestamptz default now()
);

create table if not exists public.demo_products (
  id uuid primary key default gen_random_uuid(),
  tenant_slug text not null default 'demo',
  industry text not null,
  sku text not null,
  name text not null,
  category text,
  qty numeric default 0,
  unit_price_kes numeric default 0,
  keywords text,
  updated_at timestamptz default now()
);

create table if not exists public.demo_customers (
  id uuid primary key default gen_random_uuid(),
  tenant_slug text not null default 'demo',
  industry text not null,
  name text not null,
  phone text,
  email text,
  city text default 'Nairobi',
  segment text
);

create table if not exists public.demo_orders (
  id uuid primary key default gen_random_uuid(),
  tenant_slug text not null default 'demo',
  industry text not null,
  order_no text not null,
  customer_name text,
  total_kes numeric default 0,
  status text default 'Completed',
  ordered_at date default current_date,
  note text
);

create table if not exists public.demo_industry_copy (
  industry text primary key,
  headline text not null,
  blurb text not null,
  keywords text not null
);

insert into public.tenants (slug, company_name, industry, status)
values ('demo', 'Unity ERP Demo', 'Multi-industry', 'active')
on conflict (slug) do update set company_name = excluded.company_name, status = 'active';

create or replace function public.seed_unity_demo_all_industries()
returns void
language plpgsql
as $$
begin
  delete from public.demo_orders where tenant_slug = 'demo';
  delete from public.demo_customers where tenant_slug = 'demo';
  delete from public.demo_products where tenant_slug = 'demo';
  delete from public.demo_industry_copy;

  -- Industry headlines / keywords (shown in demo UI by ?industry=)
  insert into public.demo_industry_copy (industry, headline, blurb, keywords) values
  ('Manufacturing', 'Manufacturing ERP demo',
   'BOMs, work orders, raw materials and finished goods in one cloud system.',
   'BOM, work orders, WIP, production, shop floor, quality, waste, MRP'),
  ('Construction', 'Construction ERP demo',
   'Job costing, site materials and supplier control for contractors.',
   'job costing, site stock, progress billing, contractors, materials'),
  ('Hospital / Healthcare', 'Hospital & clinic ERP demo',
   'Pharmacy stock, expiries and service billing for care providers.',
   'pharmacy, expiry, clinical supplies, patient billing, NHIF-ready ops'),
  ('Retail & POS', 'Retail & POS ERP demo',
   'Multi-branch stock, fast sales and CRM for Kenyan retailers.',
   'POS, multi-branch, stockouts, reorder, till, retail CRM'),
  ('Education', 'Education ERP demo',
   'Fees, supplies and admin inventory for schools and colleges.',
   'school fees, uniforms, lab supplies, campus inventory, admin'),
  ('Agriculture', 'Agriculture ERP demo',
   'Inputs, produce batches and buyer records for farms and co-ops.',
   'fertilizer, seed, produce, co-op, seasonal stock, farm inputs'),
  ('Hospitality', 'Hospitality ERP demo',
   'F&B inventory, purchasing and guest CRM for hotels and restaurants.',
   'F&B, kitchen stock, outlets, guest CRM, hospitality purchasing'),
  ('Logistics', 'Logistics ERP demo',
   'Warehouse transfers, orders and partner records for logistics teams.',
   'warehouse, transfers, delivery status, fleet cost, 3PL'),
  ('Finance & Accounting', 'Finance & accounting ERP demo',
   'Invoicing, AR/AP and inventory valuation for finance-led SMEs.',
   'invoicing, receivables, payables, ledger, expenses, reports'),
  ('Other', 'Unity ERP full demo',
   'Inventory, CRM, finance and operations for growing African SMEs.',
   'cloud ERP, CRM, inventory, free mode, KES pricing, AI assistant');

  -- Products per industry
  insert into public.demo_products (industry, sku, name, category, qty, unit_price_kes, keywords) values
  -- Manufacturing
  ('Manufacturing', 'MFG-RM-01', 'Raw polymer resin 25kg', 'Raw material', 200, 4500, 'raw material BOM'),
  ('Manufacturing', 'MFG-RM-02', 'Label roll 1000pcs', 'Packaging', 80, 1200, 'packaging'),
  ('Manufacturing', 'MFG-FG-01', 'Finished casing SKU-A', 'Finished goods', 150, 8900, 'finished goods'),
  ('Manufacturing', 'MFG-FG-02', 'Assembly kit B', 'Finished goods', 95, 12500, 'work order'),
  -- Construction
  ('Construction', 'CON-01', 'Cement 50kg', 'Materials', 120, 850, 'site materials'),
  ('Construction', 'CON-02', 'Steel bar 12mm', 'Materials', 300, 1200, 'steel'),
  ('Construction', 'CON-03', 'Paint 20L', 'Finishes', 60, 3200, 'finishes'),
  ('Construction', 'CON-04', 'Sand (ton)', 'Materials', 40, 2500, 'aggregates'),
  -- Hospital
  ('Hospital / Healthcare', 'HSP-01', 'Syringe pack 100', 'Consumables', 200, 1500, 'pharmacy'),
  ('Hospital / Healthcare', 'HSP-02', 'Gloves box', 'Consumables', 180, 900, 'PPE'),
  ('Hospital / Healthcare', 'HSP-03', 'Paracetamol 500mg', 'Pharmacy', 500, 350, 'drugs expiry'),
  ('Hospital / Healthcare', 'HSP-04', 'Bandage roll', 'Consumables', 220, 400, 'ward stock'),
  -- Retail
  ('Retail & POS', 'RET-01', 'Maize flour 2kg', 'Grocery', 420, 280, 'POS fast movers'),
  ('Retail & POS', 'RET-02', 'Cooking oil 1L', 'Grocery', 310, 450, 'retail stock'),
  ('Retail & POS', 'RET-03', 'Soda 500ml', 'Beverages', 600, 80, 'POS'),
  ('Retail & POS', 'RET-04', 'Soap bar', 'Household', 350, 120, 'reorder'),
  -- Education
  ('Education', 'EDU-01', 'Exercise book dozen', 'Stationery', 400, 450, 'school supplies'),
  ('Education', 'EDU-02', 'Lab apron', 'Lab', 90, 800, 'lab'),
  ('Education', 'EDU-03', 'Uniform set', 'Uniforms', 70, 2500, 'uniforms'),
  ('Education', 'EDU-04', 'Whiteboard marker pack', 'Stationery', 150, 600, 'admin'),
  -- Agriculture
  ('Agriculture', 'AGR-01', 'Fertilizer NPK 50kg', 'Inputs', 75, 3200, 'fertilizer'),
  ('Agriculture', 'AGR-02', 'Seed maize 10kg', 'Inputs', 60, 2100, 'seed'),
  ('Agriculture', 'AGR-03', 'Pesticide 1L', 'Inputs', 100, 1800, 'crop protection'),
  ('Agriculture', 'AGR-04', 'Animal feed 25kg', 'Feed', 110, 2200, 'livestock'),
  -- Hospitality
  ('Hospitality', 'HOS-01', 'Rice 25kg (kitchen)', 'F&B', 50, 4500, 'kitchen stock'),
  ('Hospitality', 'HOS-02', 'Cooking gas cylinder', 'Utilities', 20, 3500, 'outlet'),
  ('Hospitality', 'HOS-03', 'Room amenity kit', 'Rooms', 200, 450, 'guest'),
  ('Hospitality', 'HOS-04', 'Bar soft drinks crate', 'F&B', 80, 1200, 'bar'),
  -- Logistics
  ('Logistics', 'LOG-01', 'Packaging carton large', 'Packaging', 500, 80, 'warehouse'),
  ('Logistics', 'LOG-02', 'Pallet wrap roll', 'Packaging', 90, 2200, 'dispatch'),
  ('Logistics', 'LOG-03', 'Fuel voucher unit', 'Fleet', 1000, 200, 'fleet cost'),
  ('Logistics', 'LOG-04', 'Handling gloves pack', 'Safety', 150, 600, 'warehouse PPE'),
  -- Finance
  ('Finance & Accounting', 'FIN-01', 'Service item — consulting hour', 'Services', 9999, 5000, 'invoicing'),
  ('Finance & Accounting', 'FIN-02', 'Retainer package monthly', 'Services', 9999, 25000, 'receivables'),
  ('Finance & Accounting', 'FIN-03', 'Stationery bulk', 'Expenses', 40, 3500, 'expenses'),
  ('Finance & Accounting', 'FIN-04', 'Software seat (memo)', 'Subscriptions', 50, 1500, 'opex'),
  -- Other
  ('Other', 'GEN-01', 'Standard SKU', 'General', 100, 1000, 'inventory'),
  ('Other', 'GEN-02', 'Service fee', 'Services', 9999, 3000, 'CRM sales'),
  ('Other', 'GEN-03', 'Bundle pack', 'General', 75, 4500, 'POS');

  insert into public.demo_customers (industry, name, phone, email, city, segment) values
  ('Manufacturing', 'Industrial Buyer Ltd', '+254711000001', 'buyer@mfg.example', 'Nairobi', 'B2B'),
  ('Manufacturing', 'Export Partner EA', '+254711000002', 'export@mfg.example', 'Mombasa', 'Export'),
  ('Construction', 'Site Contractor A', '+254711000003', 'site@con.example', 'Nairobi', 'Contractor'),
  ('Construction', 'Hardware Partner', '+254711000004', 'hw@con.example', 'Kisumu', 'Supplier-facing'),
  ('Hospital / Healthcare', 'City Clinic', '+254711000005', 'clinic@hsp.example', 'Nairobi', 'Clinic'),
  ('Hospital / Healthcare', 'Ward Supply Desk', null, null, 'Nairobi', 'Internal'),
  ('Retail & POS', 'Westlands Kiosk', '+254711000006', 'kiosk@ret.example', 'Nairobi', 'Retail'),
  ('Retail & POS', 'Demo Walk-in', null, null, 'Nairobi', 'Walk-in'),
  ('Education', 'Green Hills School', '+254711000007', 'admin@edu.example', 'Nakuru', 'School'),
  ('Education', 'College Bookstore', '+254711000008', 'books@edu.example', 'Nairobi', 'Campus'),
  ('Agriculture', 'Farmers Co-op', '+254711000009', 'coop@agr.example', 'Eldoret', 'Co-op'),
  ('Agriculture', 'Produce Buyer', '+254711000010', 'buyer@agr.example', 'Kitale', 'Buyer'),
  ('Hospitality', 'Lakeside Hotel', '+254711000011', 'ops@hos.example', 'Naivasha', 'Hotel'),
  ('Hospitality', 'City Restaurant', '+254711000012', 'kitchen@hos.example', 'Nairobi', 'F&B'),
  ('Logistics', 'Dispatch Client', '+254711000013', 'dispatch@log.example', 'Nairobi', 'Shipper'),
  ('Logistics', 'Warehouse Partner', '+254711000014', 'wh@log.example', 'Mombasa', '3PL'),
  ('Finance & Accounting', 'Retainer Client', '+254711000015', 'client@fin.example', 'Nairobi', 'Services'),
  ('Finance & Accounting', 'Audit Prep Co', '+254711000016', 'audit@fin.example', 'Nairobi', 'SME'),
  ('Other', 'General SME', '+254711000017', 'sme@other.example', 'Nairobi', 'SME'),
  ('Other', 'Trial Customer', null, null, 'Nairobi', 'Trial');

  insert into public.demo_orders (industry, order_no, customer_name, total_kes, status, ordered_at, note) values
  ('Manufacturing', 'MFG-1001', 'Industrial Buyer Ltd', 89000, 'Completed', current_date - 1, 'Finished goods delivery'),
  ('Manufacturing', 'MFG-1002', 'Export Partner EA', 125000, 'Processing', current_date - 2, 'Export batch'),
  ('Construction', 'CON-2001', 'Site Contractor A', 45000, 'Completed', current_date - 1, 'Site materials'),
  ('Construction', 'CON-2002', 'Hardware Partner', 22000, 'Pending', current_date - 3, 'Steel order'),
  ('Hospital / Healthcare', 'HSP-3001', 'City Clinic', 18500, 'Completed', current_date - 1, 'Pharmacy restock'),
  ('Hospital / Healthcare', 'HSP-3002', 'Ward Supply Desk', 9200, 'Processing', current_date - 2, 'Consumables'),
  ('Retail & POS', 'RET-4001', 'Westlands Kiosk', 1250, 'Completed', current_date - 1, 'POS sale'),
  ('Retail & POS', 'RET-4002', 'Demo Walk-in', 540, 'Completed', current_date - 1, 'Walk-in'),
  ('Education', 'EDU-5001', 'Green Hills School', 36000, 'Completed', current_date - 2, 'Uniforms & books'),
  ('Education', 'EDU-5002', 'College Bookstore', 12000, 'Pending', current_date - 4, 'Stationery'),
  ('Agriculture', 'AGR-6001', 'Farmers Co-op', 64000, 'Completed', current_date - 1, 'Fertilizer'),
  ('Agriculture', 'AGR-6002', 'Produce Buyer', 28000, 'Processing', current_date - 2, 'Inputs'),
  ('Hospitality', 'HOS-7001', 'Lakeside Hotel', 41000, 'Completed', current_date - 1, 'Kitchen stock'),
  ('Hospitality', 'HOS-7002', 'City Restaurant', 15000, 'Completed', current_date - 3, 'Bar supplies'),
  ('Logistics', 'LOG-8001', 'Dispatch Client', 33000, 'Processing', current_date - 1, 'Dispatch'),
  ('Logistics', 'LOG-8002', 'Warehouse Partner', 19000, 'Completed', current_date - 2, 'Packaging'),
  ('Finance & Accounting', 'FIN-9001', 'Retainer Client', 25000, 'Completed', current_date - 1, 'Monthly retainer'),
  ('Finance & Accounting', 'FIN-9002', 'Audit Prep Co', 15000, 'Pending', current_date - 5, 'Consulting hours'),
  ('Other', 'GEN-0001', 'General SME', 8000, 'Completed', current_date - 1, 'Mixed'),
  ('Other', 'GEN-0002', 'Trial Customer', 3000, 'Completed', current_date - 2, 'Trial');
end;
$$;

-- Seed immediately
select public.seed_unity_demo_all_industries();

-- Optional helper: fetch one industry pack
create or replace function public.get_demo_by_industry(p_industry text)
returns jsonb
language sql
stable
as $$
  select jsonb_build_object(
    'copy', (select to_jsonb(c) from public.demo_industry_copy c where c.industry = p_industry),
    'products', coalesce((select jsonb_agg(to_jsonb(p)) from public.demo_products p where p.industry = p_industry), '[]'::jsonb),
    'customers', coalesce((select jsonb_agg(to_jsonb(c)) from public.demo_customers c where c.industry = p_industry), '[]'::jsonb),
    'orders', coalesce((select jsonb_agg(to_jsonb(o)) from public.demo_orders o where o.industry = p_industry), '[]'::jsonb)
  );
$$;

-- Daily reset 00:00 UTC (~03:00 EAT)
create extension if not exists pg_cron;

-- Uncomment if re-scheduling:
-- select cron.unschedule('unity-demo-daily-reset');

select cron.schedule(
  'unity-demo-daily-reset',
  '0 0 * * *',
  $$select public.seed_unity_demo_all_industries();$$
);

-- Quick checks:
-- select * from demo_industry_copy;
-- select industry, count(*) from demo_products group by 1;
-- select public.get_demo_by_industry('Retail & POS');
