<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
    Schema::create('products', function (Blueprint $table) {
        $table->id();
        $table->string('nama_product');
        $table->string('sku')->unique();
        $table->string('kategori');
        $table->decimal('harga_per_unit', 12, 2);
        $table->string('satuan');
        $table->integer('berat');
        $table->json('dimensi'); // simpan panjang, lebar, tinggi
        $table->string('image')->nullable();
        $table->text('description')->nullable();
        $table->json('benefit')->nullable();
        $table->text('dosage')->nullable();
        $table->integer('stok')->default(0);
        $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
