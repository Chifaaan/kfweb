import React, { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// 🔹 Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
  { title: "Medicines", href: "/pemesanan/medicines" },
  { title: "Purchase Order", href: "/pemesanan/po" },
];

// 🔹 Dummy data cart
const dummyCart = [
  { id: 1, name: "Paracetamol", qty: 10, price: 5000 },
  { id: 2, name: "Vitamin C", qty: 5, price: 7000 },
  { id: 3, name: "Aspirin", qty: 3, price: 7000 },
];

export default function PurchaseOrderPage() {
  const [discountType, setDiscountType] = useState("Bertingkat");
  const [ppnType, setPpnType] = useState("Include");
  const [paymentMethod, setPaymentMethod] = useState("Debit");
  const [top, setTop] = useState("30");

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  // 🔹 Dummy values
  const kreditBalance = 150000;
  const nomorSurat = "PO-2025-0001";
  const namaPengentri = "User";
  const namaKrediturOptions = ["Supplier A", "Supplier B", "Supplier C"];

  // 🔹 Hitung subtotal, ppn, total
  const subtotal = dummyCart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const ppn = ppnType === "Tanpa" ? 0 : subtotal * 0.11;
  const total = subtotal + ppn;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Purchase Order" />

      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-800">Purchase Order Form</h1>

        {/* Purchase Order Information */}
        <Card>
          <CardHeader>
            <CardTitle>Purchase Order Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nomor Surat</Label>
              <Input value={nomorSurat} disabled className="bg-gray-100" />
            </div>
            <div>
              <Label>Nama Pengentri</Label>
              <Input value={namaPengentri} disabled className="bg-gray-100" />
            </div>
            <div>
              <Label>Nama Kreditur</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kreditur" />
                </SelectTrigger>
                <SelectContent>
                  {namaKrediturOptions.map((k) => (
                    <SelectItem key={k} value={k}>
                      {k}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>TOP (days)</Label>
              <Input
                type="number"
                value={top}
                onChange={(e) => setTop(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Tax and Discount */}
        <Card>
          <CardHeader>
            <CardTitle>Tax and Discount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>Discount Type</Label>
                <RadioGroup
                  value={discountType}
                  onValueChange={setDiscountType}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Bertingkat" id="disc-bert" />
                    <Label htmlFor="disc-bert">Bertingkat</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Kumulatif" id="disc-kum" />
                    <Label htmlFor="disc-kum">Kumulatif</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>PPN</Label>
                <RadioGroup
                  value={ppnType}
                  onValueChange={setPpnType}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Include" id="ppn-inc" />
                    <Label htmlFor="ppn-inc">Include</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Exclude" id="ppn-exc" />
                    <Label htmlFor="ppn-exc">Exclude</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Tanpa" id="ppn-none" />
                    <Label htmlFor="ppn-none">Tanpa PPN</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Debit" id="debit" />
                <Label htmlFor="debit">Debit</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Kredit" id="kredit" />
                <Label htmlFor="kredit">Kredit</Label>
              </div>
            </RadioGroup>

            {paymentMethod === "Kredit" && (
              <div className="mt-4">
                <Label>Kredit Balance</Label>
                <Input value={`Rp ${kreditBalance.toLocaleString()}`} disabled />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ordered Items */}
        <Card>
          <CardHeader>
            <CardTitle>Ordered Items</CardTitle>
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
                {dummyCart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell>Rp {item.price.toLocaleString()}</TableCell>
                    <TableCell>
                      Rp {(item.qty * item.price).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* 🔹 Summary (Subtotal, PPN, Total) */}
            <div className="flex flex-col items-end mt-6 space-y-2">
              <div className="flex justify-between w-64 text-gray-700">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString()}</span>
              </div>
              {ppnType !== "Tanpa" && (
                <div className="flex justify-between w-64 text-gray-700">
                  <span>PPN (11%)</span>
                  <span>Rp {ppn.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between w-64 border-t pt-2 mt-2 text-xl font-bold text-blue-800">
                <span>Total</span>
                <span>Rp {total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setShowCancelDialog(true)}>
            Cancel
          </Button>
          <Button onClick={() => setShowSaveDialog(true)}>
            Simpan Purchase Order
          </Button>
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Batalkan Purchase Order?</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin membatalkan? Perubahan tidak akan disimpan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Tidak
            </Button>
            <Link href="/pemesanan/cart">
              <Button variant="destructive">Ya, Batalkan</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Confirmation Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Simpan Purchase Order?</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menyimpan Purchase Order ini?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Batal
            </Button>
            <Link href="/pemesanan/medicines">
              <Button>Ya, Simpan</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}