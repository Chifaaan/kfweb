import AppLayout from '@/layouts/app-layout';
import { CartItem, Product, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Filters from "@/components/Filters";
import ProductCard from "@/components/ProductCard";
import FloatingCart from '@/components/FloatingCart';
import { useState, useEffect } from "react";
import { ShoppingCart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Medicines', href: '/pemesanan/medicines'},
];

interface Props {
  products: Product[];
  categories: string[];
  packages: string[];
  orderUnits: string[]; // Add orderUnits to Props
}

interface FilterState {
  categories: string[];
  packages: string[];
  orderUnits: string[];
}

export default function Index({ products, categories, packages, orderUnits }: Props) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    packages: [],
    orderUnits: []
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [, setSelectedProduct] = useState<Product | null>(null);
  const [animationTrigger, setAnimationTrigger] = useState(0);

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

  // 🔹 filter berdasarkan search
  let filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // ambil filter aktif
  const activeCategories = filters.categories.filter((c) => c !== "Semua Produk");
  const activePackages = filters.packages.filter((p) => p !== "Semua Package");
  const activeOrderUnits = filters.orderUnits.filter((u) => u !== "Semua Unit");
  // 🔹 filter kategori & package
  if (!(activeCategories.length === 0 && activePackages.length === 0 && activeOrderUnits.length === 0)) {
    filteredProducts = filteredProducts.filter((p) => {
      const matchCategory =
        activeCategories.length === 0 || activeCategories.includes(String(p.category?.main_category));

      const matchPackage =
        activePackages.length === 0 || activePackages.includes(p.base_uom);

      const matchOrderUnit =
        activeOrderUnits.length === 0 || activeOrderUnits.includes(p.order_unit);

      return matchCategory && matchPackage && matchOrderUnit;
    });
  }

  // 🔹 sorting
  if (sortBy === "lowest") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "highest") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "name-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "name-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Medicines" />
      <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-8 py-6">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4 w-full">
          <Filters onFilterChange={setFilters} categories={categories} packages={packages} orderUnits={orderUnits} />
        </div>

        {/* Product Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4 text-blue-800">Medicine Catalog</h1>

          <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
            <input
              type="text"
              placeholder="Search Products..."
              className="w-full sm:w-1/2 border px-3 py-2 rounded-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort Products" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">A → Z</SelectItem>
                <SelectItem value="name-desc">Z → A</SelectItem>
                <SelectItem value="lowest">Lowest Price</SelectItem>
                <SelectItem value="highest">Highest Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Produk */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <ShoppingCart size={64} className="mb-4 text-gray-400" />
              <p className="text-lg font-medium">Produk yang anda cari tidak ditemukan</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((p, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedProduct(p)}
                  className="cursor-pointer"
                >
                  <ProductCard product={p} addToCart={addToCart} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Floating Cart Button */}
      <FloatingCart totalItems={totalItems} animationTrigger={animationTrigger} />
    </AppLayout>
  );
}