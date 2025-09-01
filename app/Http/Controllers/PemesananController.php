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

}
