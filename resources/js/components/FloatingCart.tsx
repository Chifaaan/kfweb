import { ShoppingCart } from "lucide-react";
import { Link } from "@inertiajs/react";

interface FloatingCartProps {
  totalItems: number;
}

export default function FloatingCart({ totalItems }: FloatingCartProps) {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
      <Link href="/pemesanan/cart" className="relative">
        <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
          <ShoppingCart size={24} className="sm:size-8" />
        </button>

        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Link>
    </div>
  );
}
