<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'KF FACIAL TISSUE 200S ANIMAL',
                'sku' => 'SKU-001',
                'category_id' => 1,
                'price' => 15000,
                'weight' => 200,
                'length' => 20,
                'width' => 10,
                'height' => 5,
                'image' => 'http://smb-padiumkm-images-public-stage.oss-ap-southeast-5.aliyuncs.com/assets/tmp/686b8574cee4f1ce8f4dc909/product/KF_FACIAL_TISSUE_200S_ANIMAL.png',
                'description' => 'Tisu wajah isi besar...',
                'pharmacology' => json_encode([
                    "Lembut di kulit wajah",
                    "Menyerap minyak berlebih"
                ]),
                'dosage' => json_encode(['note' => 'Tidak memiliki dosis, digunakan sesuai kebutuhan']),
                'base_uom' => 'PCS',
                'order_unit' => 'DUS',
                'content' => 1,
                'brand' => 'KF',
                'image_alt' => 'KF Facial Tissue',
                
            ],
            [
                'name' => 'FITUNO TAB SALUT (BLISTER 3X10 TAB)-BJN',
                'sku' => 'SKU-002',
                'category_id' => 2,
                'price' => 10000,
                'weight' => 50,
                'length' => 10,
                'width' => 5,
                'height' => 2,
                'image' => '/fituno.jpg',
                'description' => 'Suplemen herbal...',
                'pharmacology' => json_encode([
                    "Meningkatkan daya tahan tubuh",
                    "Membantu pemulihan stamina"
                ]),
                'dosage' => json_encode(['Dewasa' => '1 tablet 1–2 kali sehari setelah makan', 'Anak-anak' => '½ tablet 1 kali sehari setelah makan']),
                'base_uom' => 'Tablet',
                'order_unit' => 'BOX',
                'content' => 30,
                'brand' => 'Fituno',
                'image_alt' => 'Fituno Tablet',
                
            ],
            [
                'name' => 'PARACETAMOL',
                'sku' => 'SKU-003',
                'category_id' => 3,
                'price' => 15000,
                'weight' => 10,
                'length' => 10,
                'width' => 5,
                'height' => 2,
                'image' => '/Paracetamol.jpg',
                'description' => 'Obat Sakit Kepala',
                'pharmacology' => json_encode([
                    "Menurunkan demam",
                    "Meredakan sakit kepala",
                    "Mengurangi nyeri kepala"
                ]),
                'dosage' => json_encode([
                    'Dewasa' => '500–1000 mg setiap 4–6 jam bila perlu (maksimal 4g/hari)',
                    'Anak-anak' => '10–15 mg/kg setiap 4–6 jam bila perlu (maksimal 5 kali sehari)',
                ]),
                'base_uom' => 'STRIP',
                'order_unit' => 'DUS',
                'content' => 10,
                'brand' => 'Generik',
                'image_alt' => 'Paracetamol Strip',
                
            ],
            [
                'name' => 'ENKASARI HERBAL 120ML',
                'sku' => 'SKU-004',
                'category_id' => 4,
                'price' => 25000,
                'weight' => 10,
                'length' => 10,
                'width' => 5,
                'height' => 2,
                'image' => '/enkasari.jpg',
                'description' => 'Cairan kumur herbal alami untuk menjaga kesehatan mulut dan tenggorokan. Formulanya membantu mengatasi bau mulut, sariawan, dan meredakan radang tenggorokan.',
                'pharmacology' => json_encode([
                    "Menjaga kesehatan mulut dan tenggorokan",
                    "Mengatasi bau mulut, sariawan, dan radang tenggorokan"
                ]),
                'dosage' => json_encode(['Dewasa' => '1 sachet 1 kali sehari', 'Anak-anak' => '1 sachet 1 kali sehari']),
                'base_uom' => 'BOTOL',
                'order_unit' => 'DUS',
                'content' => 1,
                'brand' => 'Enkasari',
                'image_alt' => 'Enkasari Herbal',
                
            ],
            [
                'name' => 'Magasida Tablet (DUS 10 TAB)',
                'sku' => 'SKU-005',
                'category_id' => 5,
                'price' => 20000,
                'weight' => 10,
                'length' => 10,
                'width' => 5,
                'height' => 2,
                'image' => '/magasida.jpg',
                'description' => 'Obat yang digunakan untuk mengatasi gangguan pada saluran pencernaan seperti gastritis, maag, dispepsia, dan tukak lambung.',
                'pharmacology' => json_encode([
                    "Meredakan gejala maag",
                    "Mengurangi rasa perih di lambung",
                    "Mengatasi kembung dan gangguan pencernaan"
                ]),
                'dosage' => json_encode([
                    'Dewasa' => '1–2 tablet, 3 kali sehari sesudah makan',
                    'Anak-anak' => '½–1 tablet, 2–3 kali sehari sesudah makan'
                ]),
                'base_uom' => 'Tablet',
                'order_unit' => 'DUS',
                'content' => 10,
                'brand' => 'Magasida',
                'image_alt' => 'Magasida Tablet',

            ],
            [
                'name' => 'BATUGIN ELIXIR BT 120 ML',
                'sku' => 'SKU-006',
                'category_id' => 1,
                'price' => 65000,
                'weight' => 10,
                'length' => 10,
                'width' => 5,
                'height' => 2,
                'image' => '/batugin.jpg',
                'description' => 'Obat yang digunakan untuk mengatasi gangguan pada saluran pencernaan seperti gastritis, maag, dispepsia, dan tukak lambung.',
                'pharmacology' => json_encode([
                    "Meredakan gejala maag",
                    "Mengurangi rasa perih di lambung",
                    "Mengatasi kembung dan gangguan pencernaan"
                ]),
                'dosage' => json_encode([
                    'Dewasa' => '1–2 tablet, 3 kali sehari sesudah makan',
                    'Anak-anak' => '½–1 tablet, 2–3 kali sehari sesudah makan'
                ]),
                'base_uom' => 'BOTOL',
                'order_unit' => 'DUS',
                'content' => 1,
                'brand' => 'Batugin',
                'image_alt' => 'Batugin Elixir',
            ],
        ];

        foreach ($products as $product) {
            Product::create(array_merge($product, [
                'slug' => Str::slug($product['name']),
                // 'category_id' => 1226, // default category
                'is_active' => true,
                'is_featured' => false,
            ]));
        }
    }
}
