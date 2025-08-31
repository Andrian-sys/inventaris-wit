<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Aset extends Model
{
    protected $fillable = [
        'kode_aset',
        'kategori',
        'nama_barang',
        'lokasi',
        'kondisi',
        'penanggung_jawab',
        'harga',
        'tanggal_pembelian',
        'status'
    ];

    protected $casts = [
        'tanggal_pembelian' => 'date',
        'harga' => 'decimal:2'
    ];

    public function mutasiAsets(): HasMany
    {
        return $this->hasMany(MutasiAset::class);
    }
}
