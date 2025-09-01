import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShoppingBag, CreditCard } from 'lucide-react';
import type { BreadcrumbItem, Order } from '@/types';


const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Order History", href: "/pemesanan/history" },
];

export default function History() {
  const { orders } = usePage<{ orders: Order[] }>().props;
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const statusColors: Record<string, string> = {
    Process: 'bg-yellow-100 text-yellow-700',
    'On Delivery': 'bg-blue-100 text-blue-700',
    Arrived: 'bg-green-100 text-green-700',
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id_transaksi.toLowerCase().includes(search.toLowerCase()) ||
      order.merchant_name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === 'Semua' ? true : order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Riwayat Transaksi" />

      <div className="min-h-screen px-4 md:px-16 py-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Riwayat Transaksi</h1>

        {/* FILTER */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <Input
            placeholder="Cari: ID Transaksi / Merchant"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Pilih Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Semua">Semua Status</SelectItem>
              <SelectItem value="Process">Process</SelectItem>
              <SelectItem value="On Delivery">On Delivery</SelectItem>
              <SelectItem value="Arrived">Arrived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* LIST CARD */}
        <div className="grid gap-6">
          {filteredOrders.map((order) => {
            const products = order.products ?? [];
            const showProducts = products.slice(0, 2);
            const moreCount = products.length > 2 ? products.length - 2 : 0;
            const totalQty = products.reduce((sum, p) => sum + (p.pivot?.quantity ?? 0), 0);

            return (
              <div
                key={order.id_transaksi}
                className="bg-white shadow rounded-2xl p-4 border"
              >
                {/* HEADER */}
                <div className="flex justify-between items-start border-b pb-2 mb-3">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-semibold">{order.id_transaksi}</p>
                      <p className="text-xs text-gray-500">{order.timestamp}</p>
                      <p className="text-xs text-gray-500">Total {totalQty} Items</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded font-medium ${
                      statusColors[order.status] ?? 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* BODY */}
                <div className="space-y-2 mb-3">
                  {showProducts.map((p) => (
                    <div key={p.sku} className="flex items-center gap-3">
                      {p.image && (
                        <img
                          src={p.image}
                          alt={p.nama_product}
                          className="w-12 h-12 rounded object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium">{p.nama_product}</p>
                        <p className="text-xs text-gray-500">
                          {p.sku} | Rp {p.harga_per_unit.toLocaleString()} / unit
                        </p>
                        <p className="text-xs text-gray-500">Qty: {p.pivot?.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {moreCount > 0 && (
                    <p className="text-xs text-gray-500">+{moreCount} produk lainnya</p>
                  )}
                </div>

                {/* FOOTER */}
                <div className="flex justify-between items-center border-t pt-3">
                  <div className="flex items-center gap-4">
                    <p className="font-semibold">
                      Total: Rp {order.total_nominal.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <CreditCard className="w-4 h-4" />
                      <span>{order.payment_method}</span>
                    </div>
                  </div>
                  <Button size="sm">Details</Button>
                </div>
              </div>
            );
          })}

          {filteredOrders.length === 0 && (
            <p className="text-gray-500 text-sm">Tidak ada transaksi ditemukan.</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
