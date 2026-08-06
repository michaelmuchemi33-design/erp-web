-- Unity ERP demo industry seed packs
-- Run after tenants table exists. Demo tenant slug = 'demo'.

-- Example structure (adapt to your ERP tables):
-- tenants: id, slug, company_name, industry, status
-- products, customers, invoices keyed by tenant_id

-- 1) Ensure demo tenant
-- insert into tenants (slug, company_name, industry, status)
-- values ('demo', 'Unity ERP Demo', 'Retail & POS', 'active')
-- on conflict (slug) do update set company_name = excluded.company_name;

-- Pack A — Retail & POS / Hospitality sample SKUs
-- products: SKU, name, qty, unit_price (KES)

-- Pack B — Manufacturing / Construction materials
-- BOM-style items, raw materials, finished goods

-- Pack C — Agriculture / Logistics farm & fleet style items

-- Application logic (recommended):
-- When lead requests demo with industry X, either:
--   a) Point everyone to demo.unity-software.online with UI presets for industry, OR
--   b) Clone demo tenant data filtered by industry tag into a trial tenant.

-- For frictionless demo: use shared demo tenant + email link only.
