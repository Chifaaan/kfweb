<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'main_category' => 'Obat',
                'subcategory1'  => 'Obat Bebas',
                'subcategory2'  => 'Tablet',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'main_category' => 'Obat',
                'subcategory1'  => 'Obat Resep',
                'subcategory2'  => 'Kapsul',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'main_category' => 'Vitamin & Suplemen',
                'subcategory1'  => 'Vitamin Anak',
                'subcategory2'  => 'Syrup',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'main_category' => 'Vitamin & Suplemen',
                'subcategory1'  => 'Vitamin Dewasa',
                'subcategory2'  => null,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'main_category' => 'Perawatan Tubuh',
                'subcategory1'  => 'Perawatan Kulit',
                'subcategory2'  => 'Lotion',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
        ]);
    }
}
