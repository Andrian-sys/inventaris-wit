<?php

echo "🔍 Testing Barcode Generation...\n\n";

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
    
    // Step 2: Test barcode generation for first asset
    echo "2. Testing barcode generation for asset ID 1...\n";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://localhost:8001/api/barcode/1/generate');
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
    if ($httpCode === 200) {
        $data = json_decode($response, true);
        echo "✅ Barcode generated successfully!\n";
        echo "Asset: " . $data['data']['aset']['nama_barang'] . "\n";
        echo "Barcode Data: " . $data['data']['barcode_data'] . "\n";
        echo "Barcode Image: " . substr($data['data']['barcode_image'], 0, 50) . "...\n";
    } else {
        echo "❌ Error: " . substr($response, 0, 200) . "...\n";
    }
    
    // Step 3: Test QR code generation
    echo "\n3. Testing QR code generation for asset ID 1...\n";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://localhost:8001/api/barcode/1/generate-qr');
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
    if ($httpCode === 200) {
        $data = json_decode($response, true);
        echo "✅ QR code generated successfully!\n";
        echo "Asset: " . $data['data']['aset']['nama_barang'] . "\n";
        echo "QR Data: " . $data['data']['qr_data'] . "\n";
        echo "QR Image: " . substr($data['data']['qr_image'], 0, 50) . "...\n";
    } else {
        echo "❌ Error: " . substr($response, 0, 200) . "...\n";
    }
    
} else {
    echo "❌ Login failed! Status: $httpCode\n";
    echo "Response: $response\n";
}

echo "\n✅ Barcode testing complete!\n";
