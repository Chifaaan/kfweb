<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'sku',
        'nama_product',
        'harga_per_unit',
        'stok',
        'kategori',
        'satuan',
        'berat',
        'image',
        'description',
        'benefit',
        'dosage',
    ];

    protected $casts = [
        'benefit' => 'array', // biar benefit otomatis jadi array
        'dimensi' => 'array',
    ];

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_product')
            ->withPivot('quantity')
            ->withTimestamps();
    }
}
