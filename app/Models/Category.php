<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'main_category',
        'subcategory1',
        'subcategory2',
    ];

    // Relasi ke Product
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }
}