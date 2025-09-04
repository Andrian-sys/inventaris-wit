<?php

echo "🔍 Testing Assets API with Authentication...\n\n";

// Step 1: Login to get token
echo "1. Logging in to get token...\n";
$loginData = json_encode([
    'email' => 'admin@wit.id',
    'password' => 'password123'
]);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:8001/api/login');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $loginData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json'
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $loginResponse = json_decode($response, true);
    $token = $loginResponse['data']['token'];
    echo "✅ Login successful! Token: " . substr($token, 0, 20) . "...\n\n";
    
    // Step 2: Get all assets
    echo "2. Testing GET /api/asets...\n";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://localhost:8001/api/asets');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json',
        'Authorization: Bearer ' . $token
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    echo "Status: $httpCode\n";
    $data = json_decode($response, true);
    if ($data && isset($data['data'])) {
        echo "✅ Assets count: " . count($data['data']) . "\n";
        
        // Count by category
        $elektronik = array_filter($data['data'], function($asset) {
            return $asset['kategori'] === 'Elektronik';
        });
        $nonElektronik = array_filter($data['data'], function($asset) {
            return $asset['kategori'] === 'Non-Elektronik';
        });
        
        echo "📱 Elektronik: " . count($elektronik) . " items\n";
        echo "🪑 Non-Elektronik: " . count($nonElektronik) . " items\n";
        
        // Show first few items
        echo "\nFirst 3 assets:\n";
        for ($i = 0; $i < min(3, count($data['data'])); $i++) {
            $asset = $data['data'][$i];
            echo "   {$asset['kode_aset']} | {$asset['nama_barang']} | {$asset['kategori']} | {$asset['status']}\n";
        }
    } else {
        echo "❌ Error: " . substr($response, 0, 200) . "...\n";
    }
    
    // Step 3: Test category filter
    echo "\n3. Testing filter by Elektronik category...\n";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://localhost:8001/api/asets?kategori=Elektronik');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json',
        'Authorization: Bearer ' . $token
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    echo "Status: $httpCode\n";
    $data = json_decode($response, true);
    if ($data && isset($data['data'])) {
        echo "✅ Elektronik assets count: " . count($data['data']) . "\n";
    } else {
        echo "❌ Error: " . substr($response, 0, 200) . "...\n";
    }
    
} else {
    echo "❌ Login failed! Status: $httpCode\n";
    echo "Response: $response\n";
}

echo "\n✅ Assets API testing complete!\n";
