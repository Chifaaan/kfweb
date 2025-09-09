import AppLayout from '@/layouts/app-layout';
import { CartItem, Product, type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import Filters from "@/components/Filters.jsx";
import ProductCard from "@/components/ProductCard.jsx";
import FloatingCart from '@/components/FloatingCart';
import { useState, useEffect } from "react";
import { ShoppingCart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Medicines', href: '/pemesanan'},
];

interface Props {
  products: {
    data: Product[];
    links: { url: string | null; label: string; active: boolean }[];
    meta: { current_page: number; last_page: number; total: number };
  };
  categories: string[];
  packages: string[];
  orderUnits: string[];
  filters: {
    category?: string;
    package?: string;
    orderUnit?: string;
    search?: string;
    sort?: string;
  };
}

export default function Index({ products, categories, packages, orderUnits, filters }: Props) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const [query, setQuery] = useState(filters);
  const [searchTerm, setSearchTerm] = useState(filters.search || "");

  useEffect(() => {
    setQuery(filters);
    setSearchTerm(filters.search || "");
  }, [filters]);

// 🔹 Jalan setiap kali searchTerm berubah
useEffect(() => {
  // hanya trigger kalau user benar-benar mengetik (bukan saat awal page load)
  if (searchTerm !== filters.search) {
    handleFilterChange({ search: searchTerm || undefined });
  }
}, [searchTerm]);

  // 🔹 jumlah jenis produk unik
  const totalItems = cart.length;

  // 🔹 Load cart dari localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // 🔹 Add to Cart
  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.name === product.name);
      let newCart;
      if (existing) {
        newCart = prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
    setAnimationTrigger(prev => prev + 1);
  };

// 🔹 Event handler filter
const handleFilterChange = (filterData: { category?: string; package?: string; orderUnit?: string; search?: string }) => {
  const newQuery = { ...query, ...filterData };

  // kalau search kosong/hilang, hapus dari query
  if (!newQuery.search) {
    delete newQuery.search;
  }

  setQuery(newQuery);

  router.get("medicines", newQuery, {
    preserveState: true,
    preserveScroll: true,
  });
};

  // 🔹 Event handler sorting
  const handleSortChange = (sortValue: string) => {
    const newQuery = { ...query, sort: sortValue };
    setQuery(newQuery);

    router.get("medicines", newQuery, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  // 🔹 Render pagination items
  const renderPaginationItems = () => {
    return products.links.map((link, index) => {
      if (link.label.includes('Previous')) {
        return (
          <PaginationItem key={index}>
            <PaginationPrevious href={link.url || '#'} />
          </PaginationItem>
        );
      } else if (link.label.includes('Next')) {
        return (
          <PaginationItem key={index}>
            <PaginationNext href={link.url || '#'} />
          </PaginationItem>
        );
      } else if (link.label === '...') {
        return (
          <PaginationItem key={index}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      } else {
        return (
          <PaginationItem key={index}>
            <PaginationLink 
              href={link.url || '#'} 
              isActive={link.active}
            >
              {link.label}
            </PaginationLink>
          </PaginationItem>
        );
      }
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Medicines" />
      <h1 className="text-2xl font-bold pt-6 ml-6 lg:ml-9  text-blue-800">Medicine Catalog</h1>
      <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-8 py-3">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4 w-full">
          <Filters 
            onFilterChange={handleFilterChange} 
            categories={categories} 
            packages={packages} 
            orderUnits={orderUnits} 
          />
        </div>

        {/* Product Section */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
            <input
              type="text"
              placeholder="Search Products..."
              className="w-full sm:w-1/2 border px-3 py-2 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // langsung update state
            />
            <Select value={query.sort || "name-asc"} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort Products" />
              </SelectTrigger>
              <SelectContent >
                <SelectItem value="name-asc">A → Z</SelectItem>
                <SelectItem value="name-desc">Z → A</SelectItem>
                <SelectItem value="lowest">Lowest Price</SelectItem>
                <SelectItem value="highest">Highest Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Produk */}
          {products.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <ShoppingCart size={64} className="mb-4 text-gray-400" />
              <p className="text-lg font-medium">Produk yang anda cari tidak ditemukan</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.data.map((p, i) => (
                  <div key={i} className="cursor-pointer">
                    <ProductCard product={p} addToCart={addToCart} />
                  </div>
                ))}
              </div>

              {/* 🔹 Pagination */}
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    {renderPaginationItems()}
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 🔹 Floating Cart Button */}
      <FloatingCart totalItems={totalItems} animationTrigger={animationTrigger} />
    </AppLayout>
  );
}
