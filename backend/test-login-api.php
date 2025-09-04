<?php

echo "🔍 Testing Login API Endpoint...\n\n";

// Test login with admin credentials
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
    'Accept: application/json',
    'X-Requested-With: XMLHttpRequest'
]);
curl_setopt($ch, CURLOPT_VERBOSE, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo "Status Code: $httpCode\n";
echo "Response: $response\n";

if ($error) {
    echo "cURL Error: $error\n";
}

if ($httpCode === 200) {
    echo "✅ Login API working correctly!\n";
} else {
    echo "❌ Login API has issues!\n";
    
    if ($httpCode === 422) {
        echo "💡 422 Error usually means validation failed\n";
        echo "Check if email/password format is correct\n";
    }
}

echo "\n";
