<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Order;


class PemesananController extends Controller
{
    public function index(){
    
        $products = Product::all();

        return Inertia::render('Pemesanan/Index', [
            'products' => $products
        ]);
    }

    public function cart(){
        return Inertia::render('Pemesanan/Cart', []);
    }

    public function po(){
        return Inertia::render('Pemesanan/PO', []);
    }

    public function history()
    {
        $orders = Order::with(['products' => function ($q) {
            $q->select('products.id', 'sku', 'nama_product', 'harga_per_unit', 'image')
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
                $q->select('products.id', 'sku', 'nama_product', 'harga_per_unit', 'image')
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
            'order' => $order,
            'timeline' => $timeline,
        ]);
    }

}
