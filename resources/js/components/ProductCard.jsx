import React from "react";
import { ShoppingCart, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product, addToCart, showDetailButton = false, compact = false }) {
  const { 
    id,
    name,
    price,
    weight,
    base_uom,
    order_unit,
    image,
    is_active,
    content,
    category,
  } = product;

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const cardVariants = {
    hover: { 
      y: compact ? -3 : -5,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const imageVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  if (compact) {
    return (
      <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border rounded-lg p-2 shadow-sm transition-colors flex flex-col justify-between h-full relative cursor-pointer"
          onClick={() => window.location.href = route('medicines.show', { id })}
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
      >
        
        {/* Floating Category Badge */}
        {category?.main_category && (
          <span className="absolute top-1 right-1 text-xs px-1 py-0.5 rounded-full bg-blue-100 text-blue-800 whitespace-nowrap shadow">
            {category.main_category}
          </span>
        )}

        {/* Bagian Atas */}
        <div>
          <motion.img
            src={image}
            alt={name}
            className="w-full h-24 object-cover rounded-md mb-2"
            variants={imageVariants}
            whileHover="hover"
          />

          <h3 className="font-semibold leading-tight text-xs mb-1">
            {name.length > 16 ? name.slice(0, 16) + "..." : name}
          </h3>

          <span className="text-xs text-muted-foreground block">
            {content} {base_uom} per {order_unit}
          </span>

          <p className="text-xs text-gray-500 mt-1">
            Status:{" "}
            {is_active ? (
              <span className="font-semibold text-blue-600">Tersedia</span>
            ) : (
              <span className="font-semibold text-red-600">HABIS</span>
            )}
          </p>
        </div>

        {/* Bagian Bawah */}
        <div className="mt-2">
          <p className="text-sm font-bold text-blue-600">
            Rp {price?.toLocaleString('id-ID') ?? "0"}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border rounded-lg p-3 shadow-sm transition-colors flex flex-col justify-between h-full relative cursor-pointer"
        onClick={() => window.location.href = route('medicines.show', { id })}
        variants={cardVariants}
        whileHover="hover"
        whileTap="tap"
    >
      
      {/* Floating Category Badge */}
      {category?.main_category && (
        <span className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 whitespace-nowrap shadow">
          {category.main_category}
        </span>
      )}

      {/* Bagian Atas */}
      <div>
        <motion.img
          src={image}
          alt={name}
          className="w-full h-36 object-cover rounded-md mb-4"
          variants={imageVariants}
          whileHover="hover"
        />

        <h3 className="font-semibold leading-tight text-sm md:text-base mb-1">
          {name.length > 16 ? name.slice(0, 16) + "..." : name}
        </h3>

        <span className="text-xs text-muted-foreground block">
          {content} {base_uom} per {order_unit}
        </span>

        <p className="text-sm text-gray-500 mt-1">
          Status:{" "}
          {is_active ? (
            <span className="font-semibold text-blue-600">Tersedia</span>
          ) : (
            <span className="font-semibold text-red-600">HABIS</span>
          )}
        </p>
      </div>

      {/* Bagian Bawah */}
      <div className="mt-3">
        <p className="text-lg md:text-xl font-bold text-blue-600">
          Rp {price?.toLocaleString('id-ID') ?? "0"}
        </p>

        <div className="mt-2">
            <motion.button
              disabled={!is_active && !showDetailButton}
              onClick={(e) => {
                e.stopPropagation();
                if (showDetailButton) {
                  window.location.href = route('medicines.show', { id });
                } else {
                  addToCart(product);
                }
              }}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded text-white font-semibold transition-colors ${
                showDetailButton 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : is_active
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {showDetailButton ? (
                <>
                  <Eye size={16} /> Check Detail Product
                </>
              ) : (
                <>
                  <ShoppingCart size={16} /> Add to Cart
                </>
              )}
            </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
