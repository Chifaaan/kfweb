<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BuyerAddress;

class BuyerAddressSeeder extends Seeder
{
    public function run(): void
    {
        BuyerAddress::updateOrCreate(
            ['id_koperasi' => 'KOP-00123'],
            [
                'recipient_name' => 'Rucas Royal',
                'address_line1' => '4567 Elm Street, Apt 3B',
                'city' => 'Philadelphia',
                'province' => 'PA',
                'postal_code' => '19104',
                'phone' => '08123456789'
            ]
        );
    }
}
