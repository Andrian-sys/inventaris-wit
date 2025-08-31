<?php

namespace App\Exports;

use App\Models\Aset;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Illuminate\Http\Request;

class AsetExport implements FromCollection, WithHeadings, WithMapping
{
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $query = Aset::query();

        if ($this->request->kategori) {
            $query->where('kategori', $this->request->kategori);
        }

        if ($this->request->lokasi) {
            $query->where('lokasi', $this->request->lokasi);
        }

        if ($this->request->status) {
            $query->where('status', $this->request->status);
        }

        return $query->get();
    }

    public function headings(): array
    {
        return [
            'Kode Aset',
            'Kategori',
            'Nama Barang',
            'Lokasi',
            'Kondisi',
            'Penanggung Jawab',
            'Harga',
            'Tanggal Pembelian',
            'Status',
            'Tanggal Dibuat',
        ];
    }

    public function map($aset): array
    {
        return [
            $aset->kode_aset,
            $aset->kategori,
            $aset->nama_barang,
            $aset->lokasi,
            $aset->kondisi,
            $aset->penanggung_jawab,
            number_format($aset->harga, 0, ',', '.'),
            $aset->tanggal_pembelian->format('d/m/Y'),
            $aset->status,
            $aset->created_at->format('d/m/Y H:i'),
        ];
    }
}
