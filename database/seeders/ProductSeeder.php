<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'nama_product' => 'KF FACIAL TISSUE 200S ANIMAL',
            'sku' => 'SKU-001',
            'kategori' => 'Barang',
            'harga_per_unit' => 15000,
            'satuan' => 'PCS',
            'berat' => 200,
            'dimensi' => json_encode(['panjang' => 20, 'lebar' => 10, 'tinggi' => 5]),
            'image' => 'https://placehold.co/400',
            'description' => 'Tisu wajah isi besar...',
            'benefit' => json_encode(['Lembut di kulit wajah', 'Menyerap minyak berlebih']),
            'dosage' => 'Tidak memiliki dosis, digunakan sesuai kebutuhan',
            'stok' => 100,
        ]);

        Product::create([
            'nama_product' => 'FITUNO TAB SALUT (BLISTER 3X10 TAB)-BJN',
            'sku' => 'SKU-002',
            'kategori' => 'Obat',
            'harga_per_unit' => 10000,
            'satuan' => 'BOX',
            'berat' => 50,
            'dimensi' => json_encode(['panjang' => 10, 'lebar' => 5, 'tinggi' => 2]),
            'image' => '/fituno.jpg',
            'description' => 'Suplemen herbal...',
            'benefit' => json_encode(['Meningkatkan daya tahan tubuh', 'Membantu pemulihan stamina']),
            'dosage' => 'Dewasa: 1 tablet 1–2 kali sehari setelah makan. Anak-anak: ½ tablet 1 kali sehari setelah makan',
            'stok' => 25,
        ]);

        Product::create([
            'nama_product' => 'PARACETAMOL',
            'sku' => 'SKU-003',
            'kategori' => 'Obat',
            'harga_per_unit' => 15000,
            'satuan' => 'STRIP',
            'berat' => 10,
            'dimensi' => json_encode(['panjang' => 10, 'lebar' => 5, 'tinggi' => 2]),
            'image' => '/Paracetamol.jpg',
            'description' => 'Obat Sakit Kepala',
            'benefit' => json_encode(['Menurunkan deman', 'Meredakan sakit kepala', 'Mengurangi nyeri kepala']),
            'dosage' => 'Dewasa: 500–1000 mg setiap 4–6 jam bila perlu (maksimal 4g/hari). Anak-anak: 10–15 mg/kg setiap 4–6 jam bila perlu (maksimal 5 kali sehari)',
            'stok' => 0,
        ]);

        Product::create([
            'nama_product' => 'ENKASARI HERBAL 120ML',
            'sku' => 'SKU-004',
            'kategori' => 'Obat',
            'harga_per_unit' => 25000,
            'satuan' => 'BOTOL',
            'berat' => 10,
            'dimensi' => json_encode(['panjang' => 10, 'lebar' => 5, 'tinggi' => 2]),
            'image' => '/enkasari.jpg',
            'description' => 'Cairan kumur herbal alami untuk menjaga kesehatan mulut dan tenggorokan. Formulanya membantu mengatasi bau mulut, sariawan, dan meredakan radang tenggorokan.',
            'benefit' => json_encode(['Menjaga kesehatan mulut dan tenggorokan', 'Mengatasi bau mulut, sariawan, dan radang tenggorokan']),
            'dosage' => 'Dewasa: 1 sachet 1 kali sehari. Anak-anak: 1 sachet 1 kali sehari.',
            'stok' => 5
        ]);

        Product::create([
            'nama_product' => 'Magasida Tablet (DUS 10 TAB)',
            'sku' => 'SKU-005',
            'kategori' => 'Obat',
            'harga_per_unit' => 20000,
            'satuan' => 'BOX',
            'berat' => 10,
            'dimensi' => json_encode(['panjang' => 10, 'lebar' => 5, 'tinggi' => 2]),
            'image' => '/magasida.jpg',
            'description' => 'Obat yang digunakan untuk mengatasi gangguan pada saluran pencernaan seperti gastritis, maag, dispepsia, dan tukak lambung.',
            'benefit' => json_encode(["Meredakan gejala maag", "Mengurangi rasa perih di lambung", "Mengatasi kembung dan gangguan pencernaan"]),
            'dosage' => 'Dewasa: 1–2 tablet, 3 kali sehari sesudah makan. Anak-anak: ½–1 tablet, 2–3 kali sehari sesudah makan',
            'stok' => 20
        ]);

        Product::create([
            'nama_product' => 'BATUGIN ELIXIR BT 120 ML',
            'sku' => 'SKU-006',
            'kategori' => 'Obat',
            'harga_per_unit' => 65000,
            'satuan' => 'BOTOL',
            'berat' => 10,
            'dimensi' => json_encode(['panjang' => 10, 'lebar' => 5, 'tinggi' => 2]),
            'image' => '/batugin.jpg',
            'description' => 'Obat yang digunakan untuk mengatasi gangguan pada saluran pencernaan seperti gastritis, maag, dispepsia, dan tukak lambung.',
            'benefit' => json_encode(["Meredakan gejala maag", "Mengurangi rasa perih di lambung", "Mengatasi kembung dan gangguan pencernaan"]),
            'dosage' => 'Dewasa: 1–2 tablet, 3 kali sehari sesudah makan. Anak-anak: ½–1 tablet, 2–3 kali sehari sesudah makan',
            'stok' => 20
        ]);
    }
}
