import AppLayout from '@/layouts/app-layout';
import { Head, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'; // <-- Import Card components
import { cn } from '@/lib/utils';
import { ShoppingBag, CreditCard, Calendar as CalendarIcon, Filter, Info } from 'lucide-react';
import { format } from 'date-fns';
import type { BreadcrumbItem, Order } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Order History', href: '/pemesanan/history' },
];

const statusFilters = ['Semua', 'Process', 'On Delivery', 'Received'];

export default function History() {
  const { orders } = usePage<{ orders: Order[] }>().props;

  // --- STATE MANAGEMENT ---
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); // <-- NEW: State for the selected order

  const statusColors: Record<string, string> = {
    Process: 'bg-yellow-100 text-yellow-700',
    'On Delivery': 'bg-blue-100 text-blue-700',
    Received: 'bg-green-100 text-green-700',
  };

  // --- FILTERING & SORTING LOGIC (Unchanged) ---
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'Semua' ? true : order.status === filterStatus;
    const matchesDate = !selectedDate
      ? true
      : new Date(order.timestamp).toDateString() === selectedDate.toDateString();
    const matchesSearch =
      searchQuery.trim() === ''
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
  
  // --- RENDER ---
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Riwayat Transaksi" />

      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Riwayat Transaksi</h1>

        {/* --- FILTER & SORT SECTION (Unchanged) --- */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full lg:w-auto">
            <div className="block lg:hidden w-full">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2 text-gray-500" />
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
            <Input
              type="text"
              placeholder="Cari ID / Merchant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full lg:w-64"
            />
          </div>
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
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus className="lg:w-50" />
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

        {/* --- NEW: MASTER-DETAIL LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: Transaction List (Master View) --- */}
          <div className="lg:col-span-1">
            <div className="space-y-3">
              {sortedAndFilteredOrders.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800">Tidak Ada Transaksi</h3>
                  <p className="text-gray-500 text-sm mt-1">Coba ubah filter atau pencarian Anda.</p>
                </div>
              ) : (
                sortedAndFilteredOrders.map((order) => (
                  <button
                    key={order.id_transaksi}
                    onClick={() => setSelectedOrder(order)}
                    className={cn(
                      'w-full text-left p-4 border rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                      selectedOrder?.id_transaksi === order.id_transaksi && 'bg-primary/10 border-primary shadow-sm'
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{order.id_transaksi}</p>
                        <p className="text-xs text-gray-500">{order.merchant_name}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium whitespace-nowrap ${statusColors[order.status] ?? 'bg-gray-100 text-gray-700'}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">{format(new Date(order.timestamp), 'd MMM yyyy, HH:mm')}</p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* --- RIGHT COLUMN: Transaction Details (Detail View) --- */}
          <div className="lg:col-span-2">
            {selectedOrder ? (
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <ShoppingBag className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{selectedOrder.id_transaksi}</p>
                        <p className="text-sm text-gray-500">{selectedOrder.merchant_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0 w-full sm:w-auto">
                       <p className="text-xs text-gray-500 text-right">
                        {format(new Date(selectedOrder.timestamp), 'd MMM yyyy, HH:mm')}
                       </p>
                       <span className={`px-2 py-1 text-xs rounded-full font-medium whitespace-nowrap ${statusColors[selectedOrder.status] ?? 'bg-gray-100 text-gray-700'}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(() => {
                    const products = selectedOrder.products ?? [];
                    const showProducts = products.slice(0, 3); // Show 3 for more space
                    const moreCount = products.length > 3 ? products.length - 3 : 0;
                    
                    return <>
                      {showProducts.map((p) => (
                        <div key={p.sku} className="flex items-center gap-4">
                          {p.image ? (
                            <img src={p.image} alt={p.name} className="w-14 h-14 rounded-lg object-cover" />
                          ) : (
                            <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center">
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
                    </>;
                  })()}
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-gray-50/75 p-4 rounded-b-lg">
                   <div className="flex items-center justify-between sm:justify-start sm:gap-4 w-full">
                      <div className="flex items-center gap-1.5 text-sm text-gray-700">
                        <CreditCard className="w-4 h-4" />
                        <span>{selectedOrder.payment_method}</span>
                      </div>
                      <p className="font-semibold text-base">
                        Rp {selectedOrder.total_nominal.toLocaleString()}
                      </p>
                    </div>
                    <Link href={route('history.show', selectedOrder.id_transaksi)} className='w-full sm:w-auto'>
                      <Button size="sm" className='w-full'>Lihat Detail Lengkap</Button>
                    </Link>
                </CardFooter>
              </Card>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-gray-50 rounded-lg border-2 border-dashed">
                <Info className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-800">Pilih Transaksi</h3>
                <p className="text-gray-500 text-sm mt-1">Pilih sebuah transaksi dari daftar di sebelah kiri untuk melihat detailnya.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}