<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('asets', function (Blueprint $table) {
            $table->id();
            $table->string('kode_aset')->unique();
            $table->string('kategori');
            $table->string('nama_barang');
            $table->string('lokasi');
            $table->enum('kondisi', ['baik', 'rusak_ringan', 'rusak_berat', 'maintenance']);
            $table->string('penanggung_jawab');
            $table->decimal('harga', 15, 2);
            $table->date('tanggal_pembelian');
            $table->enum('status', ['tersedia', 'dipinjam', 'maintenance', 'rusak']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asets');
    }
};
