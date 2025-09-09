<?php

use App\Http\Controllers\HistoryController;
use App\Http\Controllers\PemesananController;
use App\Http\Controllers\PenerimaanController;
use App\Http\Controllers\PurchaseOrderController;
use Illuminate\Support\Facades\Route;
use App\Models\Product;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::get('/dashboard', function () {
    $products = Product::where('is_active', true)->get();

    return Inertia::render('dashboard', [
        'products' => $products
    ]);
});

    Route::get('pemesanan/medicines', [PemesananController::class, 'index'])->name('medicines');
    Route::get('pemesanan/medicines/{product}', [PemesananController::class, 'show'])->name('medicines.show');
    Route::get('pemesanan/cart', [PemesananController::class , 'cart'])->name('cart');
    Route::get('pemesanan/po', [PemesananController::class , 'po'])->name('po');
    Route::post('pemesanan/po', [PurchaseOrderController::class, 'store'])->name('po.store');
    Route::get('penerimaan', [PenerimaanController::class , 'index'])->name('penerimaan');

    // History
    Route::get('pemesanan/history', [HistoryController::class , 'history'])->name('history');
    // detail
    Route::get('pemesanan/history/{id_transaksi}', [HistoryController::class, 'show'])->name('history.show');
    // update status (POST)
    Route::post('pemesanan/history/{id_transaksi}/status', [HistoryController::class, 'updateStatus'])->name('history.updateStatus');

    // API routes for search
    Route::get('/api/products/search', function () {
        $query = request()->input('q');
        if (!$query) {
            return response()->json([]);
        }
        
        $products = Product::where('name', 'like', "%{$query}%")
            ->orWhere('sku', 'like', "%{$query}%")
            ->limit(10)
            ->get(['id', 'name', 'sku']);
            
        return response()->json($products);
    });

    Route::bind('product', function ($value) {
    return \App\Models\Product::findOrFail($value);
});

require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
