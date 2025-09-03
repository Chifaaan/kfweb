<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('orders')->insert([
            [
                'id_transaksi'    => 'TRX-' . Str::random(8),
                'id_koperasi'     => 'KOP-001',
                'status'          => 'Arrived',
                'merchant_id'     => 'M-1001',
                'merchant_name'   => 'Toko Sembako Jaya',
                'total_nominal'   => 150000.00,
                'remaining_credit'=> 150000.00,
                'is_for_sale'     => false,
                'account_no'      => '1234567890',
                'account_bank'    => 'BCA',
                'payment_type'    => 'bank_transfer',
                'payment_method'  => 'VA',
                'va_number'       => '9876543210',
                'timestamp'       => now(),
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'id_transaksi'    => 'TRX-' . Str::random(8),
                'id_koperasi'     => 'KOP-002',
                'status'          => 'On Delivery',
                'merchant_id'     => 'M-1002',
                'merchant_name'   => 'Warung Bu Tini',
                'total_nominal'   => 250000.00,
                'remaining_credit'=> 100000.00,
                'is_for_sale'     => true,
                'account_no'      => '2233445566',
                'account_bank'    => 'Mandiri',
                'payment_type'    => 'CAD',
                'payment_method'  => 'VA',
                'va_number'       => null,
                'timestamp'       => now(),
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
        ]);
    }
}
