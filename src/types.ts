export interface DatabaseUser {
  id: string;
  name: string;
  role: 'admin' | 'counter';
  created_at: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  is_veg: boolean;
  price: number;
  image_url: string;
  is_available: boolean;
  is_special: boolean;
  is_featured: boolean;
  is_bar_item: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Bill {
  id: string;
  bill_number: string;
  customer_name: string;
  customer_mobile: string;
  table_number: string;
  num_guests: number;
  special_notes: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  payment_method: 'cash' | 'upi' | 'card' | 'other';
  status: 'paid' | 'cancelled';
  counter_user_id: string | null;
  counter_user_name: string;
  created_at: string;
  bill_items?: BillItem[];
}

export interface BillItem {
  id: string;
  bill_id: string;
  menu_item_id: string | null;
  name: string;
  price_at_purchase: number;
  quantity: number;
  total: number;
}

export interface Review {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  is_published: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  sort_order: number;
  created_at: string;
}

export interface EventPackage {
  id: string;
  name: string;
  capacity: string;
  description: string;
  starting_price: number;
  image_url: string;
  amenities: string;
  availability: string;
  contact: string;
  created_at: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  amenities: string;
  price: number;
  image_url: string;
  is_available: boolean;
  created_at: string;
}

export interface BusinessSettings {
  id: string;
  restaurant_name: string;
  logo: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  opening_hours: string;
  bill_footer: string;
  tax_percentage: number;
  tax_enabled: boolean;
  gst_number: string;
  maps_link: string;
  social_links: Record<string, string>;
  updated_at: string;
}

export interface PriceHistory {
  id: string;
  menu_item_id: string;
  old_price: number;
  new_price: number;
  changed_by: string;
  changed_at: string;
}

export interface StaffActivity {
  id: string;
  user_id: string | null;
  user_name: string;
  action: string;
  bill_id: string | null;
  amount: number;
  created_at: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Table {
  id: string;
  table_number: string;
  capacity: number;
  qr_code: string; // QR code data/URL
  status: 'available' | 'occupied';
  created_at: string;
}

export interface TableOrder {
  id: string;
  table_id: string;
  table_number: string;
  status: 'active' | 'completed' | 'pending_payment';
  customer_name: string;
  customer_mobile: string;
  num_guests: number;
  special_notes: string;
  items: TableOrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  created_at: string;
  completed_at: string | null;
  paid_at: string | null;
}

export interface TableOrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  name: string;
  price: number;
  quantity: number;
  status: 'pending' | 'preparing' | 'ready' | 'served';
  created_at: string;
}
