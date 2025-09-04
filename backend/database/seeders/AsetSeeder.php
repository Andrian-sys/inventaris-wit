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
            // ELEKTRONIK - Laptop
            [
                'kode_aset' => 'ELK-LAP-001',
                'kategori' => 'Elektronik',
                'nama_barang' => 'Laptop Dell Latitude 5420',
                'lokasi' => 'Ruang IT',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'IT Department',
                'harga' => 15000000,
                'tanggal_pembelian' => '2024-01-15',
                'status' => 'tersedia',
            ],
            [
                'kode_aset' => 'ELK-LAP-002',
                'kategori' => 'Elektronik',
                'nama_barang' => 'Laptop Lenovo Thinkpad X1',
                'lokasi' => 'Ruang IT',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'IT Department',
                'harga' => 18000000,
                'tanggal_pembelian' => '2024-02-20',
                'status' => 'dipinjam',
            ],
            [
                'kode_aset' => 'ELK-LAP-003',
                'kategori' => 'Elektronik',
                'nama_barang' => 'Laptop HP EliteBook 840',
                'lokasi' => 'Ruang IT',
                'kondisi' => 'rusak_ringan',
                'penanggung_jawab' => 'IT Department',
                'harga' => 12000000,
                'tanggal_pembelian' => '2023-11-10',
                'status' => 'maintenance',
            ],

            // ELEKTRONIK - Printer
            [
                'kode_aset' => 'ELK-PRN-001',
                'kategori' => 'Elektronik',
                'nama_barang' => 'Printer Canon G3010',
                'lokasi' => 'Ruang Admin',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'Admin Department',
                'harga' => 2500000,
                'tanggal_pembelian' => '2024-03-10',
                'status' => 'tersedia',
            ],
            [
                'kode_aset' => 'ELK-PRN-002',
                'kategori' => 'Elektronik',
                'nama_barang' => 'Printer HP LaserJet Pro',
                'lokasi' => 'Ruang HR',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'HR Department',
                'harga' => 3200000,
                'tanggal_pembelian' => '2024-01-25',
                'status' => 'tersedia',
            ],

            // ELEKTRONIK - Proyektor
            [
                'kode_aset' => 'ELK-PRJ-001',
                'kategori' => 'Elektronik',
                'nama_barang' => 'Proyektor Epson EB-X41',
                'lokasi' => 'Ruang Meeting',
                'kondisi' => 'maintenance',
                'penanggung_jawab' => 'IT Department',
                'harga' => 8000000,
                'tanggal_pembelian' => '2023-12-05',
                'status' => 'maintenance',
            ],
            [
                'kode_aset' => 'ELK-PRJ-002',
                'kategori' => 'Elektronik',
                'nama_barang' => 'Proyektor BenQ MW632ST',
                'lokasi' => 'Ruang Meeting',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'IT Department',
                'harga' => 6500000,
                'tanggal_pembelian' => '2024-02-10',
                'status' => 'tersedia',
            ],

            // ELEKTRONIK - Monitor
            [
                'kode_aset' => 'ELK-MON-001',
                'kategori' => 'Elektronik',
                'nama_barang' => 'Monitor LG UltraWide 29"',
                'lokasi' => 'Ruang IT',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'IT Department',
                'harga' => 3500000,
                'tanggal_pembelian' => '2024-01-30',
                'status' => 'tersedia',
            ],
            [
                'kode_aset' => 'ELK-MON-002',
                'kategori' => 'Elektronik',
                'nama_barang' => 'Monitor Samsung 24"',
                'lokasi' => 'Ruang Admin',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'Admin Department',
                'harga' => 2800000,
                'tanggal_pembelian' => '2024-03-05',
                'status' => 'tersedia',
            ],

            // ELEKTRONIK - Smartphone
            [
                'kode_aset' => 'ELK-HP-001',
                'kategori' => 'Elektronik',
                'nama_barang' => 'Smartphone Samsung A52',
                'lokasi' => 'Ruang IT',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'IT Department',
                'harga' => 4500000,
                'tanggal_pembelian' => '2024-02-15',
                'status' => 'dipinjam',
            ],
            [
                'kode_aset' => 'ELK-HP-002',
                'kategori' => 'Elektronik',
                'nama_barang' => 'Smartphone iPhone 13',
                'lokasi' => 'Ruang IT',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'IT Department',
                'harga' => 12000000,
                'tanggal_pembelian' => '2024-01-20',
                'status' => 'tersedia',
            ],

            // ELEKTRONIK - AC
            [
                'kode_aset' => 'ELK-AC-001',
                'kategori' => 'Elektronik',
                'nama_barang' => 'AC Daikin 1.5 PK',
                'lokasi' => 'Ruang Meeting',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'GA Department',
                'harga' => 4500000,
                'tanggal_pembelian' => '2023-10-15',
                'status' => 'tersedia',
            ],
            [
                'kode_aset' => 'ELK-AC-002',
                'kategori' => 'Elektronik',
                'nama_barang' => 'AC Sharp 2 PK',
                'lokasi' => 'Ruang IT',
                'kondisi' => 'rusak_ringan',
                'penanggung_jawab' => 'GA Department',
                'harga' => 5500000,
                'tanggal_pembelian' => '2023-09-20',
                'status' => 'maintenance',
            ],

            // NON-ELEKTRONIK - Meja
            [
                'kode_aset' => 'NEL-MEJ-001',
                'kategori' => 'Non-Elektronik',
                'nama_barang' => 'Meja Kerja Kayu Jati',
                'lokasi' => 'Ruang Admin',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'GA Department',
                'harga' => 2500000,
                'tanggal_pembelian' => '2023-08-10',
                'status' => 'tersedia',
            ],
            [
                'kode_aset' => 'NEL-MEJ-002',
                'kategori' => 'Non-Elektronik',
                'nama_barang' => 'Meja Meeting Besar',
                'lokasi' => 'Ruang Meeting',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'GA Department',
                'harga' => 3500000,
                'tanggal_pembelian' => '2023-07-15',
                'status' => 'tersedia',
            ],

            // NON-ELEKTRONIK - Kursi
            [
                'kode_aset' => 'NEL-KUR-001',
                'kategori' => 'Non-Elektronik',
                'nama_barang' => 'Kursi Kantor Ergonomis',
                'lokasi' => 'Ruang Admin',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'GA Department',
                'harga' => 1800000,
                'tanggal_pembelian' => '2023-08-10',
                'status' => 'tersedia',
            ],
            [
                'kode_aset' => 'NEL-KUR-002',
                'kategori' => 'Non-Elektronik',
                'nama_barang' => 'Kursi Meeting 12 Set',
                'lokasi' => 'Ruang Meeting',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'GA Department',
                'harga' => 6000000,
                'tanggal_pembelian' => '2023-07-15',
                'status' => 'tersedia',
            ],

            // NON-ELEKTRONIK - Lemari
            [
                'kode_aset' => 'NEL-LEM-001',
                'kategori' => 'Non-Elektronik',
                'nama_barang' => 'Lemari Arsip 4 Pintu',
                'lokasi' => 'Ruang Admin',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'Admin Department',
                'harga' => 2200000,
                'tanggal_pembelian' => '2023-06-20',
                'status' => 'tersedia',
            ],
            [
                'kode_aset' => 'NEL-LEM-002',
                'kategori' => 'Non-Elektronik',
                'nama_barang' => 'Lemari Buku Kayu',
                'lokasi' => 'Ruang IT',
                'kondisi' => 'rusak_ringan',
                'penanggung_jawab' => 'IT Department',
                'harga' => 1500000,
                'tanggal_pembelian' => '2023-05-25',
                'status' => 'maintenance',
            ],

            // NON-ELEKTRONIK - Rak
            [
                'kode_aset' => 'NEL-RAK-001',
                'kategori' => 'Non-Elektronik',
                'nama_barang' => 'Rak Server 42U',
                'lokasi' => 'Ruang IT',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'IT Department',
                'harga' => 8000000,
                'tanggal_pembelian' => '2023-04-10',
                'status' => 'tersedia',
            ],

            // NON-ELEKTRONIK - Whiteboard
            [
                'kode_aset' => 'NEL-WHT-001',
                'kategori' => 'Non-Elektronik',
                'nama_barang' => 'Whiteboard Magnetic 120x80',
                'lokasi' => 'Ruang Meeting',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'GA Department',
                'harga' => 800000,
                'tanggal_pembelian' => '2023-09-05',
                'status' => 'tersedia',
            ],

            // NON-ELEKTRONIK - Karpet
            [
                'kode_aset' => 'NEL-KAR-001',
                'kategori' => 'Non-Elektronik',
                'nama_barang' => 'Karpet Kantor 3x4 meter',
                'lokasi' => 'Ruang Meeting',
                'kondisi' => 'baik',
                'penanggung_jawab' => 'GA Department',
                'harga' => 1200000,
                'tanggal_pembelian' => '2023-08-30',
                'status' => 'tersedia',
            ],
        ];

        foreach ($asets as $aset) {
            Aset::create($aset);
        }
    }
}
