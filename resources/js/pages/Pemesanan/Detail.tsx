import React from 'react';
import { Head, usePage, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ArrowRight, Package, Truck, CheckCircle, ArrowLeft } from 'lucide-react';
import type { BreadcrumbItem, ProductPivot, Order, Apotek } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Order History", href: "/pemesanan/history" },
  { title: "Order Detail", href: "#"},
];

type TimelineItem = { key: string; label: string; time: string | null };

export default function Detail() {
  const { props } = usePage<{ order: Order; timeline: TimelineItem[], apotek: Apotek }>();
  const order = props.order;
  const apotek = props.apotek;
  const timeline = props.timeline;
  const ppn = order.subTotal * 0.11;

  const currency = (v: number) => {
    if (!v && v !== 0) return '-';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v);
  };

  const formatTime = (time: string | null) => {
    if (!time) return null;
    try { return format(new Date(time), 'dd/MM/yyyy HH:mm'); } catch { return time; }
  };

  const subtotal = order.products?.reduce((acc: number, p: ProductPivot) => {
    const q = p.pivot?.quantity ?? 1;
    return acc + (p.price * q);
  }, 0) ?? 0;

  const stepIndexByStatus: Record<string, number> = {
    made: 0,
    'On Delivery': 1,
    'Received': 2,
  };
  const activeIndex = stepIndexByStatus[order.status] ?? 0;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Order ID : ${order.id_transaksi}`} />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex-1 space-y-6 w-full md:w-auto">
            {/* Header + Steps */}
            <Card className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6"> {/* Stack buttons/title on small screens */}
                <div>
                  <h3 className="text-xl font-semibold">Order ID : {order.id_transaksi}</h3>
                  <p className="text-sm text-muted-foreground">Placed: {formatTime(order.created_at)}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto"> {/* Buttons stack on mobile, then row */}
                  <Button size="sm" className="w-full sm:w-auto">Send Invoice</Button>
                  <Link href="/pemesanan/history" className="w-full sm:w-auto">
                    <Button size="sm" variant="outline" className="w-full sm:w-auto">
                      <ArrowLeft className="w-4 h-4 mr-1" /> Back
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 sm:flex sm:flex-wrap gap-4 items-center justify-between"> {/* Use grid for steps on small screens, flex for larger */}
                {[
                  { key: 'made', label: 'Order Made', icon: <Package size={16} /> },
                  { key: 'delivery', label: 'On Delivery', icon: <Truck size={16} /> },
                  { key: 'received', label: 'Received', icon: <CheckCircle size={16} /> },
                ].map((st, idx) => {
                  const done = idx <= activeIndex;
                  return (
                    <React.Fragment key={st.key}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            done ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {st.icon}
                        </div>
                        <div className="text-sm">
                          <div className={`${done ? 'font-semibold' : 'text-muted-foreground'}`}>{st.label}</div>
                          <div className="text-xs">{formatTime(timeline[idx]?.time)}</div>
                        </div>
                      </div>
                      {idx < 2 && <ArrowRight className="hidden sm:block text-gray-300 mx-1" />}
                    </React.Fragment>
                  );
                })}
              </div>
            </Card>

            {/* Apotek Information + Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Apotek Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {apotek ? (
                    <div>
                      <div className="font-medium">{apotek.name || '—'}</div>
                      <div className="text-sm">{apotek.address || '—'}</div>
                      <div className="text-sm">
                        {apotek.branch} - {apotek.sap_id}
                      </div>
                      <div className="text-sm mt-2">Phone: {apotek.phone || '-'}</div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No apotek information found for id_koperasi: {order.id_koperasi}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {order.payment_method === 'Virtual Account' ? (
                    <div className="space-y-1">
                      <div><span className="font-medium">Method:</span> Virtual Account</div>
                      <div><span className="font-medium">Bank:</span> {order.account_bank || '-'}</div>
                      <div><span className="font-medium">VA Number:</span> {order.va_number || '-'}</div>
                      <div><span className="font-medium">Account Number:</span> {order.account_no || '-'}</div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div><span className="font-medium">Method:</span> {order.payment_method}</div>
                      <div><span className="font-medium">Payment Type:</span> {order.payment_type || '-'}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle>Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.products?.map((p: ProductPivot) => (
                  <div key={p.id} className="flex items-center gap-4">
                    <img
                      src={p.image || '/images/placeholder.png'}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-sm text-muted-foreground">SKU: {p.sku}</div>
                      <div className="text-sm">Qty: {p.pivot?.quantity ?? 1}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{currency(p.price)}</div>
                      <div className="text-sm text-muted-foreground">
                        {currency((p.pivot?.quantity ?? 1) * p.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <aside className="w-full md:w-96 space-y-4 mt-6 md:mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div>Product Price</div>
                  <div className="text-right">{currency(order.subTotal)}</div>

                  <div>Product Tax (11%)</div>
                  <div className="text-right">{currency(ppn)}</div>

                  <div>Shipping Cost</div>
                  <div className="text-right">—</div>

                  <div>Platform fees</div>
                  <div className="text-right">—</div>

                  <div className="font-semibold">Total</div>
                  <div className="text-right font-semibold">
                    {currency(order.total_nominal ?? subtotal)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card Konfirmasi Paket */}
            {order.status === "On Delivery" && (
              <Card>
                <CardHeader>
                  <CardTitle>PAKET SUDAH TIBA</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Harap Konfirmasi bahwa paket sudah Anda terima
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2"> {/* Buttons stack on mobile */}
                  <Button
                    onClick={() => {
                      router.post(route('history.updateStatus', { id_transaksi: order.id_transaksi }), {
                        status: 'Received',
                      })
                    }}
                    className="bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto"
                  >
                    Paket Sudah Diterima
                  </Button>
                    <Button variant="destructive" className="w-full sm:flex-1 text-white"> {/* Flex-1 on desktop, full width on mobile */}
                      Laporkan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}