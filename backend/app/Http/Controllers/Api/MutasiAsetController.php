<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Aset;
use App\Models\MutasiAset;
use Illuminate\Http\Request;

class MutasiAsetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = MutasiAset::with(['aset', 'user']);

        // Filter by user if staff
        if ($request->user()->isStaff()) {
            $query->where('user_id', $request->user()->id);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by jenis mutasi
        if ($request->has('jenis_mutasi')) {
            $query->where('jenis_mutasi', $request->jenis_mutasi);
        }

        // Filter by date range
        if ($request->has('tanggal_mulai')) {
            $query->where('tanggal_pinjam', '>=', $request->tanggal_mulai);
        }

        if ($request->has('tanggal_akhir')) {
            $query->where('tanggal_pinjam', '<=', $request->tanggal_akhir);
        }

        $mutasiAsets = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $mutasiAsets,
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
            'aset_id' => 'required|exists:asets,id',
            'jenis_mutasi' => 'required|in:peminjaman,pengembalian',
            'tanggal_pinjam' => 'required|date',
            'tanggal_kembali' => 'nullable|date|after:tanggal_pinjam',
            'keterangan' => 'nullable|string',
        ]);

        $aset = Aset::findOrFail($request->aset_id);

        // Check if asset is available for borrowing
        if ($request->jenis_mutasi === 'peminjaman' && $aset->status !== 'tersedia') {
            return response()->json([
                'success' => false,
                'message' => 'Aset tidak tersedia untuk dipinjam',
            ], 400);
        }

        $mutasiAset = MutasiAset::create([
            'aset_id' => $request->aset_id,
            'user_id' => $request->user()->id,
            'jenis_mutasi' => $request->jenis_mutasi,
            'tanggal_pinjam' => $request->tanggal_pinjam,
            'tanggal_kembali' => $request->tanggal_kembali,
            'status' => 'pending',
            'keterangan' => $request->keterangan,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Permintaan mutasi berhasil dibuat',
            'data' => $mutasiAset->load(['aset', 'user']),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $mutasiAset = MutasiAset::with(['aset', 'user'])->findOrFail($id);

        // Check if user can view this mutation
        if (request()->user()->isStaff() && $mutasiAset->user_id !== request()->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $mutasiAset,
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
        $mutasiAset = MutasiAset::findOrFail($id);

        // Only admin can update mutation status
        if (!$request->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $request->validate([
            'status' => 'required|in:pending,disetujui,ditolak,selesai',
            'tanggal_kembali' => 'nullable|date|after:tanggal_pinjam',
            'keterangan' => 'nullable|string',
        ]);

        $oldStatus = $mutasiAset->status;
        $mutasiAset->update($request->only(['status', 'tanggal_kembali', 'keterangan']));

        // Update asset status based on mutation status
        if ($request->status === 'disetujui' && $oldStatus !== 'disetujui') {
            if ($mutasiAset->jenis_mutasi === 'peminjaman') {
                $mutasiAset->aset->update(['status' => 'dipinjam']);
            } elseif ($mutasiAset->jenis_mutasi === 'pengembalian') {
                $mutasiAset->aset->update(['status' => 'tersedia']);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Status mutasi berhasil diperbarui',
            'data' => $mutasiAset->load(['aset', 'user']),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $mutasiAset = MutasiAset::findOrFail($id);

        // Only admin can delete mutations
        if (!request()->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $mutasiAset->delete();

        return response()->json([
            'success' => true,
            'message' => 'Mutasi berhasil dihapus',
        ]);
    }

    /**
     * Get overdue mutations
     */
    public function overdue()
    {
        $overdueMutations = MutasiAset::with(['aset', 'user'])
            ->where('jenis_mutasi', 'peminjaman')
            ->where('status', 'disetujui')
            ->where('tanggal_kembali', '<', now())
            ->get();

        return response()->json([
            'success' => true,
            'data' => $overdueMutations,
        ]);
    }

    /**
     * Get user's borrowing history
     */
    public function userHistory(Request $request)
    {
        $userId = $request->user()->isAdmin() && $request->has('user_id') 
            ? $request->user_id 
            : $request->user()->id;

        $history = MutasiAset::with(['aset'])
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $history,
        ]);
    }
}
