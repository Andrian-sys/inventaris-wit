<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "🔍 Checking assets in database...\n\n";

try {
    $assets = App\Models\Aset::all(['id', 'kode_aset', 'kategori', 'nama_barang', 'lokasi', 'kondisi', 'status']);
    
    if ($assets->count() > 0) {
        echo "✅ Found " . $assets->count() . " assets:\n\n";
        
        // Group by category
        $elektronik = $assets->where('kategori', 'Elektronik');
        $nonElektronik = $assets->where('kategori', 'Non-Elektronik');
        
        echo "📱 ELEKTRONIK (" . $elektronik->count() . " items):\n";
        foreach ($elektronik as $asset) {
            echo "   {$asset->kode_aset} | {$asset->nama_barang} | {$asset->lokasi} | {$asset->kondisi} | {$asset->status}\n";
        }
        
        echo "\n🪑 NON-ELEKTRONIK (" . $nonElektronik->count() . " items):\n";
        foreach ($nonElektronik as $asset) {
            echo "   {$asset->kode_aset} | {$asset->nama_barang} | {$asset->lokasi} | {$asset->kondisi} | {$asset->status}\n";
        }
        
        // Statistics
        echo "\n📊 STATISTICS:\n";
        echo "   Total Assets: " . $assets->count() . "\n";
        echo "   Elektronik: " . $elektronik->count() . "\n";
        echo "   Non-Elektronik: " . $nonElektronik->count() . "\n";
        echo "   Tersedia: " . $assets->where('status', 'tersedia')->count() . "\n";
        echo "   Dipinjam: " . $assets->where('status', 'dipinjam')->count() . "\n";
        echo "   Maintenance: " . $assets->where('status', 'maintenance')->count() . "\n";
        echo "   Kondisi Baik: " . $assets->where('kondisi', 'baik')->count() . "\n";
        echo "   Kondisi Rusak Ringan: " . $assets->where('kondisi', 'rusak_ringan')->count() . "\n";
        echo "   Kondisi Maintenance: " . $assets->where('kondisi', 'maintenance')->count() . "\n";
        
    } else {
        echo "❌ No assets found in database!\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}

echo "\n";
