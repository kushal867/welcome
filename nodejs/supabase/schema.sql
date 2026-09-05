-- Run this once in your Supabase project's SQL Editor (Project -> SQL Editor -> New query).

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric not null check (price >= 0),
  category_id uuid references categories(id) on delete set null,
  image_url text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists products_category_idx on products(category_id);

alter table categories enable row level security;
alter table products enable row level security;

-- Anyone (including logged-out visitors) can browse products and categories.
create policy "Public can read categories" on categories for select using (true);
create policy "Public can read products" on products for select using (true);

-- Only logged-in users can create/edit/delete.
create policy "Authenticated can insert categories" on categories
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated can insert products" on products
  for insert with check (auth.role() = 'authenticated');
create policy "Authenticated can update products" on products
  for update using (auth.role() = 'authenticated');
create policy "Authenticated can delete products" on products
  for delete using (auth.role() = 'authenticated');

-- Storage bucket for product images.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public can view product images" on storage.objects
  for select using (bucket_id = 'product-images');
create policy "Authenticated can upload product images" on storage.objects
  for insert with check (bucket_id = 'product-images' and auth.role() = 'authenticated');
