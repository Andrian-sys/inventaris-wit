<?php

echo "🔍 Testing Assets API...\n\n";

// Test 1: Get all assets
echo "1. Testing GET /api/asets...\n";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:8001/api/asets');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json',
    'Authorization: Bearer 1|EiovrTCB5sySxHMYWH8bUKeNOSENuUKy49LXApztd68e1ec0'
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "Status: $httpCode\n";
$data = json_decode($response, true);
if ($data && isset($data['data'])) {
    echo "Assets count: " . count($data['data']) . "\n";
    echo "First asset: " . $data['data'][0]['nama_barang'] . " (" . $data['data'][0]['kategori'] . ")\n";
} else {
    echo "Response: " . substr($response, 0, 200) . "...\n";
}

// Test 2: Filter by category
echo "\n2. Testing filter by Elektronik category...\n";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:8001/api/asets?kategori=Elektronik');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json',
    'Authorization: Bearer 1|EiovrTCB5sySxHMYWH8bUKeNOSENuUKy49LXApztd68e1ec0'
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "Status: $httpCode\n";
$data = json_decode($response, true);
if ($data && isset($data['data'])) {
    echo "Elektronik assets count: " . count($data['data']) . "\n";
} else {
    echo "Response: " . substr($response, 0, 200) . "...\n";
}

// Test 3: Filter by Non-Elektronik category
echo "\n3. Testing filter by Non-Elektronik category...\n";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:8001/api/asets?kategori=Non-Elektronik');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json',
    'Authorization: Bearer 1|EiovrTCB5sySxHMYWH8bUKeNOSENuUKy49LXApztd68e1ec0'
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "Status: $httpCode\n";
$data = json_decode($response, true);
if ($data && isset($data['data'])) {
    echo "Non-Elektronik assets count: " . count($data['data']) . "\n";
} else {
    echo "Response: " . substr($response, 0, 200) . "...\n";
}

echo "\n✅ Assets API testing complete!\n";
