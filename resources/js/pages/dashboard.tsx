import { Card, CardContent } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import {
  Pill,
  HeartPulse,
  Syringe,
  Stethoscope,
  Star,
  ShoppingBag,
  Award,
  Shield,
} from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/dashboard" },
];

export default function Dashboard() {
  // 🔹 Produk premium apotek
  const products = [
    {
      id: 1,
      name: "Paracetamol Premium 500mg",
      category: "Obat",
      desc: "Farmasi Terpercaya • Strip isi 10 tablet",
      price: 25000,
      originalPrice: 30000,
      img: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D",
      rating: 4.8,
      sold: 1250,
    },
    {
      id: 2,
      name: "Vitamin C Ultra 1000mg",
      category: "Vitamin",
      desc: "Import Quality • Botol isi 30 tablet",
      price: 55000,
      originalPrice: 70000,
      img: "https://plus.unsplash.com/premium_photo-1668487826666-baa00865bc13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1lZGljaW5lfGVufDB8fDB8fHww",
      rating: 4.9,
      sold: 890,
    },
    {
      id: 3,
      name: "Herbal Cough Relief Syrup",
      category: "Obat",
      desc: "100% Natural • Botol 100ml",
      price: 45000,
      originalPrice: 50000,
      img: "https://plus.unsplash.com/premium_photo-1681996310528-4e7076eb397c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVkaWNpbmUlMjBzeXJ1cHxlbnwwfHwwfHx8MA%3D%3D",
      rating: 4.7,
      sold: 650,
    },
    {
      id: 4,
      name: "Premium Medical Mask (50pcs)",
      category: "Alat Kesehatan",
      desc: "3-Layer Protection • 1 Box Masker",
      price: 75000,
      originalPrice: 85000,
      img: "https://images.unsplash.com/photo-1622631090360-ba04acd2e02f?q=80&w=1087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.6,
      sold: 2100,
    },
    {
      id: 5,
      name: "Antibacterial Sanitizer 100ml",
      category: "Alat Kesehatan",
      desc: "99.9% Effective • Botol pump",
      price: 35000,
      originalPrice: 40000,
      img: "https://images.unsplash.com/photo-1608564348103-2b78891150cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhbml0aXplcnxlbnwwfHwwfHx8MA%3D%3D",
      rating: 4.8,
      sold: 1800,
    },
    {
      id: 6,
      name: "Vitamin D3 Ultra 5000IU",
      category: "Vitamin",
      desc: "High Potency • Botol isi 60 tablet",
      price: 65000,
      originalPrice: 80000,
      img: "https://images.unsplash.com/photo-1611073061835-e77b1b16d3f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dml0YW1pbnxlbnwwfHwwfHx8MA%3D%3D",
      rating: 4.9,
      sold: 430,
    },
    {
      id: 7,
      name: "Complete Flu Relief",
      category: "Obat",
      desc: "Fast Acting • Strip isi 12 tablet",
      price: 38000,
      originalPrice: 45000,
      img: "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVkaWNpbmUlMjBib3h8ZW58MHx8MHx8fDA%3D",
      rating: 4.5,
      sold: 920,
    },
    {
      id: 8,
      name: "Digital Smart Thermometer",
      category: "Alat Kesehatan",
      desc: "Contactless • Alat cek suhu",
      price: 125000,
      originalPrice: 150000,
      img: "https://plus.unsplash.com/premium_photo-1722686484485-97bd7090ba42?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGhlcm1vbWV0ZXJ8ZW58MHx8MHx8fDA%3D",
      rating: 4.9,
      sold: 340,
    },
  ];

  const [activeCategory, setActiveCategory] = useState("Semua");
  const categories = ["Semua", "Obat", "Vitamin", "Alat Kesehatan"];

  // 🔹 Luxury category cards
  const categoryCards = [
    {
      name: "Obat",
      desc: "Resep & Bebas Terlengkap",
      icon: Pill,
      gradient: "from-blue-600 to-blue-800",
    },
    {
      name: "Vitamin",
      desc: "Suplemen Premium Import",
      icon: HeartPulse,
      gradient: "from-emerald-600 to-emerald-800",
    },
    {
      name: "Alat Kesehatan",
      desc: "Teknologi Medis Terdepan",
      icon: Stethoscope,
      gradient: "from-purple-600 to-purple-800",
    },
    {
      name: "Vaksin",
      desc: "Kesehatan Preventif Terbaik",
      icon: Syringe,
      gradient: "from-rose-600 to-rose-800",
    },
  ];

  const filteredProducts =
    activeCategory === "Semua"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Premium Pharmacy Dashboard" />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        <div className="flex flex-col gap-20 p-4 md:p-8 max-w-7xl mx-auto">
          {/* 🔹 Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900"></div>
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 md:py-20">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="max-w-2xl text-center md:text-left"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6 shadow-md">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-white/90 text-sm font-medium">
                    Kimia Farma Apotek
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
                  <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Premium Health
                  </span>
                  <br />
                  <span className="text-white">Experience</span>
                </h1>

                <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, libero!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600 font-bold shadow-lg px-8 py-6 rounded-2xl text-lg hover:shadow-yellow-300/50 transition-all">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Mulai Belanja Premium
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-white/30 text-black hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-6 rounded-2xl text-lg"
                  >
                    Konsultasi Gratis
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 60, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative mt-12 md:mt-0"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
                  alt="Premium Pharmacy"
                  className="relative w-[260px] md:w-[420px] drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* 🔹 Kategori Premium */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Kategori Produk</h2>
              <p className="text-slate-600">Pilihan terbaik untuk kesehatan keluarga Anda</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categoryCards.map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                  whileHover={{ y: -8, scale: 1.05 }}
                >
                  <Card className="relative overflow-hidden rounded-3xl border-0 shadow-xl hover:shadow-2xl group transition-all duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-90`}></div>
                    <CardContent className="relative z-10 flex flex-col items-center justify-center text-center p-8 text-white">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        <cat.icon className="w-8 h-8" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{cat.name}</h3>
                      <p className="text-sm text-white/80">{cat.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 🔹 Carousel Produk */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Produk Terlaris</h2>
              <p className="text-slate-600">Pilihan favorit pelanggan premium kami</p>
            </div>
            <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 4000 })]} className="w-full">
              <CarouselContent className="-ml-4">
                {products.map((p) => (
                  <CarouselItem key={p.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <motion.div whileHover={{ y: -4 }} className="h-full group">
                      <Card className="h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border-0 bg-white/80 backdrop-blur-sm relative">
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                        <div className="relative overflow-hidden">
                          <img src={p.img} alt={p.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">-{Math.round((1 - p.price / p.originalPrice) * 100)}%</div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-slate-800 mb-2 line-clamp-1">{p.name}</h3>
                          <p className="text-sm text-slate-500 mb-3 line-clamp-2">{p.desc}</p>
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-lg font-bold text-blue-600">Rp {p.price.toLocaleString("id-ID")}</span>
                            <span className="text-sm text-slate-400 line-through">Rp {p.originalPrice.toLocaleString("id-ID")}</span>
                          </div>
                          <p className="text-xs text-slate-500 mb-4">{p.sold.toLocaleString()} terjual</p>
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-2xl shadow-md">
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Tambah ke Keranjang
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 bg-white/90 backdrop-blur-sm border-0 shadow-lg" />
              <CarouselNext className="right-0 bg-white/90 backdrop-blur-sm border-0 shadow-lg" />
            </Carousel>
          </motion.div>

          {/* 🔹 Grid Produk */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Katalog Premium</h2>
              <p className="text-slate-600">Jelajahi koleksi lengkap produk berkualitas tinggi</p>
            </div>
            <div className="flex gap-3 mb-8 justify-center flex-wrap">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105"
                      : "border-2 border-blue-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300"
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Card className="rounded-3xl border-0 shadow-xl hover:shadow-2xl flex flex-col h-full bg-white/90 backdrop-blur-sm overflow-hidden relative">
                    {/* Shine hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                    <div className="relative overflow-hidden">
                      <img src={p.img} alt={p.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">-{Math.round((1 - p.price / p.originalPrice) * 100)}%</div>
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {p.rating}
                      </div>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-slate-800 mb-2 line-clamp-1">{p.name}</h3>
                      <p className="text-sm text-slate-500 mb-3 line-clamp-2 flex-1">{p.desc}</p>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg font-bold text-blue-600">Rp {p.price.toLocaleString("id-ID")}</span>
                        <span className="text-sm text-slate-400 line-through">Rp {p.originalPrice.toLocaleString("id-ID")}</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-4">{p.sold.toLocaleString()} terjual</p>
                      <Button className="w-full mt-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-2xl shadow-md">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Tambah ke Keranjang
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
