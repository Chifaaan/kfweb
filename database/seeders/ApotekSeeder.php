<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ApotekSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('apoteks')->insert([
            [
                'id'        => 'KOP-00123',
                'branch'    => 'Jakarta Pusat',
                'sap_id'    => 'SAP001',
                'name'      => 'Apotek Sehat Jakarta',
                'address'   => 'Jl. Merdeka No.10, Jakarta Pusat',
                'phone'     => '0211234567',
                'latitude'  => -6.175392,
                'longitude' => 106.827153,
                'zipcode'   => '10110',
                'is_active' => true,
                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'id'        => 'KOP-00124',
                'branch'    => 'Bandung',
                'sap_id'    => 'SAP002',
                'name'      => 'Apotek Sehat Bandung',
                'address'   => 'Jl. Asia Afrika No.25, Bandung',
                'phone'     => '0229876543',
                'latitude'  => -6.921442,
                'longitude' => 107.611679,
                'zipcode'   => '40111',
                'is_active' => true,
                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'id'        => 'KOP-00125',
                'branch'    => 'Surabaya',
                'sap_id'    => 'SAP003',
                'name'      => 'Apotek Sehat Surabaya',
                'address'   => 'Jl. Tunjungan No.45, Surabaya',
                'phone'     => '0315678901',
                'latitude'  => -7.257472,
                'longitude' => 112.752088,
                'zipcode'   => '60275',
                'is_active' => false,
                'created_at'=> now(),
                'updated_at'=> now(),
            ],
        ]);
    }
}
