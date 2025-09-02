import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ArrowRight, Package, Truck, CheckCircle, ArrowLeft } from 'lucide-react';
import type { BreadcrumbItem, ProductPivot } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Order History", href: "/pemesanan/history" },
  { title: "Order Detail", href: "#"},
];

type TimelineItem = { key: string; label: string; time: string | null };


export default function Detail() {
  const { props } = usePage<{ order: any; timeline: TimelineItem[] }>();
  const order = props.order;
  const timeline = props.timeline;

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
  arrived: 2,
  received: 3,
};
const activeIndex = stepIndexByStatus[order.status] ?? 0;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Order ID : ${order.id_transaksi}`} />
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 space-y-6">
            {/* Header + Steps */}
            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Order ID : {order.id_transaksi}</h3>
                  <p className="text-sm text-muted-foreground">Placed: {formatTime(order.created_at)}</p>
                </div>
                <div className="flex items-center gap-2">
                    {order.status === 'arrived' && (
  <div>
    <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
      Paket Sudah Diterima
    </Button>
  </div>
)}
                  <Button size="sm">Send Invoice</Button>
                  <Link href="/pemesanan/history">
                    <Button size="sm" variant="outline">
                      <ArrowLeft className="w-4 h-4 mr-1" /> Back
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 items-center">
                {/* Steps visual */}
                {[
                  { key: 'made', label: 'Order Made', icon: <Package size={16} /> },
                  { key: 'delivery', label: 'On Delivery', icon: <Truck size={16} /> },
                  { key: 'arrived', label: 'Arrived', icon: <Truck size={16} /> },
                  { key: 'received', label: 'Received', icon: <CheckCircle size={16} /> },
                ].map((st, idx) => {
                  const done = idx <= activeIndex;
                  return (
                    <div key={st.key} className="flex items-center gap-2">
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
                      {idx < 3 && <ArrowRight className="ml-3 text-gray-300" />}
                    </div>
                  );
                })}
              </div>
            </Card>
            

            {/* Shipping Address + Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address (Buyer)</CardTitle>
                </CardHeader>
                <CardContent>
                  {order.buyer_address ? (
                    <div>
                      <div className="font-medium">{order.buyer_address.recipient_name || '—'}</div>
                      <div className="text-sm">{order.buyer_address.address_line1}</div>
                      {order.buyer_address.address_line2 && (
                        <div className="text-sm">{order.buyer_address.address_line2}</div>
                      )}
                      <div className="text-sm">
                        {order.buyer_address.city}, {order.buyer_address.province}{' '}
                        {order.buyer_address.postal_code}
                      </div>
                      <div className="text-sm">{order.buyer_address.country}</div>
                      <div className="text-sm mt-2">Phone: {order.buyer_address.phone || '-'}</div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No buyer address found for id_koperasi: {order.id_koperasi}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {order.payment_method === 'VA' ? (
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

          {/* Right sidebar: Order Summary */}
          <aside className="w-96 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div>Product Price</div>
                  <div className="text-right">{currency(order.total_nominal)}</div>

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
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
