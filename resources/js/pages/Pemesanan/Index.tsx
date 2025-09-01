import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { CartItem, Product, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import Filters from "@/components/Filters";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { ShoppingCart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Medicines',
    href: '/pemesanan/medicines',
  },
];

interface Props extends Product {
  products: Product[];
}
export default function Index({ products }: Props) {



  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [filters, setFilters] = useState({ categories: ["Semua Produk"], packages: ["Semua Package"] });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // 🔹 modal state

  // 🔹 Hitung total item dalam cart
  const totalItems = cart.length; // jumlah jenis produk unik

  // 🔹 Load cart dari localStorage saat pertama kali render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // 🔹 Fungsi Add to Cart
  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.nama_product === product.nama_product);
      let newCart;
      if (existing) {
        newCart = prevCart.map((item) =>
          item.nama_product === product.nama_product
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }

      // Simpan ke localStorage
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };
    // 🔹 filter berdasarkan search
    let filteredProducts = products.filter((p) =>
      p.nama_product.toLowerCase().includes(search.toLowerCase())
    );

  // ambil filter aktif (tanpa "Semua")
  const activeCategories = filters.categories.filter((c) => c !== "Semua Produk");
  const activePackages = filters.packages.filter((p) => p !== "Semua Package");

  // 🔹 filter kategori & package
  if (!(activeCategories.length === 0 && activePackages.length === 0)) {
    filteredProducts = filteredProducts.filter((p) => {
      const matchCategory =
        activeCategories.length === 0 || activeCategories.includes(p.kategori);

      const matchPackage =
        activePackages.length === 0 || activePackages.includes(p.satuan);

      return matchCategory && matchPackage;
    });
  }

  // 🔹 sorting
  if (sortBy === "lowest") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.harga_per_unit - b.harga_per_unit);
  } else if (sortBy === "highest") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.harga_per_unit - a.harga_per_unit);
  } else if (sortBy === "name-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.nama_product.localeCompare(b.nama_product));
  } else if (sortBy === "name-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.nama_product.localeCompare(a.nama_product));
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Medicines" />
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4 w-full">
          <Filters onFilterChange={setFilters} />
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
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
        <a href="/pemesanan/cart" className="relative">
          <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
            <ShoppingCart size={24} className="sm:size-8" />
          </button>

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </a>
      </div>

{/* 🔹 Modal Detail Produk */}
<Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
  <DialogContent className="w-[95%] sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
    {selectedProduct && (
      <>
        <DialogHeader>
          <DialogTitle>{selectedProduct.nama_product}</DialogTitle>
          <DialogDescription>
            {selectedProduct.description || "Tidak ada deskripsi tersedia."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row gap-4">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.nama_product}
            className="w-full sm:w-1/3 rounded-lg border object-cover"
          />
          <div className="flex-1 space-y-2">
            <p><strong>Harga:</strong> Rp{selectedProduct.harga_per_unit.toLocaleString()}</p>
            <p><strong>Stok:</strong> {selectedProduct?.stok && selectedProduct.stok > 0 ? selectedProduct.stok : "Habis"}</p>
            <p><strong>Kategori:</strong> {selectedProduct.kategori}</p>
            <p><strong>Kemasan:</strong> {selectedProduct.satuan}</p>
            <p><strong>Kuantitas:</strong> {selectedProduct.berat}</p>
            <p><strong>Berat:</strong> {selectedProduct.berat} gr</p>
          </div>
        </div>

        {/* 🔹 Tabs untuk Benefit & Dosage */}
        <Tabs defaultValue="benefit" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="benefit">Benefit</TabsTrigger>
            <TabsTrigger value="dosage">Dosage</TabsTrigger>
          </TabsList>

          <TabsContent value="benefit" className="mt-2 text-sm text-gray-700">
            {selectedProduct.benefit && selectedProduct.benefit.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {selectedProduct.benefit.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              "Belum ada informasi benefit."
            )}
          </TabsContent>

          <TabsContent value="dosage" className="mt-2 text-sm text-gray-700">
            <div className="space-y-1">
              {(selectedProduct.dosage ?? "").split('. ').map((line: string, idx: number) => {
                const formatted = line
                  .replace(/Dewasa:/g, '<strong>Dewasa:</strong>')
                  .replace(/Anak-anak:/g, '<strong>Anak-anak:</strong>');
                return (
                  <p
                    key={idx}
                    dangerouslySetInnerHTML={{
                      __html: formatted + (line.endsWith('.') ? '' : '.'),
                    }}
                  />
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </>
    )}
  </DialogContent>
</Dialog>
    </AppLayout>
  );
}
