<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Order;

class PemesananController extends Controller
{
    public function index()
    {
        // Ambil semua produk dengan kategori (hanya id & main_category biar ringan)
        $products = Product::with('category:id,main_category')
            ->get(['id', 'sku', 'name', 'price', 'image', 'category_id', 'order_unit', 'is_active', 'content', 'base_uom', 'weight', 'pharmacology', 'dosage', 'description']);
    

        return Inertia::render('Pemesanan/Index', [
            'products' => $products
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
            ['key' => 'paid', 'label' => 'Order Paid', 'time' => $order->paid_at],
            ['key' => 'shipped', 'label' => 'Shipped', 'time' => $order->shipped_at],
            ['key' => 'received', 'label' => 'Received', 'time' => $order->received_at],
        ];

        return Inertia::render('Pemesanan/Detail', [
            'order'   => $order,
            'timeline'=> $timeline,
        ]);
    }
}
