<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Order;
use App\Models\Category;

class PemesananController extends Controller
{
    public function index()
    {
        // Ambil semua produk dengan kategori (hanya id & main_category biar ringan)
        $products = Product::with('category:id,main_category')
            ->get(['id', 'sku', 'name', 'price', 'image', 'category_id', 'order_unit', 'is_active', 'content', 'base_uom', 'weight', 'pharmacology', 'dosage', 'description']);
        
        $categories = Category::pluck('main_category')->unique()->values();
        $packages = Product::pluck('base_uom')->filter()->unique()->values();
        $orderUnits = Product::pluck('order_unit')->filter()->unique()->values();
    

        return Inertia::render('Pemesanan/Index', [
            'products' => $products,
            'categories' => $categories,
            'packages' => $packages,
            'orderUnits' => $orderUnits,
        ]);
    }

    public function cart()
    {
        return Inertia::render('Pemesanan/Cart', []);
    }

    public function po()
    {
        return Inertia::render('Pemesanan/PO', []);
    }

    public function history()
    {
        $orders = Order::with(['products' => function ($q) {
            $q->select('products.id', 'sku', 'name', 'price', 'image')
              ->withPivot('quantity');
        }])->latest()->get();

        return Inertia::render('Pemesanan/History', [
            'orders' => $orders,
        ]);
    }

    // new: show detail
    public function show($id_transaksi)
    {
        $order = Order::with([
            'products' => function ($q) {
                $q->select('products.id', 'sku', 'name', 'price', 'image')
                  ->withPivot('quantity');
            },
            'buyerAddress'
        ])->where('id_transaksi', $id_transaksi)->firstOrFail();

        // timeline array (urutan)
        $timeline = [
            ['key' => 'made', 'label' => 'Order Made', 'time' => $order->created_at],
            ['key' => 'On Delivery', 'label' => 'On Delivery', 'time' => $order->delivered_at],
            ['key' => 'Arrived', 'label' => 'Arrived', 'time' => $order->arrived_at],
            ['key' => 'Received', 'label' => 'Received', 'time' => $order->received_at],
        ];

        return Inertia::render('Pemesanan/Detail', [
            'order'   => $order,
            'timeline'=> $timeline,
        ]);
    }
public function updateStatus(Request $request, $id_transaksi)
{
    $request->validate([
        'status' => 'required|in:made,On Delivery,Arrived,Received',
    ]);

    $order = Order::where('id_transaksi', $id_transaksi)->firstOrFail();

    switch ($request->status) {

        case 'Arrived':
            // kalau ditekan "Arrived", langsung ubah jadi "received"
            $order->status = 'Received';
            $order->received_at = now();
            break;

        case 'Received':
            $order->status = 'Received';
            $order->received_at = now();
            break;
    }

    $order->save();

    return redirect()
        ->route('history.show', ['id_transaksi' => $id_transaksi])
        ->with('success', 'Order status updated successfully.');
}

}
