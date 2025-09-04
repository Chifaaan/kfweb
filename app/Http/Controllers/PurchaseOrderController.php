<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PurchaseOrderController extends Controller
{
public function store(Request $request)
{
    $data = $request->validate([
        'id_transaksi'   => 'required|string|unique:orders',
        'id_koperasi'    => 'required|string',
        'status'         => 'required|string',
        'merchant_id'    => 'required|string',
        'merchant_name'  => 'required|string',
        'subTotal'        => 'required|numeric',
        'total_nominal'  => 'required|numeric',
        'remaining_credit' => 'required|numeric',
        'is_for_sale'    => 'boolean',
        'account_no'     => 'nullable|string',
        'account_bank'   => 'nullable|string',
        'payment_type'   => 'required|string',
        'payment_method' => 'required|string',
        'va_number'      => 'nullable|string',
        'timestamp'      => 'required|date_format:Y-m-d H:i:s',
        'product_detail' => 'required|array',
        'product_detail.*.sku' => 'required|string',
        'product_detail.*.quantity' => 'required|integer|min:1',
    ]);

    DB::beginTransaction();
    try {
        // pisahkan produk
        $products = $data['product_detail'];
        unset($data['product_detail']);

        // simpan order
        $order = Order::create($data);

        // relasi produk
        foreach ($products as $product) {
            $productModel = Product::where('sku', $product['sku'])->first();

            if ($productModel) {
                $order->products()->attach($productModel->id, [
                    'quantity' => $product['quantity'],
                ]);
            }
        }

        DB::commit();
        return redirect()->route('history')->with('success', 'Purchase Order berhasil disimpan!');
    } catch (\Exception $e) {
        DB::rollBack();
        return back()->withErrors(['error' => $e->getMessage()]);
    }
}

}
