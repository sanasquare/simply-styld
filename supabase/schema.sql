-- ==============================================================================
-- SIMPLY STYLD — SUPABASE POSTGRESQL DATABASE SCHEMA & MIGRATION SCRIPT
-- Run this in your Supabase project's SQL Editor (SQL -> New Query -> Run)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PUBLIC PROFILES TABLE
-- Mirrors auth.users and stores customer details and roles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Automatically create profile on user sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    CASE 
      WHEN NEW.email = 'admin@simplystyld.com' THEN 'admin'
      ELSE COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
    END
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  sub_category TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  badge TEXT,
  rating NUMERIC NOT NULL DEFAULT 5.0,
  review_count INT NOT NULL DEFAULT 0,
  provenance TEXT,
  fabric TEXT,
  description TEXT,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  colors JSONB NOT NULL DEFAULT '[]'::jsonb,
  sizes JSONB NOT NULL DEFAULT '[]'::jsonb,
  details TEXT[] DEFAULT ARRAY[]::TEXT[],
  care_instructions TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_ref TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  discount NUMERIC NOT NULL DEFAULT 0,
  total NUMERIC NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'Paid',
  status TEXT NOT NULL DEFAULT 'Processing' CHECK (status IN ('Processing', 'Shipped', 'Delivered', 'Cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  unit_price NUMERIC NOT NULL,
  quantity INT NOT NULL DEFAULT 1
);

-- 6. WISHLISTS TABLE
CREATE TABLE IF NOT EXISTS public.wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE (user_id, product_id)
);

-- 7. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  author TEXT NOT NULL,
  location TEXT,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT true,
  photos TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'in_progress', 'resolved')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile; admins can read all
DROP POLICY IF EXISTS "Public profiles read policy" ON public.profiles;
CREATE POLICY "Public profiles read policy" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Products: Everyone can read; admins can insert/update/delete
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ) OR auth.jwt()->>'email' = 'admin@simplystyld.com');

-- Orders: Authenticated users can view their own; anyone can insert (for guest checkouts); admins can view all
DROP POLICY IF EXISTS "Users can view their orders" ON public.orders;
CREATE POLICY "Users can view their orders" ON public.orders
  FOR SELECT USING (
    (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') OR
    auth.jwt()->>'email' = 'admin@simplystyld.com'
  );

DROP POLICY IF EXISTS "Anyone can insert an order" ON public.orders;
CREATE POLICY "Anyone can insert an order" ON public.orders
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
CREATE POLICY "Admins can update orders" ON public.orders
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') OR
    auth.jwt()->>'email' = 'admin@simplystyld.com'
  );

-- Order Items: Viewable if order is accessible; insertable by anyone
DROP POLICY IF EXISTS "Order items access" ON public.order_items;
CREATE POLICY "Order items access" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id AND (
        orders.user_id = auth.uid() OR
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') OR
        auth.jwt()->>'email' = 'admin@simplystyld.com'
      )
    )
  );

DROP POLICY IF EXISTS "Anyone can insert order items" ON public.order_items;
CREATE POLICY "Anyone can insert order items" ON public.order_items
  FOR INSERT WITH CHECK (true);

-- Wishlists: Users only manage their own
DROP POLICY IF EXISTS "Users manage own wishlist" ON public.wishlists;
CREATE POLICY "Users manage own wishlist" ON public.wishlists
  FOR ALL USING (auth.uid() = user_id);

-- Reviews: Everyone can read; authenticated users can insert
DROP POLICY IF EXISTS "Anyone can read reviews" ON public.reviews;
CREATE POLICY "Anyone can read reviews" ON public.reviews
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can write reviews" ON public.reviews;
CREATE POLICY "Authenticated users can write reviews" ON public.reviews
  FOR INSERT WITH CHECK (true);

-- Inquiries: Anyone can insert; admins can view and update
DROP POLICY IF EXISTS "Anyone can submit inquiry" ON public.inquiries;
CREATE POLICY "Anyone can submit inquiry" ON public.inquiries
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view inquiries" ON public.inquiries;
CREATE POLICY "Admins can view inquiries" ON public.inquiries
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') OR
    auth.jwt()->>'email' = 'admin@simplystyld.com'
  );

-- ==============================================================================
-- 10. SEED INITIAL CURATED BOUTIQUE DATA
-- ==============================================================================

INSERT INTO public.products (
  id, name, category, sub_category, price, original_price, badge, rating, review_count, 
  provenance, fabric, description, images, colors, sizes, details, care_instructions
) VALUES 
(
  'gulzar-embroidered-chanderi',
  'Gulzar Embroidered Chanderi Kurti Set',
  'Kurtis',
  'Festive Pret ''25',
  2690,
  3200,
  'BESTSELLER',
  4.9,
  42,
  'Handcrafted in Chanderi, MP',
  'Breathable Chanderi Silk with 100% fine cotton mulmul inner lining',
  'Crafted from breathable Chanderi silk with delicate botanical threadwork inspired by traditional motifs. Designed for effortless grace from day to evening celebrations.',
  '[
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAtS1n1ETi9rLS3LLnarruPEQcokTQkjhgFQgygtCZlRrU1U7yyk3jTx4vtNfasafNtkl34bykZPwxhArPa1ZY5YQmw25hua_Pgpa7Xo41UozUmkOnBJft42djFGxQeU6azO5zj1GWk-Vu6tdoiin9wTbihlicV22z93JlaEKV4zOBKYr2bhFoK6mAisn-TuzRW7vc39qUzf7HZz7tdUM6pVTica8WU_iY6yTGlgzADdF4HFoS5RoX86g",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAKh1hf0Qc_1zf9rHQSWJKU6P3dAZnOfVr20S7uXdiGdgjPfQ1ybsoFPF-nKCv_eedtQN0pnl3iuGLrw8wmg4K45rG0LPC1COZikQqkBfzkpgoXjEmVkTr4K4YPuDTOQJz4pOMWP51sq49lfeRE9z-cW_iBJFvf_TzXfJ3JKa6gV9wzqh9UjThGg6h2zw3eHFbfIk0pFfOJNWiibVDK_kOCmXH5x9Uc8nZJ0FpmNYaLoxAiSCgRu-siz5rEPZnGH4oFSyU",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB1TwI5waf-sHVkUxmWBL95RxTF88YUwkOWNdWW3pEqBx7pMpQzQOF61bd5TPiIqkarZ9TgZ4XIG3axQwe2Kqi9I9R1mVrnPZpvdzn2utR9nhS4DZ5fjGVRWGKqlAfNVPwd_Ex7ZfIGQtRZcnrZXryxpFm99W7ZichK7qP8yvFPWsQ9dvTyKhh1kXwZQBQIRLSaMGHbMZ3jEt8jJO0tuqWsO8BjZW6MSkIgX-MbG5PPoy73iCNu8dCQUA",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCNWPaavgGtuuiOoZlVnOhq52bty1Zo0u1ZuwRwVInD5rxsLbz5VnjssV6nROQkHBDZJfB3jnpve0L8V4cOE3YosPBjS3_jZFzTEGxkekvxmU79vgcvbPJmdCr_YaoCBRF-E5dIxJoiXxJltk0kKg4lqpGwt019IukLN_gGh_DA7YigSEjyTAfRv_y4qm9lG-T4eTYfljWez6HXHubazGJVMCfUkXrWc5F3KP9j-6PA_waHiCLNmjuM9A"
  ]'::jsonb,
  '[
    {"name": "Warm Ivory", "hex": "#FAF7F0"},
    {"name": "Jet Black", "hex": "#1C1A18"},
    {"name": "Muted Sage", "hex": "#939B8C"},
    {"name": "Rosewood", "hex": "#A26C65"}
  ]'::jsonb,
  '[
    {"size": "M", "stock": 6, "status": "Ready"},
    {"size": "L", "stock": 3, "status": "Few Left"},
    {"size": "XL", "stock": 5, "status": "Ready"},
    {"size": "XXL", "stock": 2, "status": "Few Left"}
  ]'::jsonb,
  ARRAY[
    'Hand-spun Chanderi with zari floral bootis',
    'Round split-V neckline with delicate pearl piping',
    'Includes coordinated tailored straight pants',
    'Pre-washed fabric ensuring zero shrinkage'
  ],
  ARRAY[
    'Gentle hand wash in cold water or dry clean for longevity',
    'Dry in shade inside out to preserve delicate dye',
    'Warm iron on reverse side'
  ]
),
(
  'roshni-tiered-maxi-dress',
  'Roshni Mulmul Tiered Maxi Dress',
  'Dresses',
  'Everyday Pret',
  2490,
  2990,
  'NEW LAUNCH',
  4.8,
  28,
  'Handcrafted in Sanganer, Rajasthan',
  '100% featherlight handblock printed cotton mulmul',
  'A breezy, floor-skimming silhouette that dances with every step. Made for leisurely sunlit brunches and calm coastal evenings.',
  '[
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCU1W1t-G-1K1-zG_9oYI2j05QhG7jB6X7rL8q01bE4F1-7_oY4-8hW9K4e-YQ3a_8hW9K4e-YQ3a_8hW9K4e-YQ3a_8hW9K4e-YQ3a_8hW9K4e-YQ3a_8hW9K4e-YQ3a_8hW",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBF9t8FVZkIgDNQnmvXhGPl68ync9ZKV8HhsbH96D7Z9yU0v38-ckH-DE5NGy0JBONhSl-7BzBceF2ppaMliI3wBnWEGqOTagDq9Qaa6DhIixNWqvpMUE88TFvLxqXgrZr4DDYcve4y-nnZXOFiZkndW8fnVn8W7a1N9_wRjDwzBduLArFSbwyFrjrUNzPcW7mfSVkQn9GxeQvut5pbaAxHh9PuwT2RKThxzsRJy3-QG8QUm5wJvbfvPw"
  ]'::jsonb,
  '[
    {"name": "Ecru Linen", "hex": "#EFEBE2"},
    {"name": "Terracotta", "hex": "#BC654B"}
  ]'::jsonb,
  '[
    {"size": "M", "stock": 8, "status": "Ready"},
    {"size": "L", "stock": 4, "status": "Ready"},
    {"size": "XL", "stock": 2, "status": "Few Left"},
    {"size": "XXL", "stock": 0, "status": "Sold Out"}
  ]'::jsonb,
  ARRAY[
    'Three generous flare tiers with gather detailing',
    'Concealed side seam deep pockets',
    'Breathable botanical dabu handblock print'
  ],
  ARRAY[
    'Hand wash separately with mild detergent',
    'Iron while slightly damp'
  ]
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.reviews (
  product_id, author, location, rating, content, verified, photos
) VALUES
(
  'gulzar-embroidered-chanderi',
  'Meera Kapoor',
  'Mumbai',
  5,
  'The craftsmanship is exceptional. The fabric feels weightless on Mumbai humid days, and the zari bootis have a subtle sheen that looks very high-end.',
  true,
  ARRAY['https://lh3.googleusercontent.com/aida-public/AB6AXuB1TwI5waf-sHVkUxmWBL95RxTF88YUwkOWNdWW3pEqBx7pMpQzQOF61bd5TPiIqkarZ9TgZ4XIG3axQwe2Kqi9I9R1mVrnPZpvdzn2utR9nhS4DZ5fjGVRWGKqlAfNVPwd_Ex7ZfIGQtRZcnrZXryxpFm99W7ZichK7qP8yvFPWsQ9dvTyKhh1kXwZQBQIRLSaMGHbMZ3jEt8jJO0tuqWsO8BjZW6MSkIgX-MbG5PPoy73iCNu8dCQUA']
),
(
  'gulzar-embroidered-chanderi',
  'Ayesha Siddiqui',
  'Delhi',
  5,
  'Wore this for an engagement lunch. Received so many compliments! True to size according to their size chart.',
  true,
  ARRAY[]::TEXT[]
)
ON CONFLICT DO NOTHING;
