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
    echo "✅ Login successful!\n\n";
    
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
        
        // Show first few items
        echo "\nFirst 5 assets:\n";
        for ($i = 0; $i < min(5, count($data['data'])); $i++) {
            $asset = $data['data'][$i];
            echo "   {$asset['kode_aset']} | {$asset['nama_barang']} | {$asset['kategori']} | {$asset['status']}\n";
        }
    } else {
        echo "❌ Error: " . substr($response, 0, 200) . "...\n";
    }
    
} else {
    echo "❌ Login failed! Status: $httpCode\n";
    echo "Response: $response\n";
}

echo "\n✅ Assets API testing complete!\n";
