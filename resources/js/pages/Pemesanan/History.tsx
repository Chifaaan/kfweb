import AppLayout from '@/layouts/app-layout';
import { Head, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input'; // <-- Import Input
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ShoppingBag, CreditCard, Calendar as CalendarIcon, Filter } from 'lucide-react';
import { format } from 'date-fns';
import type { BreadcrumbItem, Order } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Order History', href: '/pemesanan/history' },
];

const statusFilters = ['Semua', 'Process', 'On Delivery', 'Received'];

export default function History() {
  const { orders } = usePage<{ orders: Order[] }>().props;

  const [filterStatus, setFilterStatus] = useState('Semua');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [searchQuery, setSearchQuery] = useState(''); // <-- State untuk search bar

  const statusColors: Record<string, string> = {
    Process: 'bg-yellow-100 text-yellow-700',
    'On Delivery': 'bg-blue-100 text-blue-700',
    Received: 'bg-green-100 text-green-700',
  };

  const filteredOrders = orders.filter((order) => {
    // Filter status
    const matchesStatus = filterStatus === 'Semua' ? true : order.status === filterStatus;
    
    // Filter tanggal
    const matchesDate = !selectedDate
      ? true
      : new Date(order.timestamp).toDateString() === selectedDate.toDateString();

    // Filter pencarian (search)
    const matchesSearch = searchQuery.trim() === '' 
      ? true 
      : order.id_transaksi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.merchant_name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesDate && matchesSearch;
  });

  const sortedAndFilteredOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      case 'highest_total':
        return b.total_nominal - a.total_nominal;
      case 'lowest_total':
        return a.total_nominal - b.total_nominal;
      case 'newest':
      default:
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Riwayat Transaksi" />

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Riwayat Transaksi</h1>

        {/* --- FILTER & SORT SECTION --- */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">
          
          {/* Grup Kiri (Desktop): Status Filter & Search Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full lg:w-auto">
            {/* Filter Status (Mobile: Select, Desktop: Tabs) */}
            <div className="block lg:hidden w-full">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2 text-gray-500"/>
                  <SelectValue placeholder="Filter status..." />
                </SelectTrigger>
                <SelectContent>
                  {statusFilters.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === 'Semua' ? 'Semua Status' : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="hidden lg:block">
              <Tabs value={filterStatus} onValueChange={setFilterStatus}>
                <TabsList>
                  {statusFilters.map((status) => (
                    <TabsTrigger key={status} value={status}>
                      {status}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            
            {/* Search Bar (Terlihat di semua ukuran layar) */}
            <Input
              type="text"
              placeholder="Cari ID / Merchant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full lg:w-64"
            />
          </div>
          
          {/* Grup Kanan (Desktop): Tanggal & Sorting */}
          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn('w-full justify-start text-left font-normal', !selectedDate && 'text-muted-foreground')}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'd MMM yyyy') : <span>Pilih Tanggal</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus className='lg:w-50'/>
              </PopoverContent>
            </Popover>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-56 h-full">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Terbaru</SelectItem>
                <SelectItem value="oldest">Terlama</SelectItem>
                <SelectItem value="highest_total">Total Tertinggi</SelectItem>
                <SelectItem value="lowest_total">Total Terendah</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* --- LIST CARD SECTION --- */}
        <div className="grid gap-6">
          {sortedAndFilteredOrders.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed rounded-lg">
              <h3 className="text-lg font-medium text-gray-800">Tidak Ada Transaksi Ditemukan</h3>
              <p className="text-gray-500 text-sm mt-1">
                Coba ubah kata kunci pencarian atau filter Anda.
              </p>
            </div>
          ) : (
            sortedAndFilteredOrders.map((order) => {
              const products = order.products ?? [];
              const showProducts = products.slice(0, 2);
              const moreCount = products.length > 2 ? products.length - 2 : 0;
              const totalQty = products.reduce((sum, p) => sum + (p.pivot?.quantity ?? 0), 0);
              const orderDateFormatted = format(new Date(order.timestamp), 'd MMM yyyy, HH:mm');

              return (
                <div key={order.id_transaksi} className="bg-white shadow-sm rounded-2xl p-4 border">
                  {/* CARD HEADER */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start border-b pb-3 mb-3 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <ShoppingBag className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{order.id_transaksi}</p>
                        <p className="text-xs text-gray-500">{order.merchant_name}</p>
                      </div>
                    </div>
                    <div className='flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0'>
                      <div className='text-right sm:text-left'>
                        <p className="text-xs text-gray-500">{orderDateFormatted}</p>
                        <p className="text-xs text-gray-500">Total {totalQty} Items</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium whitespace-nowrap ${statusColors[order.status] ?? 'bg-gray-100 text-gray-700'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  {/* CARD BODY */}
                  <div className="space-y-3 mb-4">
                    {showProducts.map((p) => (
                      <div key={p.sku} className="flex items-center gap-3">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm leading-tight">{p.name}</p>
                          <p className="text-xs text-gray-500">Qty: {p.pivot?.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-600 ml-auto whitespace-nowrap">
                          Rp {(p.price * (p.pivot?.quantity ?? 0)).toLocaleString()}
                        </p>
                      </div>
                    ))}
                    {moreCount > 0 && (
                      <p className="text-xs text-gray-500 pt-1">+{moreCount} produk lainnya</p>
                    )}
                  </div>
                  {/* CARD FOOTER */}
                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center border-t pt-3 gap-3">
                    <div className="flex items-center justify-between sm:justify-start sm:gap-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-700">
                        <CreditCard className="w-4 h-4" />
                        <span>{order.payment_method}</span>
                      </div>
                      <p className="font-semibold text-base">
                        Rp {order.total_nominal.toLocaleString()}
                      </p>
                    </div>
                    <Link href={route('history.show', order.id_transaksi)} className='w-full sm:w-auto'>
                      <Button size="sm" className='w-full'>Details</Button>
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AppLayout>
  );
}