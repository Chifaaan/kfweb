<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Order;
use App\Models\Category;

class PemesananController extends Controller
{
public function index(Request $request)
{
    $query = Product::with('category:id,main_category')
        ->select([
            'id', 'sku', 'name', 'price', 'image', 'category_id', 
            'order_unit', 'is_active', 'content', 'base_uom', 
            'weight', 'pharmacology', 'dosage', 'description'
        ]);

    // 🔎 Filter kategori
    if ($request->filled('categories')) {
        $categories = (array) $request->categories; // pastikan array
        $query->whereHas('category', function ($q) use ($categories) {
            $q->whereIn('main_category', $categories);
        });
    }

    // 🔹 Filter Package (base_uom)
    if ($request->filled('packages')) {
        $packages = (array) $request->packages;
        $query->whereIn('base_uom', $packages);
    }

    // 🔹 Filter Order Unit
    if ($request->filled('orderUnits')) {
        $orderUnits = (array) $request->orderUnits;
        $query->whereIn('order_unit', $orderUnits);
    }

    // 🔍 Pencarian
    if ($request->filled('search')) {
        $search = $request->search;
        $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('sku', 'like', "%{$search}%")
              ->orWhere('content', 'like', "%{$search}%");
        });
    }

    // 📄 Pagination (12 produk per halaman, bisa disesuaikan)
    $products = $query->paginate(12)->withQueryString();

    // 🔧 Data filter tambahan
    $categories = Category::pluck('main_category')->unique()->values();
    $packages = Product::pluck('base_uom')->filter()->unique()->values();
    $orderUnits = Product::pluck('order_unit')->filter()->unique()->values();

    return Inertia::render('Pemesanan/Index', [
        'products' => $products,
        'categories' => $categories,
        'packages' => $packages,
        'orderUnits' => $orderUnits,
        'filters' => $request->only(['category', 'package', 'orderUnit', 'search']),
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
        
        // Fetch related products from the same category (limit to 4)
        $relatedProducts = Product::with('category:id,main_category')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id) // Exclude the current product
            ->limit(4)
            ->get(['id', 'sku', 'name', 'price', 'image', 'category_id', 'order_unit', 'is_active', 'content', 'base_uom', 'weight']);

        return Inertia::render('Pemesanan/DetailProduct', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
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