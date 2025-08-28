import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import { Order, type BreadcrumbItem, CartItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "History Pemesanan", href: "pemesanan/history" },
];

export default function CooperativeHistory() {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

const orders: Order[] = [
  {
    id_transaksi: "TRX-BUMN-20250818-001",
    id_koperasi: "KOP-00123",
    status: "Accepted",
    merchant_id: "MCH-001",
    merchant_name: "Toko Sembako Sejahtera",
    total_nominal: 2000000,
    remaining_credit: 10000000,
    is_for_sale: false,
    account_no: "1234567890",
    account_bank: "Bank Mandiri",
    payment_type: "cad",
    payment_method: "Mandiri Virtual Account",
    va_number: "880010012345678",
    timestamp: "2025-07-18T10:00:00Z",
    product_detail: [
      {
        nama_product: "Beras Premium 5kg",
        sku: "BR-001",
        kategori: "Sembako",
        harga_per_unit: 200000,
        satuan: "KARUNG",
        berat: 5000,
        dimensi: { panjang: 30, lebar: 20, tinggi: 15 },
        image: "/images/beras.jpg",
        description: "Beras kualitas premium langsung dari petani",
      },
      {
        nama_product: "Minyak Goreng 1L",
        sku: "MG-001",
        kategori: "Sembako",
        harga_per_unit: 15000,
        satuan: "BOTOL",
        berat: 1000,
        dimensi: { panjang: 10, lebar: 8, tinggi: 25 },
        image: "/images/minyak.jpg",
        description: "Minyak goreng sehat rendah kolesterol",
      },
    ],
  },
  {
    id_transaksi: "TRX-BUMN-20250618-002",
    id_koperasi: "KOP-00456",
    status: "On Deliver",
    merchant_id: "MCH-002",
    merchant_name: "Gudang Obat Sehat",
    total_nominal: 918000,
    remaining_credit: 8500000,
    is_for_sale: false,
    account_no: "9876543210",
    account_bank: "Bank BRI",
    payment_type: "cad",
    payment_method: "BRI Virtual Account",
    va_number: "880020009876543",
    timestamp: "2025-06-18T14:30:00Z",
    product_detail: [
      {
        nama_product: "Paracetamol 500mg",
        sku: "OBT-001",
        kategori: "Obat",
        harga_per_unit: 16400,
        satuan: "STRIP",
        berat: 100,
        dimensi: { panjang: 10, lebar: 5, tinggi: 2 },
      },
    ],
  },
  {
    id_transaksi: "TRX-BUMN-20250818-003",
    id_koperasi: "KOP-00789",
    status: "Pending",
    merchant_id: "MCH-003",
    merchant_name: "Apotek Nusantara",
    total_nominal: 199800,
    remaining_credit: 1200000,
    is_for_sale: false,
    account_no: "5678901234",
    account_bank: "Bank BCA",
    payment_type: "cad",
    payment_method: "BCA Virtual Account",
    va_number: "880030005678901",
    timestamp: "2025-08-18T08:15:00Z",
    product_detail: [
      {
        nama_product: "Vitamin C 100mg",
        sku: "OBT-002",
        kategori: "Suplemen",
        harga_per_unit: 16650,
        satuan: "BOX",
        berat: 50,
        dimensi: { panjang: 8, lebar: 4, tinggi: 2 },
      },
    ],
  },
];


  // 🔹 Filtering
  let filteredOrders = orders.filter((o) =>
    o.id_transaksi.toLowerCase().includes(search.toLowerCase())
  );
  if (statusFilter !== "ALL") {
    filteredOrders = filteredOrders.filter((o) => o.status === statusFilter);
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <div className="grid gap-6">
          {/* Cooperative Info */}
          <Card className="rounded-2xl shadow-md">
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Cooperative Information</h2>
                <p className="text-sm text-gray-500">Your Cooperative Information</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
                <span className="font-semibold">ID Koperasi</span> <span>KOP 001</span>
                <span className="font-semibold">Nama Koperasi</span> <span>Koperasi Desa Purwokerto</span>
                <span className="font-semibold">Penanggungjawab</span> <span>Agus Setiawan</span>
                <span className="font-semibold">Outlet</span> <span>Kimia Farma Alun alun Purwokerto</span>
                <span className="font-semibold">Alamat</span> <span>Jl Tanggung raya No.12</span>
                <span className="font-semibold">Waktu Pendaftaran</span>{" "}
                <span>Selasa, 12 Agustus 2025, 18:00</span>
              </div>
            </CardContent>
          </Card>

          {/* Orders */}
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">History Orders</h2>
                  <p className="text-sm text-gray-500">
                    Jumlah transaksi yang telah Anda lakukan adalah{" "}
                    <b>{orders.length} Transaksi</b>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                  {/* Search */}
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by Transaction ID..."
                      className="border rounded-lg pl-8 pr-3 py-2 text-sm w-full sm:w-64"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  {/* Filter Status */}
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[160px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Status</SelectItem>
                      <SelectItem value="Accepted">Accepted</SelectItem>
                      <SelectItem value="On Deliver">On Deliver</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Table (Desktop) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full text-sm border-collapse">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="px-4 py-2">Transaction ID</th>
                      <th className="px-4 py-2">Nama Pembeli</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Item QTY</th>
                      <th className="px-4 py-2">Total Price</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((o, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{o.id_transaksi}</td>
                        <td className="px-4 py-2">{o.merchant_name}</td>
                        <td className="px-4 py-2">{o.timestamp}</td>
                        <td className="px-4 py-2">{o.product_detail.reduce((acc, product) => acc + product.harga_per_unit, 0)}</td>
                        <td className="px-4 py-2">Rp {o.total_nominal.toLocaleString("id-ID")},00</td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              o.status === "Accepted"
                                ? "bg-green-100 text-green-700"
                                : o.status === "On Deliver"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card List (Mobile) */}
              <div className="grid grid-cols-1 gap-3 md:hidden">
                {filteredOrders.map((o, idx) => (
                  <div key={idx} className="border rounded-lg p-3 shadow-sm bg-white">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{o.id_transaksi}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          o.status === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : o.status === "On Deliver"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {o.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">👤 {o.merchant_name}</p>
                    <p className="text-sm text-gray-700">📅 {o.timestamp}</p>
                    {/* <p className="text-sm text-gray-700">📦 {o.qty} items</p> */}
                    <p className="text-sm font-bold text-gray-900">
                      💰 Rp {o.total_nominal.toLocaleString("id-ID")},00
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
