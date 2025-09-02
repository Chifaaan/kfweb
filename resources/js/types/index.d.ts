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
  nama_product: string;
  sku: string;
  kategori: string;        
  harga_per_unit: number;
  satuan: string;           
  berat: number;            
  dimensi: {                
    panjang: number;
    lebar: number;
    tinggi: number;
  };
  image?: string;
  description?: string;    
  benefit?: string[];      
  dosage?: string;   
  stok?: number;      
}

export interface Order {
  id_transaksi: string;
  id_koperasi: string;
  status: string;
  merchant_id: string;
  merchant_name: string;
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
}

export interface OrderPayload {
  id_transaksi: string;
  id_koperasi: string;
  status: string;
  merchant_id: string;
  merchant_name: string;
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