/*
# Aamrai Resort — Complete Database Schema

## Overview
Creates the full schema for the Aamrai Resort management platform: restaurant menu,
POS billing with historical price protection, gallery, reviews, events, lodging,
business settings, staff activity, and role-based user profiles.

## New Tables
1. **users** — Staff profiles linked to auth.users (admin / counter roles)
2. **menu_items** — Restaurant + bar menu items with category, veg/non-veg, pricing, availability, today's special
3. **price_history** — Audit trail of price changes per menu item
4. **bills** — POS bills with customer info, payment method, status, counter staff
5. **bill_items** — Line items storing priceAtPurchase (historical price protection)
6. **reviews** — Guest reviews with rating, publish/verified flags
7. **gallery_images** — Resort gallery images by category
8. **event_packages** — Event/celebration packages with pricing and amenities
9. **rooms** — Lodging room types with amenities and pricing
10. **business_settings** — Singleton row with all editable business configuration
11. **staff_activity** — Audit log of staff actions (bill creation, etc.)

## Security
- RLS enabled on every table.
- Public-facing tables (menu_items, gallery_images, reviews, event_packages, rooms, business_settings):
  SELECT open to anon + authenticated (public website reads these).
  INSERT/UPDATE/DELETE restricted to authenticated staff.
- Operational tables (bills, bill_items, users, price_history, staff_activity):
  All CRUD restricted to authenticated staff only.
*/

-- ============ USERS ============
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'counter')),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "users_select" ON users;
CREATE POLICY "users_select" ON users FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "users_insert" ON users;
CREATE POLICY "users_insert" ON users FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "users_update" ON users;
CREATE POLICY "users_update" ON users FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "users_delete" ON users;
CREATE POLICY "users_delete" ON users FOR DELETE TO authenticated USING (true);

-- ============ MENU ITEMS ============
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  category text NOT NULL,
  is_veg boolean DEFAULT true,
  price numeric NOT NULL DEFAULT 0,
  image_url text DEFAULT '',
  is_available boolean DEFAULT true,
  is_special boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  is_bar_item boolean DEFAULT false,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "menu_select_public" ON menu_items;
CREATE POLICY "menu_select_public" ON menu_items FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "menu_insert" ON menu_items;
CREATE POLICY "menu_insert" ON menu_items FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "menu_update" ON menu_items;
CREATE POLICY "menu_update" ON menu_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "menu_delete" ON menu_items;
CREATE POLICY "menu_delete" ON menu_items FOR DELETE TO authenticated USING (true);

-- ============ PRICE HISTORY ============
CREATE TABLE IF NOT EXISTS price_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  old_price numeric NOT NULL,
  new_price numeric NOT NULL,
  changed_by text DEFAULT '',
  changed_at timestamptz DEFAULT now()
);
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "price_history_select" ON price_history;
CREATE POLICY "price_history_select" ON price_history FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "price_history_insert" ON price_history;
CREATE POLICY "price_history_insert" ON price_history FOR INSERT TO authenticated WITH CHECK (true);

-- ============ BILLS ============
CREATE TABLE IF NOT EXISTS bills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_mobile text NOT NULL,
  table_number text DEFAULT '',
  num_guests int DEFAULT 0,
  special_notes text DEFAULT '',
  subtotal numeric NOT NULL DEFAULT 0,
  discount numeric NOT NULL DEFAULT 0,
  tax numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  payment_method text NOT NULL DEFAULT 'cash' CHECK (payment_method IN ('cash', 'upi', 'card', 'other')),
  status text NOT NULL DEFAULT 'paid' CHECK (status IN ('paid', 'cancelled')),
  counter_user_id uuid REFERENCES auth.users(id),
  counter_user_name text DEFAULT '',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "bills_select" ON bills;
CREATE POLICY "bills_select" ON bills FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "bills_insert" ON bills;
CREATE POLICY "bills_insert" ON bills FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "bills_update" ON bills;
CREATE POLICY "bills_update" ON bills FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "bills_delete" ON bills;
CREATE POLICY "bills_delete" ON bills FOR DELETE TO authenticated USING (true);

-- ============ BILL ITEMS ============
CREATE TABLE IF NOT EXISTS bill_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_id uuid REFERENCES bills(id) ON DELETE CASCADE,
  menu_item_id uuid,
  name text NOT NULL,
  price_at_purchase numeric NOT NULL,
  quantity int NOT NULL,
  total numeric NOT NULL
);
ALTER TABLE bill_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "bill_items_select" ON bill_items;
CREATE POLICY "bill_items_select" ON bill_items FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "bill_items_insert" ON bill_items;
CREATE POLICY "bill_items_insert" ON bill_items FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "bill_items_update" ON bill_items;
CREATE POLICY "bill_items_update" ON bill_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "bill_items_delete" ON bill_items;
CREATE POLICY "bill_items_delete" ON bill_items FOR DELETE TO authenticated USING (true);

-- ============ REVIEWS ============
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text text DEFAULT '',
  is_published boolean DEFAULT true,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "reviews_select_public" ON reviews;
CREATE POLICY "reviews_select_public" ON reviews FOR SELECT TO anon, authenticated USING (is_published = true OR auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "reviews_insert" ON reviews;
CREATE POLICY "reviews_insert" ON reviews FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "reviews_update" ON reviews;
CREATE POLICY "reviews_update" ON reviews FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "reviews_delete" ON reviews;
CREATE POLICY "reviews_delete" ON reviews FOR DELETE TO authenticated USING (true);

-- ============ GALLERY IMAGES ============
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  category text NOT NULL DEFAULT 'Resort & Garden',
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "gallery_select_public" ON gallery_images;
CREATE POLICY "gallery_select_public" ON gallery_images FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "gallery_insert" ON gallery_images;
CREATE POLICY "gallery_insert" ON gallery_images FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "gallery_update" ON gallery_images;
CREATE POLICY "gallery_update" ON gallery_images FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "gallery_delete" ON gallery_images;
CREATE POLICY "gallery_delete" ON gallery_images FOR DELETE TO authenticated USING (true);

-- ============ EVENT PACKAGES ============
CREATE TABLE IF NOT EXISTS event_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  capacity text DEFAULT '',
  description text DEFAULT '',
  starting_price numeric DEFAULT 0,
  image_url text DEFAULT '',
  amenities text DEFAULT '',
  availability text DEFAULT '',
  contact text DEFAULT '7030926868',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE event_packages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "events_select_public" ON event_packages;
CREATE POLICY "events_select_public" ON event_packages FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "events_insert" ON event_packages;
CREATE POLICY "events_insert" ON event_packages FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "events_update" ON event_packages;
CREATE POLICY "events_update" ON event_packages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "events_delete" ON event_packages;
CREATE POLICY "events_delete" ON event_packages FOR DELETE TO authenticated USING (true);

-- ============ ROOMS ============
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  amenities text DEFAULT '',
  price numeric DEFAULT 0,
  image_url text DEFAULT '',
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "rooms_select_public" ON rooms;
CREATE POLICY "rooms_select_public" ON rooms FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "rooms_insert" ON rooms;
CREATE POLICY "rooms_insert" ON rooms FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "rooms_update" ON rooms;
CREATE POLICY "rooms_update" ON rooms FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "rooms_delete" ON rooms;
CREATE POLICY "rooms_delete" ON rooms FOR DELETE TO authenticated USING (true);

-- ============ BUSINESS SETTINGS ============
CREATE TABLE IF NOT EXISTS business_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_name text DEFAULT 'Aamrai Resort',
  logo text DEFAULT '',
  tagline text DEFAULT 'Nature''s Escape on the NH4 Highway',
  phone text DEFAULT '7030906868',
  whatsapp text DEFAULT '7030926868',
  email text DEFAULT 'amruta9762@gmail.com',
  address text DEFAULT 'Pune Bangalore Highway, Shendre, Satara, Maharashtra 415002',
  opening_hours text DEFAULT '06:00 AM - 11:30 PM',
  bill_footer text DEFAULT 'Thank you for visiting Aamrai Resort. Visit Again - Dine - Relax - Celebrate',
  tax_percentage numeric DEFAULT 0,
  tax_enabled boolean DEFAULT false,
  gst_number text DEFAULT '',
  maps_link text DEFAULT 'https://www.google.com/maps/search/?api=1&query=Aamrai+Resort+Shendre+Satara',
  social_links jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "settings_select_public" ON business_settings;
CREATE POLICY "settings_select_public" ON business_settings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "settings_update" ON business_settings;
CREATE POLICY "settings_update" ON business_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- ============ STAFF ACTIVITY ============
CREATE TABLE IF NOT EXISTS staff_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  user_name text DEFAULT '',
  action text NOT NULL,
  bill_id uuid,
  amount numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE staff_activity ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "activity_select" ON staff_activity;
CREATE POLICY "activity_select" ON staff_activity FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "activity_insert" ON staff_activity;
CREATE POLICY "activity_insert" ON staff_activity FOR INSERT TO authenticated WITH CHECK (true);

-- ============ INDEXES ============
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_bills_created_at ON bills(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bills_status ON bills(status);
CREATE INDEX IF NOT EXISTS idx_bill_items_bill_id ON bill_items(bill_id);
CREATE INDEX IF NOT EXISTS idx_price_history_menu_item ON price_history(menu_item_id);