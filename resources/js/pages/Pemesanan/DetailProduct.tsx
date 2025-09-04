import AppLayout from '@/layouts/app-layout';
import { Product, CartItem, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import FloatingCart from '@/components/FloatingCart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShoppingCart, Minus, Plus, Check } from 'lucide-react';
// Import Framer Motion
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Create a motion-enabled version of the ShadCN Button
const MotionButton = motion(Button);

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Medicines', href: '/pemesanan/medicines' },
  { title: 'Product Detail', href: '#' },
];

export default function DetailProduct({ product }: { product: Product }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  // The 'showTooltip' state is no longer needed
  const totalItems = cart.length;

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Reset button state and hide tooltip after a delay
  useEffect(() => {
    if (!isAdded) return;
    const timer = setTimeout(() => {
      setIsAdded(false);
    }, 2000); // The tooltip will disappear when isAdded becomes false
    return () => clearTimeout(timer);
  }, [isAdded]);

  // Add to cart
  const addToCart = (productToAdd: Product, quantityToAdd: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productToAdd.id);
      let newCart;
      if (existingItem) {
        newCart = prevCart.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item,
        );
      } else {
        const newCartItem: Omit<CartItem, 'total'> = { ...productToAdd, quantity: quantityToAdd };
        newCart = [...prevCart, newCartItem as CartItem];
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  // Handle quantity change
  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };
  
  // Simplified click handler
  const handleAddToCartClick = () => {
    if (isAdded) return;
    addToCart(product, quantity);
    setIsAdded(true);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={product.name} />

      <div className="py-6 md:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Product Image */}
                <div>
                  <img
                    src={product.image || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-auto object-cover rounded-lg aspect-square"
                  />
                </div>

                {/* Product Information */}
                <div className="flex flex-col">
                  {/* ... (Product Header, Price, etc. remain the same) ... */}
                  <div className="flex justify-between items-start gap-4">
                    <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">{product.name}</h1>
                    {product.category?.main_category && (<Badge variant="secondary" className="shrink-0 mt-1">{product.category.main_category}</Badge>)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{product.weight} gram / {product.base_uom}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-baseline gap-2"><p className="text-3xl lg:text-4xl font-bold text-primary">Rp {product.price.toLocaleString('id-ID')}</p><span className="text-sm text-muted-foreground">/ {product.order_unit}</span></div>
                    <div className='flex items-center gap-4'>
                      <p className="text-sm text-muted-foreground">{product.content} {product.base_uom} / {product.order_unit}</p>
                      {product.is_active ? (<Badge className="border-transparent bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900">Tersedia</Badge>) : (<Badge variant="destructive">Habis</Badge>)}
                    </div>
                  </div>

                  {/* Quantity & Add to Cart Button */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                    <div className="flex items-center border border-border rounded-md">
                      <Button variant="ghost" size="icon" className="h-11 w-11" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}><Minus className="h-4 w-4" /></Button>
                      <span className="w-12 text-center font-semibold">{quantity}</span>
                      <Button variant="ghost" size="icon" className="h-11 w-11" onClick={() => handleQuantityChange(1)}><Plus className="h-4 w-4" /></Button>
                    </div>

                    {/* --- UPDATED: Framer Motion Button with Custom Animated Tooltip --- */}
                    <div className="relative w-full sm:flex-1">
                      <AnimatePresence>
                        {isAdded && (
                          <motion.div
                            key="tooltip"
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-slate-50 dark:bg-slate-50 dark:text-slate-900"
                          >
                            Item ditambahkan!
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <MotionButton
                        size="lg"
                        className={`w-full h-11 relative overflow-hidden ${
                          isAdded ? 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-400' : ''
                        }`}
                        disabled={!product.is_active || isAdded}
                        onClick={handleAddToCartClick}
                        whileTap={{ scale: 0.95 }}
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={isAdded ? 'added' : 'default'}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-center"
                          >
                            {isAdded ? (<><Check className="mr-2 h-5 w-5" />Ditambahkan</>) : (<><ShoppingCart className="mr-2 h-5 w-5" />Tambahkan</>)}
                          </motion.span>
                        </AnimatePresence>
                      </MotionButton>
                    </div>

                  </div>
                  
                  {/* ... (Product Details Accordion remains the same) ... */}
                  <div className="mt-8 border-t border-border"><Accordion type="single" collapsible className="w-full pt-2" defaultValue="description"><AccordionItem value="description"><AccordionTrigger>Deskripsi</AccordionTrigger><AccordionContent><p className="text-sm text-muted-foreground leading-relaxed">{product.description || 'Tidak ada deskripsi untuk produk ini.'}</p></AccordionContent></AccordionItem><AccordionItem value="pharmacology"><AccordionTrigger>Farmakologi</AccordionTrigger><AccordionContent><p className="text-sm text-muted-foreground leading-relaxed">{product.pharmacology || 'Tidak ada informasi farmakologi untuk produk ini.'}</p></AccordionContent></AccordionItem><AccordionItem value="dosage"><AccordionTrigger>Aturan Pakai & Dosis</AccordionTrigger><AccordionContent>{Array.isArray(product.dosage) && product.dosage.length > 0 ? (<ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">{product.dosage.map((dose, index) => (<li key={index}>{dose}</li>))}</ul>) : (<p className="text-sm text-muted-foreground">Tidak ada informasi aturan pakai & dosis untuk produk ini.</p>)}</AccordionContent></AccordionItem></Accordion></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <FloatingCart totalItems={totalItems} />
    </AppLayout>
  );
};