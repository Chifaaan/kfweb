<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

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
        'paid_at',
        'shipped_at',
        'arrived_at',
        'received_at',
    ];

    protected $casts = [
        'is_for_sale' => 'boolean',
        'timestamp' => 'datetime',
        'paid_at' => 'datetime',
        'shipped_at' => 'datetime',
        'received_at' => 'datetime',
    ];

    // Many-to-many ke product lewat pivot order_product
    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_product')
                    ->withPivot('quantity')
                    ->withTimestamps();
    }

    // Buyer Shipping Address berdasarkan id_koperasi (one-to-one)
    public function buyerAddress()
    {
        return $this->hasOne(BuyerAddress::class, 'id_koperasi', 'id_koperasi');
    }

    // Helper: progress step (1..4)
    public function getProgressStepAttribute()
    {
        $map = [
            'created' => 1,
            'made' => 1,
            'On Delivery' => 2,
            'Arrvied' => 3,
            'Received' => 4,
            'Completed' => 4,
        ];
        return $map[$this->status] ?? 1;
    }
}
