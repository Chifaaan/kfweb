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
            $table->string('sku');
            $table->string('name');
            $table->string('slug');
            $table->unsignedBigInteger('category_id');
            $table->float('price')->default(1);
            $table->integer('weight')->default(100);
            $table->integer('length')->nullable();
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('image')->nullable();
            $table->string('brand')->nullable();
            $table->text('description')->nullable();
            $table->json('dosage')->nullable();
            $table->text('pharmacology')->nullable();
            $table->string('base_uom');
            $table->string('order_unit');
            $table->integer('content');
            $table->string('image_alt')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
