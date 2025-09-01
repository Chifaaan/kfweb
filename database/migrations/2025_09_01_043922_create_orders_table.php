<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('id_transaksi')->unique();
            $table->string('id_koperasi');
            $table->string('status');
            $table->string('merchant_id');
            $table->string('merchant_name');
            $table->decimal('total_nominal', 15, 2);
            $table->decimal('remaining_credit', 15, 2);
            $table->boolean('is_for_sale')->default(false);
            $table->string('account_no');
            $table->string('account_bank');
            $table->string('payment_type');
            $table->string('payment_method');
            $table->string('va_number')->nullable();
            $table->timestamp('timestamp');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
