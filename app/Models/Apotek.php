<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apotek extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'branch',
        'sap_id',
        'name',
        'address',
        'phone',
        'latitude',
        'longitude',
        'zipcode',
        'is_active',
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'is_active' => 'boolean',
    ];

    // Define the primary key since it's not the default 'id'
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    // Relationship: An apotek can have many orders
    public function orders()
    {
        return $this->hasMany(Order::class, 'id_koperasi', 'id');
    }
}