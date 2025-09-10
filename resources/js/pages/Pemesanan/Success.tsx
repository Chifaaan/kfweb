import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Order } from "@/types";

export default function SuccessPage() {
  const { props } = usePage<{ order: Order }>();
  const order = props.order;
  
  const subtotal = order.subTotal;
  const ppn = subtotal * 0.11;
  const grandTotal = order.total_nominal;

  return (
    <AppLayout>
      <Head title="Purchase Order Success" />
      <div className="flex items-center justify-center min-h-[80vh] p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-green-600">
              Purchase Order Created Successfully
            </h1>
            <p className="text-gray-600">
              Your order has been successfully processed
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-semibold text-lg mb-3">Order Information</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Transaction ID:</div>
                <div className="font-medium">{order.id_transaksi}</div>
                
                <div className="text-gray-600">Order Status:</div>
                <div className="font-medium">{order.status}</div>
                
                <div className="text-gray-600">Merchant:</div>
                <div className="font-medium">{order.merchant_name}</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-semibold text-lg mb-3">Payment Details</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Payment Method:</div>
                <div className="font-medium">{order.payment_method}</div>
                
                {order.payment_method === "Virtual Account" && (
                  <>
                    <div className="text-gray-600">Bank:</div>
                    <div className="font-medium">{order.account_bank}</div>
                  </>
                )}
                
                {order.payment_method === "Kredit" && (
                  <>
                    <div className="text-gray-600">Payment Type:</div>
                    <div className="font-medium">{order.payment_type}</div>
                  </>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-semibold text-lg mb-3">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Rp {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (11%)</span>
                  <span>Rp {ppn.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold">
                  <span>Grand Total</span>
                  <span>Rp {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="w-full sm:w-auto">
              <Link href={route('history.show', order.id_transaksi)}>
                View Transaction Details
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href={route('history')}>
                Transaction History
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}