<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Aset;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AsetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Aset::query();

        // Search functionality
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('kode_aset', 'like', "%{$search}%")
                  ->orWhere('nama_barang', 'like', "%{$search}%")
                  ->orWhere('kategori', 'like', "%{$search}%")
                  ->orWhere('lokasi', 'like', "%{$search}%")
                  ->orWhere('penanggung_jawab', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by kategori
        if ($request->has('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        // Filter by lokasi
        if ($request->has('lokasi')) {
            $query->where('lokasi', $request->lokasi);
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $asets = $query->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $asets,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'kode_aset' => 'required|string|unique:asets,kode_aset',
            'kategori' => 'required|string',
            'nama_barang' => 'required|string',
            'lokasi' => 'required|string',
            'kondisi' => 'required|in:baik,rusak_ringan,rusak_berat,maintenance',
            'penanggung_jawab' => 'required|string',
            'harga' => 'required|numeric|min:0',
            'tanggal_pembelian' => 'required|date',
            'status' => 'required|in:tersedia,dipinjam,maintenance,rusak',
        ]);

        $aset = Aset::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Aset berhasil ditambahkan',
            'data' => $aset,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $aset = Aset::with('mutasiAsets.user')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $aset,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $aset = Aset::findOrFail($id);

        $request->validate([
            'kode_aset' => 'required|string|unique:asets,kode_aset,' . $id,
            'kategori' => 'required|string',
            'nama_barang' => 'required|string',
            'lokasi' => 'required|string',
            'kondisi' => 'required|in:baik,rusak_ringan,rusak_berat,maintenance',
            'penanggung_jawab' => 'required|string',
            'harga' => 'required|numeric|min:0',
            'tanggal_pembelian' => 'required|date',
            'status' => 'required|in:tersedia,dipinjam,maintenance,rusak',
        ]);

        $aset->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Aset berhasil diperbarui',
            'data' => $aset,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $aset = Aset::findOrFail($id);
        $aset->delete();

        return response()->json([
            'success' => true,
            'message' => 'Aset berhasil dihapus',
        ]);
    }

    /**
     * Get statistics for dashboard
     */
    public function statistics()
    {
        $totalAset = Aset::count();
        $asetTersedia = Aset::where('status', 'tersedia')->count();
        $asetDipinjam = Aset::where('status', 'dipinjam')->count();
        $asetMaintenance = Aset::where('status', 'maintenance')->count();
        $asetRusak = Aset::where('status', 'rusak')->count();

        $kategoriStats = Aset::selectRaw('kategori, COUNT(*) as total')
            ->groupBy('kategori')
            ->get();

        $lokasiStats = Aset::selectRaw('lokasi, COUNT(*) as total')
            ->groupBy('lokasi')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total_aset' => $totalAset,
                'aset_tersedia' => $asetTersedia,
                'aset_dipinjam' => $asetDipinjam,
                'aset_maintenance' => $asetMaintenance,
                'aset_rusak' => $asetRusak,
                'kategori_stats' => $kategoriStats,
                'lokasi_stats' => $lokasiStats,
            ],
        ]);
    }
}
