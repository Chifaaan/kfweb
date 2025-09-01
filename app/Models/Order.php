<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'id_transaksi',
        'id_koperasi',
        'status',
        'merchant_id',
        'merchant_name',
        'total_nominal',
        'remaining_credit',
        'is_for_sale',
        'account_no',
        'account_bank',
        'payment_type',
        'payment_method',
        'va_number',
        'timestamp',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_product')
            ->withPivot('quantity')
            ->withTimestamps();
    }
}
