import React, { useState, useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { type BreadcrumbItem, CartItem, OrderPayload } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Wallet } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Medicines", href: "/pemesanan/medicines" },
  { title: "Cart", href: "/pemesanan/cart" },
  { title: "Purchase Order", href: "/pemesanan/po" },
];

export default function PurchaseOrderPage() {
  const koperasiInfo = {
    merchant_id: "MER-001",
    merchant_name: "PT Supplier Sehat",
    koperasi_id: "KOP-00123",
    koperasi_name: "Koperasi Sejahtera",
  };

  const [paymentMethod, setPaymentMethod] = useState<"Mandiri" | "BCA" | "Kredit" | null>(null);
  const [paymentType, setPaymentType] = useState("CAD");

  const [remainingCredit] = useState(1_000_000);
  const [status] = useState("Pending");
  const [showDialog, setShowDialog] = useState<"cancel" | "submit" | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const ppn = subtotal * 0.11;
  const total = subtotal + ppn;

  const isCreditNotEnough = paymentMethod === "Kredit" && total > remainingCredit;

  const paymentDescription =
    paymentMethod === "Kredit"
      ? `Pembayaran menggunakan Kredit Koperasi - ${paymentType}`
      : paymentMethod
      ? `Pembayaran menggunakan Bank ${paymentMethod} Virtual Account`
      : "Anda belum memilih metode pembayaran.";

  const handleSubmit = () => {
    if (!paymentMethod) {
      alert("Harap pilih salah satu metode pembayaran terlebih dahulu.");
      setShowDialog(null);
      return;
    }

    if (isCreditNotEnough) {
      setShowDialog(null);
      return;
    }

    const isKredit = paymentMethod === "Kredit";

    const order: OrderPayload = {
      id_transaksi: `TRX-${Date.now()}`,
      id_koperasi: koperasiInfo.koperasi_id,
      status: "On Delivery",
      merchant_id: koperasiInfo.merchant_id,
      merchant_name: koperasiInfo.merchant_name,
      subTotal: subtotal,
      total_nominal: total,
      remaining_credit: isKredit ? remainingCredit - total : remainingCredit,
      is_for_sale: false,
      account_no: "",
      account_bank: isKredit ? "" : paymentMethod,
      payment_type: isKredit ? paymentType : "Debit",
      payment_method: isKredit ? paymentMethod : "Virtual Account",
      va_number: "",
      timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
      product_detail: cartItems.map((item) => ({
        sku: item.sku,
        quantity: item.quantity,
      })),
    };

    router.post(route("po.store"), { ...order }, {
      onSuccess: () => {
        localStorage.removeItem("cart");
        setCartItems([]);
      },
    });
    setShowDialog(null);
  };

  const isSubmitDisabled = isCreditNotEnough || !paymentMethod;

  const getTooltipContent = () => {
    if (!paymentMethod) return "Silakan pilih metode pembayaran terlebih dahulu.";
    if (isCreditNotEnough) return "Saldo Kredit Anda Tidak Cukup untuk pesanan ini.";
    return "";
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Purchase Order" />

      <div className="p-4 md:p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-800">Purchase Order Form</h1>
        <p className="mb-4 text-sm text-muted-foreground">
          Transaction ID: TRX-{Date.now()} | Status: {status}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Merchant Info */}
            <Card>
              <CardHeader>
                <CardTitle>Merchant Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>ID Merchant</Label>
                  <Input value={koperasiInfo.merchant_id} disabled />
                </div>
                <div>
                  <Label>Nama Merchant</Label>
                  <Input value={koperasiInfo.merchant_name} disabled />
                </div>
                <div>
                  <Label>ID Koperasi</Label>
                  <Input value={koperasiInfo.koperasi_id} disabled />
                </div>
                <div>
                  <Label>Nama Koperasi</Label>
                  <Input value={koperasiInfo.koperasi_name} disabled />
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mandiri */}
                <div
                  onClick={() => setPaymentMethod("Mandiri")}
                  className={`cursor-pointer rounded-xl p-4 flex items-center justify-between border-2 transition-all duration-200 hover:scale-[1.01] hover:shadow-md
                    ${paymentMethod === "Mandiri" ? "border-yellow-500 bg-yellow-50" : "border-gray-200"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-400 p-3 rounded-full">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Bank Mandiri</h3>
                      <p className="text-sm text-gray-600">Virtual Account</p>
                    </div>
                  </div>
                </div>

                {/* BCA */}
                <div
                  onClick={() => setPaymentMethod("BCA")}
                  className={`cursor-pointer rounded-xl p-4 flex items-center justify-between border-2 transition-all duration-200 hover:scale-[1.01] hover:shadow-md
                    ${paymentMethod === "BCA" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 p-3 rounded-full">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Bank BCA</h3>
                      <p className="text-sm text-gray-600">Virtual Account</p>
                    </div>
                  </div>
                </div>

                {/* Kredit Koperasi */}
                <div
                  onClick={() => setPaymentMethod("Kredit")}
                  className={`cursor-pointer rounded-xl p-4 flex flex-col gap-3 border-2 transition-all duration-200 hover:scale-[1.01] hover:shadow-md
                    ${paymentMethod === "Kredit" ? "border-gray-600 bg-gray-50" : "border-gray-200"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-400 p-3 rounded-full">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Kredit Koperasi Digikoperasi
                      </h3>
                      <p className="text-sm text-gray-600">
                        Remaining Credits: Rp {remainingCredit.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {paymentMethod === "Kredit" && (
                    <div className="mt-2">
                      <Label className="mb-1 block">Pilih Payment Type</Label>
                      <Select value={paymentType} onValueChange={setPaymentType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih jenis pembayaran" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CAD">Cash Against Document</SelectItem>
                          <SelectItem value="TOP 30">Term of Payment 30 Hari</SelectItem>
                          <SelectItem value="TOP 60">Term of Payment 60 Hari</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="flex items-center gap-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                          {item.name}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>Rp {item.price.toLocaleString()}</TableCell>
                        <TableCell>
                          Rp {(item.price * item.quantity).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Jumlah Barang</span>
                  <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (11%)</span>
                  <span>Rp {ppn.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2 text-xl font-bold text-blue-800">
                  <span>Grand Total</span>
                  <span>Rp {total.toLocaleString()}</span>
                </div>

                {isCreditNotEnough && (
                  <div className="text-red-600 font-semibold mt-2">
                    Saldo Kredit Anda Tidak Cukup
                  </div>
                )}

                <div className="mt-4 text-sm text-gray-600 border-t pt-2">
                  {paymentDescription}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setShowDialog("cancel")}>
            Cancel
          </Button>

          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <span>
                  <Button onClick={() => setShowDialog("submit")} disabled={isSubmitDisabled}>
                    Submit Purchase Order
                  </Button>
                </span>
              </TooltipTrigger>
              {isSubmitDisabled && (
                <TooltipContent>
                  <p>{getTooltipContent()}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={!!showDialog} onOpenChange={() => setShowDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {showDialog === "cancel" ? "Batalkan Purchase Order?" : "Simpan Purchase Order?"}
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            {showDialog === "cancel"
              ? "Apakah Anda yakin ingin membatalkan pembuatan Purchase Order ini?"
              : "Apakah Anda yakin ingin menyimpan Purchase Order ini?"}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(null)}>
              Kembali
            </Button>
            {showDialog === "cancel" ? (
              <Button variant="destructive" onClick={() => setShowDialog(null)}>
                Ya, Batalkan
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
                Ya, Simpan
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
