<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;


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

    public function history(){
        return Inertia::render('Pemesanan/History', []);
    }

}
