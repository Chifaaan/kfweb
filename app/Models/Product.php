<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'sku',
        'name',
        'slug',
        'category_id',
        'price',
        'weight',
        'length',
        'width',
        'height',
        'is_active',
        'image',
        'brand',
        'description',
        'dosage',
        'pharmacology',
        'base_uom',
        'order_unit',
        'content',
        'image_alt',
        'is_featured',
    ];

    protected $casts = [
        'dosage' => 'array',
    ];

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_product')
            ->withPivot('quantity')
            ->withTimestamps();
    }

    // Relasi ke Category
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}