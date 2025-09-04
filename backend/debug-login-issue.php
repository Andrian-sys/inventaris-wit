<?php

echo "🔍 Debugging Login Issue...\n\n";

// Test 1: Basic connection
echo "1. Testing basic connection...\n";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:8001/api/cors-test');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json',
    'Origin: http://localhost:5173'
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
echo "   Status: $httpCode\n";
echo "   Response: $response\n\n";

// Test 2: Login with different data formats
echo "2. Testing login with different data formats...\n";

// Test 2a: Standard format
echo "2a. Standard format:\n";
$loginData1 = json_encode(['email' => 'admin@wit.id', 'password' => 'password123']);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:8001/api/login');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $loginData1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json',
    'X-Requested-With: XMLHttpRequest',
    'Origin: http://localhost:5173'
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
echo "   Status: $httpCode\n";
echo "   Response: " . substr($response, 0, 100) . "...\n\n";

// Test 2b: Form data format
echo "2b. Form data format:\n";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:8001/api/login');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'email=admin@wit.id&password=password123');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/x-www-form-urlencoded',
    'Accept: application/json',
    'X-Requested-With: XMLHttpRequest',
    'Origin: http://localhost:5173'
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
echo "   Status: $httpCode\n";
echo "   Response: " . substr($response, 0, 100) . "...\n\n";

// Test 3: Check if it's a validation issue
echo "3. Testing with invalid data to check validation:\n";
$invalidData = json_encode(['email' => 'invalid-email', 'password' => '']);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:8001/api/login');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $invalidData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json',
    'X-Requested-With: XMLHttpRequest',
    'Origin: http://localhost:5173'
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
echo "   Status: $httpCode\n";
echo "   Response: $response\n\n";

echo "✅ Debug complete!\n";
