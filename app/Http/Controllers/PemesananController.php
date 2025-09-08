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

    /**
     * IMPROVEMENT:
     * Simplified the query in the `show` method.
     * By removing the second argument from `findOrFail($id)`, we fetch all columns
     * for the product. This is better for a detail page as it ensures all product
     * data is available to the frontend and is easier to maintain.
     */
    public function show(Product $product)
    {
        // Eager load the category relationship and fetch the full product model.
        // $product = Product::with('category:id,main_category')->findOrFail($id);
        // dd($product->id);

        return Inertia::render('Pemesanan/DetailProduct', [
            'product' => $product,
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
}