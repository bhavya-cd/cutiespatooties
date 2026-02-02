-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  brand TEXT,
  title TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  price TEXT NOT NULL,
  original_price TEXT,
  discount TEXT,
  rating DECIMAL(3, 2),
  rating_count INTEGER,
  sizes TEXT[] NOT NULL DEFAULT '{}',
  available_sizes TEXT[] NOT NULL DEFAULT '{}',
  images TEXT[] NOT NULL DEFAULT '{}',
  whatsapp_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_colors table
CREATE TABLE product_colors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  slug TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_colors ENABLE ROW LEVEL SECURITY;

-- Create policies (Public Read Access)
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on product_colors" ON product_colors FOR SELECT USING (true);

-- Create policies (Authenticated CRUD Access)
CREATE POLICY "Allow authenticated insert on products" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on products" ON products FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on products" ON products FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on product_colors" ON product_colors FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on product_colors" ON product_colors FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on product_colors" ON product_colors FOR DELETE TO authenticated USING (true);
