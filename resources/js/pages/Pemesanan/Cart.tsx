import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { type BreadcrumbItem, CartItem } from '@/types';
import { ShoppingBag } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Medicines', href: '/pemesanan/medicines' },
  { title: 'Cart', href: '/pemesanan/cart' },
];

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  const updateQuantity = (name: string, delta: number) => {
    const updated = cart
      .map((item) =>
        item.name === name
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (name: string) => {
    const updated = cart.filter((item) => item.name !== name);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const ppn = subtotal * 0.11;
  const grandTotal = subtotal + ppn;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Cart" />
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-800">🛒 Shopping Cart</h1>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="px-3 py-1 sm:px-4 sm:py-2 text-red-600 hover:text-red-800 text-sm sm:text-base"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Empty state */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 text-center px-4">
            <ShoppingBag size={60} className="mb-4 sm:size-80" />
            <p className="text-lg sm:text-xl font-medium">Anda belum memesan barang apapun</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* List item */}
            {cart.map((item, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row justify-between sm:items-center border p-4 rounded-lg shadow-sm gap-4"
              >
                {/* Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-base sm:text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-600">
                      {item.qty} | {item.packaging}
                    </p>
                    <p className="text-blue-600 font-bold text-sm sm:text-base">
                      Rp {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => updateQuantity(item.name, -1)}
                    className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.name, 1)}
                    className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.name)}
                    className="ml-2 sm:ml-4 text-red-600 hover:text-red-800 text-sm sm:text-base"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="flex flex-col items-end mt-6 space-y-2 text-sm sm:text-base">
              <div className="flex justify-between w-full sm:w-80 text-gray-700">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between w-full sm:w-80 text-gray-700">
                <span>PPN (11%)</span>
                <span>Rp {ppn.toLocaleString()}</span>
              </div>
              <div className="flex justify-between w-full sm:w-80 border-t pt-2 mt-2 text-lg sm:text-xl font-bold text-blue-800">
                <span>Total</span>
                <span>Rp {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout */}
            <div className="text-right mt-6">
              <Link href={route("po")} className="inline-block">
                <button className="bg-green-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-green-700 w-full sm:w-auto">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Back to catalog */}
        <div className="mt-6">
          <Link
            href="/pemesanan/medicines"
            className="inline-block text-blue-600 hover:underline"
          >
            ← Kembali ke katalog
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
