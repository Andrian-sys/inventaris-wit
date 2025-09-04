<?php

echo "🔍 Testing Login API with Frontend Headers...\n\n";

// Test login with admin credentials (same as frontend would send)
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
    'X-Requested-With: XMLHttpRequest',
    'Origin: http://localhost:5173'
]);
curl_setopt($ch, CURLOPT_VERBOSE, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo "Status Code: $httpCode\n";
echo "Response: $response\n";

if ($error) {
    echo "cURL Error: $error\n";
}

// Parse response to check structure
$responseData = json_decode($response, true);
if ($responseData) {
    echo "\n📋 Response Structure:\n";
    if (isset($responseData['success'])) {
        echo "✅ Success: " . ($responseData['success'] ? 'true' : 'false') . "\n";
    }
    if (isset($responseData['message'])) {
        echo "📝 Message: " . $responseData['message'] . "\n";
    }
    if (isset($responseData['data'])) {
        echo "📊 Data keys: " . implode(', ', array_keys($responseData['data'])) . "\n";
    }
    if (isset($responseData['errors'])) {
        echo "❌ Validation Errors: " . json_encode($responseData['errors']) . "\n";
    }
}

if ($httpCode === 200) {
    echo "\n✅ Login API working correctly!\n";
} else {
    echo "\n❌ Login API has issues!\n";
    
    if ($httpCode === 422) {
        echo "💡 422 Error - Validation failed\n";
        if (isset($responseData['errors'])) {
            echo "Validation errors:\n";
            foreach ($responseData['errors'] as $field => $errors) {
                echo "  $field: " . implode(', ', $errors) . "\n";
            }
        }
    }
}

echo "\n";
