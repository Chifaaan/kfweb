import React, { useState, useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { type BreadcrumbItem, CartItem, OrderPayload } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// Import Tooltip components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Medicines", href: "/pemesanan/medicines" },
  { title: "Cart", href: "/pemesanan/cart" },
  { title: "Purchase Order", href: "/pemesanan/po" },
];

export default function PurchaseOrderPage() {
  // Dummy data koperasi user
  const koperasiInfo = {
    merchant_id: "MER-001",
    merchant_name: "PT Supplier Sehat",
    koperasi_id: "KOP-00123",
    koperasi_name: "Koperasi Sejahtera",
  };

  const [paymentMethod, setPaymentMethod] = useState("VA");
  const [vaNumber, setVaNumber] = useState("");
  const [accountBank, setAccountBank] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [remainingCredit] = useState(1_000_000);
  const [status] = useState("Pending");
  const [showDialog, setShowDialog] = useState<"cancel" | "submit" | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  // Cart Items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  // Perhitungan order
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const ppn = subtotal * 0.11;
  const total = subtotal + ppn;

  // Cek kredit cukup atau tidak
  const isCreditNotEnough = paymentMethod === "Kredit" && total > remainingCredit;

  // Deskripsi metode pembayaran
  const paymentDescription =
    paymentMethod === "Kredit"
      ? "Pembayaran menggunakan Kredit Koperasi"
      : `Pembayaran menggunakan Bank Virtual Account ${accountBank || "-"} (VA ${vaNumber || "-"})`;

  // Reset VA fields when changing to Kredit Koperasi
  useEffect(() => {
    if (paymentMethod === "Kredit") {
      setVaNumber("");
      setAccountBank("");
      setAccountNo("");
      setValidationErrors({}); // Clear validation errors when switching
    }
  }, [paymentMethod]);

  const validateVAFields = () => {
    const errors: { [key: string]: string } = {};
    if (paymentMethod === "VA") {
      if (!vaNumber.trim()) {
        errors.vaNumber = "VA Number is required.";
      }
      if (!accountBank.trim()) {
        errors.accountBank = "Bank is required.";
      }
      if (!accountNo.trim()) {
        errors.accountNo = "Account Number is required.";
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (isCreditNotEnough) {
      setShowDialog(null); // Close the submit dialog if credit is not enough
      return;
    }

    if (paymentMethod === "VA" && !validateVAFields()) {
      setShowDialog(null); // Close the submit dialog if validation fails
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
      account_no: isKredit ? "" : accountNo,
      account_bank: isKredit ? "" : accountBank,
      payment_type: isKredit ? "CAD" : "Virtual Account",
      payment_method: paymentMethod,
      va_number: isKredit ? "" : vaNumber,
      timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
      product_detail: cartItems.map((item) => ({
        sku: item.sku,
        quantity: item.quantity,
      })),
    };

    router.post(route("po.store"), {...order}, {
      onSuccess: () => {
        localStorage.removeItem("cart");
        setCartItems([]);
      },
    });
    console.log("Order submitted:", order);
    setShowDialog(null);
  };

  const areVaFieldsEmpty = paymentMethod === "VA" && (!vaNumber.trim() || !accountBank.trim() || !accountNo.trim());
  const isSubmitDisabled = isCreditNotEnough || areVaFieldsEmpty;

  const getTooltipContent = () => {
    if (isCreditNotEnough) {
      return "Saldo Kredit Anda Tidak Cukup untuk pesanan ini.";
    }
    if (areVaFieldsEmpty) {
      return "Harap lengkapi detail Virtual Account untuk melanjutkan.";
    }
    return ""; // Should not be reached if button is enabled
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Purchase Order" />

      <div className="p-4 md:p-6 space-y-6">

        <h1 className="text-2xl font-bold text-blue-800">Purchase Order Form</h1>
        <p className="mb-4 text-sm text-muted-foreground">Transaction ID:TRX-${Date.now()} | Status: {status}</p>

        {/* Layout Dua Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bagian Kiri */}
          <div className="lg:col-span-2 space-y-6">
            {/* Merchant Information */}
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
              <CardContent>
                <Label>Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="flex gap-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="VA" id="va" />
                    <Label htmlFor="va">Bank Virtual Account</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Kredit" id="kredit" />
                    <Label htmlFor="kredit">Kredit Koperasi</Label>
                  </div>
                </RadioGroup>

                {/* Jika pilih Virtual Account */}
                {paymentMethod === "VA" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="vaNumber">VA Number</Label>
                      <Input
                        id="vaNumber"
                        value={vaNumber}
                        onChange={(e) => {
                          setVaNumber(e.target.value);
                          setValidationErrors((prev) => ({ ...prev, vaNumber: "" }));
                        }}
                        placeholder="1234567890"
                      />
                      {validationErrors.vaNumber && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.vaNumber}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="accountBank">Bank</Label>
                      <Input
                        id="accountBank"
                        value={accountBank}
                        onChange={(e) => {
                          setAccountBank(e.target.value);
                          setValidationErrors((prev) => ({ ...prev, accountBank: "" }));
                        }}
                        placeholder="BCA / Mandiri"
                      />
                      {validationErrors.accountBank && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.accountBank}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="accountNo">Account Number</Label>
                      <Input
                        id="accountNo"
                        value={accountNo}
                        onChange={(e) => {
                          setAccountNo(e.target.value);
                          setValidationErrors((prev) => ({ ...prev, accountNo: "" }));
                        }}
                        placeholder="9876543210"
                      />
                      {validationErrors.accountNo && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.accountNo}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Jika pilih Kredit */}
                {paymentMethod === "Kredit" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label>Remaining Credit</Label>
                      <Input value={`Rp ${remainingCredit.toLocaleString()}`} disabled />
                    </div>
                    <div>
                      <Label>Payment Type</Label>
                      <Input value="Cash Against Document" disabled />
                    </div>
                  </div>
                )}
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

          {/* Bagian Kanan */}
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

                {/* Keterangan Pembayaran */}
                <div className="mt-4 text-sm text-gray-600 border-t pt-2">
                  {paymentDescription}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setShowDialog("cancel")}>
            Cancel
          </Button>

          {/* Tooltip for Submit Button */}
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

      {/* Dialog Konfirmasi */}
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