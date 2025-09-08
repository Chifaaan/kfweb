import AppLayout from '@/layouts/app-layout';
import { Product, CartItem, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import FloatingCart from '@/components/FloatingCart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShoppingCart, Minus, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';


const MotionButton = motion(Button);

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Medicines', href: '/pemesanan/medicines' },
  { title: 'Product Detail', href: '#' },
];

export default function DetailProduct({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const totalItems = cart.length;
  const [animationTrigger, setAnimationTrigger] = useState(0);

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
    setAnimationTrigger(prev => prev + 1);
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };
  
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

                    {/* Button and Animations */}
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
                  
                  <div className="mt-8 border-t border-border">
                    <Accordion 
                      type="single" 
                      collapsible 
                      className="w-full pt-2" 
                      defaultValue="description"
                    >
                      <AccordionItem value="description">
                        <AccordionTrigger>Deskripsi</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {product.description || 'Tidak ada deskripsi untuk produk ini.'}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      {/* Pharmacology Information */}
                      <AccordionItem value="pharmacology">
                        <AccordionTrigger>Farmakologi</AccordionTrigger>
                        <AccordionContent>
                          {(() => {
                            let pharmacologyData: string[] = [];
                              if (typeof product.pharmacology === "string" && product.pharmacology.startsWith("[")) {
                                pharmacologyData = JSON.parse(product.pharmacology);
                              } 
                            if (pharmacologyData.length > 0) {
                              return (
                                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                  {pharmacologyData.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              );
                            }

                            return (
                              <p className="text-sm text-muted-foreground">
                                {typeof product.pharmacology === "string"
                                  ? product.pharmacology
                                  : "Tidak ada informasi farmakologi untuk produk ini."}
                              </p>
                            );
                          })()}
                        </AccordionContent>
                      </AccordionItem>

                      {/* Dosage Information */}
                      <AccordionItem value="dosage">
                        <AccordionTrigger>Aturan Pakai & Dosis</AccordionTrigger>
                        <AccordionContent>
                          {(() => {
                            let dosageData: Record<string, string> = {};

                            if (typeof product.dosage === "string" && product.dosage.startsWith("{")) {
                              dosageData = JSON.parse(product.dosage);
                            } 
                          
                            const dosageEntries = Object.entries(dosageData);

                            if (dosageEntries.length > 0) {
                              return (
                                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                  {dosageEntries.map(([key, value], index) => (
                                    <li key={index}>
                                      <strong>{key}:</strong> {value}
                                    </li>
                                  ))}
                                </ul>
                              );
                            }

                            return (
                              <p className="text-sm text-muted-foreground">
                                {typeof product.dosage === "string" && product.dosage.length > 0
                                  ? product.dosage
                                  : "Tidak ada informasi aturan pakai & dosis untuk produk ini."}
                              </p>
                            );
                          })()}
                        </AccordionContent>
                      </AccordionItem>
                      
                      {/*Informasi Kemasan*/}
                      <AccordionItem value="packaging">
                        <AccordionTrigger>Informasi Kemasan</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Brand Obat:</span>
                              <span className="font-semibold text-foreground">{product.brand || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Jenis Kemasan:</span>
                              <span className="font-semibold text-foreground">{product.base_uom || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Jumlah dalam Kemasan:</span>
                              <span className="font-semibold text-foreground">
                                {product.content ? `${product.content} ${product.base_uom}` : '-'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Packing Kemasan:</span>
                              <span className="font-semibold text-foreground">{product.order_unit || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Berat Kemasan:</span>
                              <span className="font-semibold text-foreground">
                                {product.weight ? `${product.weight} gram` : '-'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Dimensi Kemasan:</span>
                              <span className="font-semibold text-foreground">
                                {product.length && product.width && product.height 
                                  ? `${product.length} x ${product.width} x ${product.height} cm` 
                                  : '-'}
                              </span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Recommendations */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="py-6 md:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Rekomendasi Produk</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={relatedProduct.image || '/placeholder.jpg'}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover"
                    />
                    {relatedProduct.category?.main_category && (
                      <Badge className="absolute top-2 right-2">
                        {relatedProduct.category.main_category}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 truncate">{relatedProduct.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {relatedProduct.content} {relatedProduct.base_uom} / {relatedProduct.order_unit}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-lg font-bold text-primary">
                        Rp {relatedProduct.price.toLocaleString('id-ID')}
                      </p>
                      <Button asChild size="sm">
                        <Link href={route('medicines.show', { id: relatedProduct.id })}>
                          Detail
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart */}
      <FloatingCart totalItems={totalItems} animationTrigger={animationTrigger} />
    </AppLayout>
  );
};