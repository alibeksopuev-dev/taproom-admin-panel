-- ============================================
-- MIGRATION: Orders + Payment tables
-- Run AFTER the base schema (organizations, categories, menu_items, price_per_size)
-- ============================================

-- ============================================
-- PROFILES TABLE (extends Supabase Auth)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT,
  display_name TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- ORDERS TABLE
-- ============================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES auth.users(id),
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')),
  total_amount INTEGER NOT NULL CHECK (total_amount >= 0),
  currency TEXT DEFAULT 'VND',
  notes TEXT,
  table_number TEXT,
  payment_method TEXT CHECK (payment_method IN ('vietqr', 'vnpay', 'cash', 'whatsapp')),
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'processing', 'paid', 'refunded')),
  payment_reference TEXT,
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- ORDER ITEMS TABLE
-- ============================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id),
  item_name TEXT NOT NULL,
  size TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price INTEGER NOT NULL CHECK (unit_price >= 0),
  total_price INTEGER NOT NULL CHECK (total_price >= 0),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- PAYMENT TRANSACTIONS TABLE (audit trail)
-- ============================================
CREATE TABLE payment_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('vietqr', 'vnpay')),
  transaction_id TEXT,
  amount INTEGER NOT NULL CHECK (amount >= 0),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
  raw_response JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_orders_org ON orders(organization_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_payment_transactions_order ON payment_transactions(order_id);

-- ============================================
-- AUTO-GENERATE ORDER NUMBERS: TP-YYYYMMDD-NNN
-- ============================================
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
DECLARE
  today_date TEXT;
  daily_count INTEGER;
BEGIN
  today_date := to_char(NOW() AT TIME ZONE 'Asia/Ho_Chi_Minh', 'YYYYMMDD');

  SELECT COUNT(*) + 1 INTO daily_count
  FROM orders
  WHERE order_number LIKE 'TP-' || today_date || '-%';

  NEW.order_number := 'TP-' || today_date || '-' || lpad(daily_count::TEXT, 3, '0');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL OR NEW.order_number = '')
  EXECUTE FUNCTION generate_order_number();

-- ============================================
-- AUTO UPDATE TIMESTAMPS (reuse existing function)
-- ============================================
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES POLICIES
-- ============================================
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (id = auth.uid() OR is_super_admin());

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (id = auth.uid());

CREATE POLICY "Anyone can create a profile"
ON profiles FOR INSERT
WITH CHECK (true);

-- ============================================
-- ORDERS POLICIES
-- ============================================

-- SELECT: Public (customers see their own via app, admins see all)
CREATE POLICY "Orders are publicly viewable"
ON orders FOR SELECT
USING (true);

-- INSERT: Anyone can create orders (customers use anon key, no login required)
CREATE POLICY "Anyone can create orders"
ON orders FOR INSERT
WITH CHECK (true);

-- UPDATE: Organization owner OR super admin can update orders
CREATE POLICY "Owners can update own orders"
ON orders FOR UPDATE
USING (organization_id = auth.uid() OR is_super_admin());

-- DELETE: Only super admin
CREATE POLICY "Only super admins can delete orders"
ON orders FOR DELETE
USING (is_super_admin());

-- ============================================
-- ORDER ITEMS POLICIES
-- ============================================
CREATE POLICY "Order items are publicly viewable"
ON order_items FOR SELECT
USING (true);

CREATE POLICY "Anyone can create order items"
ON order_items FOR INSERT
WITH CHECK (true);

CREATE POLICY "Super admins can update order items"
ON order_items FOR UPDATE
USING (is_super_admin());

CREATE POLICY "Super admins can delete order items"
ON order_items FOR DELETE
USING (is_super_admin());

-- ============================================
-- PAYMENT TRANSACTIONS POLICIES
-- ============================================
CREATE POLICY "Payment transactions are viewable by super admins"
ON payment_transactions FOR SELECT
USING (is_super_admin());

CREATE POLICY "Anyone can create payment transactions"
ON payment_transactions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Super admins can update payment transactions"
ON payment_transactions FOR UPDATE
USING (is_super_admin());
