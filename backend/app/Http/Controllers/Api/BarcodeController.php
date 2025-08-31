<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Aset;
use Illuminate\Http\Request;
use Milon\Barcode\DNS1D;
use Milon\Barcode\DNS2D;

class BarcodeController extends Controller
{
    /**
     * Generate barcode for asset
     */
    public function generate(Request $request, $id)
    {
        $aset = Aset::findOrFail($id);
        
        // Generate barcode using asset code
        $barcode = new DNS1D();
        $barcodeData = $aset->kode_aset;
        
        // Generate barcode image
        $barcodeImage = $barcode->getBarcodePNG($barcodeData, 'C128', 3, 100);
        
        return response()->json([
            'success' => true,
            'data' => [
                'aset' => $aset,
                'barcode_data' => $barcodeData,
                'barcode_image' => 'data:image/png;base64,' . $barcodeImage,
            ],
        ]);
    }

    /**
     * Generate QR code for asset
     */
    public function generateQR(Request $request, $id)
    {
        $aset = Aset::findOrFail($id);
        
        // Generate QR code using asset code
        $qrCode = new DNS2D();
        $qrData = $aset->kode_aset;
        
        // Generate QR code image
        $qrImage = $qrCode->getBarcodePNG($qrData, 'QRCODE', 10, 10);
        
        return response()->json([
            'success' => true,
            'data' => [
                'aset' => $aset,
                'qr_data' => $qrData,
                'qr_image' => 'data:image/png;base64,' . $qrImage,
            ],
        ]);
    }

    /**
     * Download barcode as PDF
     */
    public function downloadPDF(Request $request, $id)
    {
        $aset = Aset::findOrFail($id);
        
        // Generate barcode
        $barcode = new DNS1D();
        $barcodeData = $aset->kode_aset;
        $barcodeImage = $barcode->getBarcodePNG($barcodeData, 'C128', 3, 100);
        
        // Create PDF content
        $html = view('barcode.pdf', [
            'aset' => $aset,
            'barcodeImage' => 'data:image/png;base64,' . $barcodeImage,
        ])->render();
        
        // Generate PDF
        $pdf = \PDF::loadHTML($html);
        
        return $pdf->download('barcode-' . $aset->kode_aset . '.pdf');
    }

    /**
     * Scan barcode
     */
    public function scan(Request $request)
    {
        $request->validate([
            'barcode_data' => 'required|string',
        ]);
        
        $aset = Aset::where('kode_aset', $request->barcode_data)->first();
        
        if (!$aset) {
            return response()->json([
                'success' => false,
                'message' => 'Aset tidak ditemukan',
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $aset->load('mutasiAsets.user'),
        ]);
    }
}
