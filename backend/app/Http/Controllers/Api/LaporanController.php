<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Aset;
use App\Models\MutasiAset;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AsetExport;
use App\Exports\MutasiAsetExport;

class LaporanController extends Controller
{
    /**
     * Export assets to Excel
     */
    public function exportAsetExcel(Request $request)
    {
        $request->validate([
            'kategori' => 'nullable|string',
            'lokasi' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        $filename = 'laporan-aset-' . date('Y-m-d-H-i-s') . '.xlsx';
        
        return Excel::download(new AsetExport($request), $filename);
    }

    /**
     * Export assets to PDF
     */
    public function exportAsetPDF(Request $request)
    {
        $request->validate([
            'kategori' => 'nullable|string',
            'lokasi' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        $query = Aset::query();

        if ($request->kategori) {
            $query->where('kategori', $request->kategori);
        }

        if ($request->lokasi) {
            $query->where('lokasi', $request->lokasi);
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $asets = $query->get();

        $pdf = \PDF::loadView('laporan.aset-pdf', [
            'asets' => $asets,
            'filters' => $request->only(['kategori', 'lokasi', 'status']),
        ]);

        return $pdf->download('laporan-aset-' . date('Y-m-d-H-i-s') . '.pdf');
    }

    /**
     * Export mutations to Excel
     */
    public function exportMutasiExcel(Request $request)
    {
        $request->validate([
            'status' => 'nullable|string',
            'jenis_mutasi' => 'nullable|string',
            'tanggal_mulai' => 'nullable|date',
            'tanggal_akhir' => 'nullable|date',
        ]);

        $filename = 'laporan-mutasi-' . date('Y-m-d-H-i-s') . '.xlsx';
        
        return Excel::download(new MutasiAsetExport($request), $filename);
    }

    /**
     * Export mutations to PDF
     */
    public function exportMutasiPDF(Request $request)
    {
        $request->validate([
            'status' => 'nullable|string',
            'jenis_mutasi' => 'nullable|string',
            'tanggal_mulai' => 'nullable|date',
            'tanggal_akhir' => 'nullable|date',
        ]);

        $query = MutasiAset::with(['aset', 'user']);

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->jenis_mutasi) {
            $query->where('jenis_mutasi', $request->jenis_mutasi);
        }

        if ($request->tanggal_mulai) {
            $query->where('tanggal_pinjam', '>=', $request->tanggal_mulai);
        }

        if ($request->tanggal_akhir) {
            $query->where('tanggal_pinjam', '<=', $request->tanggal_akhir);
        }

        $mutasiAsets = $query->orderBy('created_at', 'desc')->get();

        $pdf = \PDF::loadView('laporan.mutasi-pdf', [
            'mutasiAsets' => $mutasiAsets,
            'filters' => $request->only(['status', 'jenis_mutasi', 'tanggal_mulai', 'tanggal_akhir']),
        ]);

        return $pdf->download('laporan-mutasi-' . date('Y-m-d-H-i-s') . '.pdf');
    }

    /**
     * Get dashboard statistics
     */
    public function dashboardStats()
    {
        $totalAset = Aset::count();
        $asetTersedia = Aset::where('status', 'tersedia')->count();
        $asetDipinjam = Aset::where('status', 'dipinjam')->count();
        $asetMaintenance = Aset::where('status', 'maintenance')->count();
        $asetRusak = Aset::where('status', 'rusak')->count();

        $totalMutasi = MutasiAset::count();
        $mutasiPending = MutasiAset::where('status', 'pending')->count();
        $mutasiDisetujui = MutasiAset::where('status', 'disetujui')->count();
        $mutasiOverdue = MutasiAset::where('jenis_mutasi', 'peminjaman')
            ->where('status', 'disetujui')
            ->where('tanggal_kembali', '<', now())
            ->count();

        $kategoriStats = Aset::selectRaw('kategori, COUNT(*) as total')
            ->groupBy('kategori')
            ->get();

        $lokasiStats = Aset::selectRaw('lokasi, COUNT(*) as total')
            ->groupBy('lokasi')
            ->get();

        $recentMutations = MutasiAset::with(['aset', 'user'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'aset_stats' => [
                    'total' => $totalAset,
                    'tersedia' => $asetTersedia,
                    'dipinjam' => $asetDipinjam,
                    'maintenance' => $asetMaintenance,
                    'rusak' => $asetRusak,
                ],
                'mutasi_stats' => [
                    'total' => $totalMutasi,
                    'pending' => $mutasiPending,
                    'disetujui' => $mutasiDisetujui,
                    'overdue' => $mutasiOverdue,
                ],
                'kategori_stats' => $kategoriStats,
                'lokasi_stats' => $lokasiStats,
                'recent_mutations' => $recentMutations,
            ],
        ]);
    }
}
