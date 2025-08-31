<?php

namespace Database\Seeders;

use App\Models\Aset;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AsetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $asets = [
            [
                'kode_aset' => 'LAP001',
                'kategori' => 'Laptop',
                'nama_barang' => 'Laptop Dell Latitude 5420',
                'lokasi' => 'Ruang IT',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'IT Department',
                'harga' => 15000000,
                'tanggal_pembelian' => '2024-01-15',
                'status' => 'tersedia',
            ],
            [
                'kode_aset' => 'LAP002',
                'kategori' => 'Laptop',
                'nama_barang' => 'Laptop Lenovo Thinkpad X1',
                'lokasi' => 'Ruang IT',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'IT Department',
                'harga' => 18000000,
                'tanggal_pembelian' => '2024-02-20',
                'status' => 'dipinjam',
            ],
            [
                'kode_aset' => 'PRN001',
                'kategori' => 'Printer',
                'nama_barang' => 'Printer Canon G3010',
                'lokasi' => 'Ruang Admin',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'Admin Department',
                'harga' => 2500000,
                'tanggal_pembelian' => '2024-03-10',
                'status' => 'tersedia',
            ],
            [
                'kode_aset' => 'PRJ001',
                'kategori' => 'Proyektor',
                'nama_barang' => 'Proyektor Epson EB-X41',
                'lokasi' => 'Ruang Meeting',
                'kondisi' => 'maintenance',
                'penanggung_jawab' => 'IT Department',
                'harga' => 8000000,
                'tanggal_pembelian' => '2023-12-05',
                'status' => 'maintenance',
            ],
            [
                'kode_aset' => 'MON001',
                'kategori' => 'Monitor',
                'nama_barang' => 'Monitor LG UltraWide 29"',
                'lokasi' => 'Ruang IT',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'IT Department',
                'harga' => 3500000,
                'tanggal_pembelian' => '2024-01-30',
                'status' => 'tersedia',
            ],
            [
                'kode_aset' => 'HP001',
                'kategori' => 'Smartphone',
                'nama_barang' => 'Smartphone Samsung A52',
                'lokasi' => 'Ruang IT',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'IT Department',
                'harga' => 4500000,
                'tanggal_pembelian' => '2024-02-15',
                'status' => 'dipinjam',
            ],
        ];

        foreach ($asets as $aset) {
            Aset::create($aset);
        }
    }
}
