<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BuyerAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_koperasi',
        'recipient_name',
        'address_line1',
        'address_line2',
        'city',
        'province',
        'postal_code',
        'country',
        'phone',
    ];

    // jika perlu: non-standard primary key / timestamps bisa diatur, tapi default OK
}
