# Implementation Plan: Supabase Full-Stack Integration for Simply Styld

Integrate Supabase as the production backend for **Simply Styld**, replacing purely local mock state with a scalable PostgreSQL database, Supabase Auth, Row Level Security (RLS), and real-time capable CRUD services, while preserving graceful offline/demo fallbacks.

---

## 1. User Review Required & Key Assumptions

1. **Supabase Project Credentials**:
   - The app will use `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` defined in `.env`.
   - A complete, copy-pasteable SQL migration script (`supabase/schema.sql`) will be generated so you can run it directly in your Supabase SQL Editor.
   - **Graceful Mock Fallback**: If Supabase credentials are not yet provided in `.env`, the app seamlessly operates using the existing curated boutique mock data and local storage, ensuring zero downtime.
2. **Authentication Flow**:
   - Standard Supabase Auth (Email & Password sign-up and sign-in).
   - Anonymous/guest checkout is preserved and automatically linked if the customer logs in.
   - Admin access will be granted based on the user's role in the `profiles` table or an email check (`admin@simplystyld.com`).

---

## 2. Supabase Database Schema & Security Architecture

The schema will be documented in `supabase/schema.sql`:

### Tables

1. **`profiles`**:
   - `id` (uuid, primary key, references `auth.users.id` on delete cascade)
   - `full_name` (text), `phone` (text), `role` (text default `'customer'`)
   - `created_at` (timestamptz default now())
2. **`products`**:
   - `id` (text, primary key, e.g. `'gulzar-embroidered-chanderi'`)
   - `name` (text, not null)
   - `category` (text, not null)
   - `sub_category` (text)
   - `price` (numeric, not null)
   - `original_price` (numeric)
   - `badge` (text)
   - `rating` (numeric default 5.0)
   - `review_count` (int default 0)
   - `provenance` (text)
   - `fabric` (text)
   - `description` (text)
   - `images` (jsonb / text array)
   - `colors` (jsonb)
   - `sizes` (jsonb, containing `{ size, stock, status }`)
   - `details` (text array)
   - `care_instructions` (text array)
   - `created_at` (timestamptz default now())
3. **`orders`**:
   - `id` (uuid, primary key, default gen_random_uuid())
   - `order_ref` (text, unique, e.g. `'SS-84920'`)
   - `user_id` (uuid, references `profiles.id`, nullable for guest checkout)
   - `customer_name` (text, not null)
   - `customer_email` (text, not null)
   - `customer_phone` (text, not null)
   - `shipping_address` (jsonb, containing street, city, state, pincode)
   - `subtotal` (numeric, not null)
   - `discount` (numeric default 0)
   - `total` (numeric, not null)
   - `payment_method` (text, not null)
   - `payment_status` (text default `'paid'`)
   - `status` (text default `'Processing'`) -- `'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'`
   - `created_at` (timestamptz default now())
4. **`order_items`**:
   - `id` (uuid, primary key, default gen_random_uuid())
   - `order_id` (uuid, references `orders.id` on delete cascade)
   - `product_id` (text, references `products.id`)
   - `product_name` (text)
   - `product_image` (text)
   - `size` (text)
   - `color` (text)
   - `unit_price` (numeric)
   - `quantity` (int)
5. **`wishlists`**:
   - `id` (uuid, primary key, default gen_random_uuid())
   - `user_id` (uuid, references `profiles.id` on delete cascade)
   - `product_id` (text, references `products.id` on delete cascade)
   - `created_at` (timestamptz default now())
   - Unique constraint on `(user_id, product_id)`
6. **`reviews`**:
   - `id` (uuid, primary key, default gen_random_uuid())
   - `product_id` (text, references `products.id` on delete cascade)
   - `user_id` (uuid, references `profiles.id`, nullable)
   - `author` (text, not null)
   - `location` (text)
   - `rating` (int, check between 1 and 5)
   - `content` (text, not null)
   - `verified` (boolean default true)
   - `photos` (text array)
   - `created_at` (timestamptz default now())
7. **`inquiries`**:
   - `id` (uuid, primary key, default gen_random_uuid())
   - `name` (text, not null)
   - `email` (text, not null)
   - `phone` (text)
   - `subject` (text, not null)
   - `message` (text, not null)
   - `status` (text default `'unread'`)
   - `created_at` (timestamptz default now())

### Row Level Security (RLS) & Policies

- **`products`**: Public read access (`SELECT true`). Admin-only insert, update, delete.
- **`orders`**: Users can view their own orders (`auth.uid() = user_id`). Anyone can insert a new order (supports guest checkout). Admins can view and update all orders.
- **`order_items`**: Users can view items belonging to their orders. Anyone can insert.
- **`wishlists`**: Users can select/insert/delete only their own wishlist items (`auth.uid() = user_id`).
- **`reviews`**: Public read access. Authenticated users can insert reviews.
- **`inquiries`**: Anyone can insert an inquiry. Admins can view and update status.

---

## 3. Client-Side Implementation Structure

### Dependencies
- Install `@supabase/supabase-js`.

### New & Modified Files

1. **`supabase/schema.sql`** *(New)*
   - Full PostgreSQL DDL script with table definitions, foreign keys, triggers (auto-create profile on user sign-up), RLS policies, and seed data from `mockData.ts`.
2. **`src/lib/supabase.ts`** *(New)*
   - Supabase client initialization with `createClient`.
   - Feature-detection helper `isSupabaseConfigured()` to check if valid URL and anon keys are present.
3. **`src/services/`** *(New)*
   - `productsService.ts`: Fetch all products, fetch single product, create/update/delete product.
   - `ordersService.ts`: Create order with items, fetch user orders, fetch all orders (for admin), update order fulfillment status.
   - `wishlistService.ts`: Fetch user wishlist, toggle item in wishlist.
   - `reviewsService.ts`: Fetch reviews for product, post new review.
   - `inquiriesService.ts`: Send contact form message, fetch inquiries for admin console.
4. **`src/context/AuthContext.tsx`** *(New)*
   - React context managing `user`, `profile`, `session`, `isLoading`, `signIn`, `signUp`, `signOut`.
   - Automatic listener via `supabase.auth.onAuthStateChange`.
5. **`src/components/AuthModal.tsx`** *(New)*
   - Luxury boutique modal for Customer Sign In, Sign Up, and Password Reset.
   - Designed to match Simply Styld's warm ivory & antique gold editorial aesthetic.
6. **`src/components/Header.tsx` & `NavigationDrawer.tsx`** *(Modified)*
   - Add user account profile avatar / Sign In button with drop-down for user details, order history link, and log out.
7. **`src/App.tsx` & Core Pages** *(Modified)*
   - Wrap application with `AuthProvider`.
   - Connect `HomePage`, `ShopPage`, `ProductDetailPage`, `CartPage`, `AdminPage`, `ContactPage`, and `WishlistPage` to live Supabase services.

---

## 4. Verification & Testing Plan

1. **Build & Lint Verification**:
   - Run `install_applet_package` for `@supabase/supabase-js`.
   - Run `compile_applet` and `lint_applet` to confirm zero compilation or type errors.
2. **Graceful Degradation Verification**:
   - Verify that in local development without active credentials, the site works identically using mock/local storage with clear helper indicators.
3. **End-to-End Workflow Verification**:
   - Sign up & Sign in flow via `AuthModal`.
   - Live product query and filtering.
   - Checkout process creating records in `orders` and `order_items`.
   - Admin console displaying live order entries and updating status (Processing -> Shipped -> Delivered).
   - Inquiries form submission storing messages in `inquiries`.
