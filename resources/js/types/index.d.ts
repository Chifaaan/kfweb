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

export interface CartItem {
  name: string;
  image: string;
  qty: string;
  packaging: string;
  price: number;
  quantity: number;
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

export interface Product {
  name: string;
  price: number;
  stock: number;
  qty: string;
  category: string;
  packaging: string;
  image: string;
  description: string;
  benefit: string[];
  dosage: string;
}

export interface Order {
  id: string;
  buyer: string;
  date: string;
  qty: number;
  price: number;
  status: string;
}