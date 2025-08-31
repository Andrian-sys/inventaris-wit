<?php

namespace App\Exports;

use App\Models\MutasiAset;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Illuminate\Http\Request;

class MutasiAsetExport implements FromCollection, WithHeadings, WithMapping
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
        $query = MutasiAset::with(['aset', 'user']);

        if ($this->request->status) {
            $query->where('status', $this->request->status);
        }

        if ($this->request->jenis_mutasi) {
            $query->where('jenis_mutasi', $this->request->jenis_mutasi);
        }

        if ($this->request->tanggal_mulai) {
            $query->where('tanggal_pinjam', '>=', $this->request->tanggal_mulai);
        }

        if ($this->request->tanggal_akhir) {
            $query->where('tanggal_pinjam', '<=', $this->request->tanggal_akhir);
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    public function headings(): array
    {
        return [
            'Kode Aset',
            'Nama Barang',
            'Peminjam',
            'Jenis Mutasi',
            'Tanggal Pinjam',
            'Tanggal Kembali',
            'Status',
            'Keterangan',
            'Tanggal Dibuat',
        ];
    }

    public function map($mutasi): array
    {
        return [
            $mutasi->aset->kode_aset,
            $mutasi->aset->nama_barang,
            $mutasi->user->name,
            $mutasi->jenis_mutasi,
            $mutasi->tanggal_pinjam->format('d/m/Y'),
            $mutasi->tanggal_kembali ? $mutasi->tanggal_kembali->format('d/m/Y') : '-',
            $mutasi->status,
            $mutasi->keterangan ?? '-',
            $mutasi->created_at->format('d/m/Y H:i'),
        ];
    }
}
