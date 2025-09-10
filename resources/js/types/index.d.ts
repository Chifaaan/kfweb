import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export type NavSection = {
  title: string;     // 👈 Label section (Pembelian / Penjualan)
  items: NavItem[];
  isActive?: boolean;
}

export type ProductPivot = {
  id: number;
  sku: string;
  name: string;
  price: number;
  image?: string;
  pivot?: { quantity: number };
};

export type BuyerAddress = {
  recipient_name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  phone?: string;
};

export interface Apotek {
  id: string;
  branch: string;
  sap_id: string;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  zipcode: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  [key: string]: unknown;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown; // This allows for additional properties...
}

export interface CartItem extends Product {
  quantity: number;
  total: number;
}
export interface Product {
  id: number;
  sku: string;
  name: string;
  slug: string;
  category_id?: number;
  price: number;
  weight: number;
  length?: number;
  width?: number;
  height?: number;
  base_uom: string;
  order_unit: string;
  content: number;
  brand?: string;
  image?: string;
  description?: string;
  dosage?: string;
  pharmacology?: string;
  image_alt?: string;
  is_active?: boolean;
  is_featured?: boolean;
  category?: {
    main_category: string;
  };
}

export interface Order {
  id_transaksi: string;
  id_koperasi: string;
  status: string;
  merchant_id: string;
  merchant_name: string;
  subTotal: number;
  total_nominal: number;
  remaining_credit: number;
  is_for_sale: boolean;
  account_no: string;
  account_bank: string;
  payment_type: string;
  payment_method: string;
  va_number: string;
  timestamp: string;
  products?: (Product & { pivot?: { quantity: number } })[];
    product_detail: {
    sku: string;
    quantity: number;
  }[]; //Relasi ke Product
  created_at: string;
  apotek?: Apotek;
}

export interface OrderPayload {
  id_transaksi: string;
  id_koperasi: string;
  status: string;
  merchant_id: string;
  merchant_name: string;
  subTotal: number;
  total_nominal: number;
  remaining_credit: number;
  is_for_sale: boolean;
  account_no: string;
  account_bank: string;
  payment_type: string;
  payment_method: string;
  va_number: string;
  timestamp: string;
  product_detail: {
    sku: string;
    quantity: number;
  }[];
}

export interface FiltersProps {
  categories: string[];
  packages: string[];
  orderUnits: string[];
  onFilterChange: (filters: {
    categories: string[];
    packages: string[];
    orderUnits: string[];
  }) => void;
}
export interface Penerimaan {
  id: number;
  nomorSuratPemesanan: string;
  namaPengentri: string;
  kreditur: string;
  nomorFaktur: string;
  tglPenerimaan: string;
  tglFaktur: string;
  tglTerimaFisik: string;
  top: number;
  ppnType: "Include" | "Exclude"; // atau tambah jika ada opsi lain
}