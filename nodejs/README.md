# Products App

A products catalog with search, categories, image upload, and auth-gated editing.

- `backend/` — Express REST API (talks to Supabase with the service role key, verifies user tokens)
- `frontend/` — React + Vite + Tailwind (talks to Supabase Auth/Storage directly, and to the backend API for data)
- `supabase/schema.sql` — database schema + Row Level Security policies + storage bucket setup

## 1. Create a Supabase project

Go to [supabase.com](https://supabase.com) and create a free project (or use an existing one).

## 2. Run the schema

Open your project's **SQL Editor** and run the full contents of [supabase/schema.sql](supabase/schema.sql). This creates the `products` and `categories` tables, RLS policies, and a public `product-images` storage bucket.

## 3. Get your API keys

In your Supabase project: **Project Settings -> API**. You need:
- `Project URL`
- `anon public` key
- `service_role` key (keep this secret — backend only)

## 4. Configure environment variables

```
cd backend
cp .env.example .env
# fill in SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY

cd ../frontend
cp .env.example .env
# fill in VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
```

## 5. Run it

```
# terminal 1
cd backend
npm install
npm run dev

# terminal 2
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. Sign up for an account to add/edit/delete products — browsing and searching works for anyone.
