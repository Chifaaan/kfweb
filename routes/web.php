<?php

use App\Http\Controllers\PemesananController;
use App\Http\Controllers\PenerimaanController;
use App\Http\Controllers\PurchaseOrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('pemesanan/medicines', [PemesananController::class, 'index'])->name('medicines');
    Route::get('pemesanan/cart', [PemesananController::class , 'cart'])->name('cart');
    Route::get('pemesanan/po', [PemesananController::class , 'po'])->name('po');
    Route::get('pemesanan/history', [PemesananController::class , 'history'])->name('history');
    Route::get('penerimaan', [PenerimaanController::class , 'index'])->name('penerimaan');
    Route::get('penerimaan/history', [PenerimaanController::class , 'create'])->name('history');
    // Route::get('pemesanan/po', [PurchaseOrderController::class, 'create'])->name('po.create');
    // Route::post('pemesanan/po', [PurchaseOrderController::class, 'store'])->name('po.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
