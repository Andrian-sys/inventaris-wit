<?php

echo "🔍 Testing Error Scenarios...\n\n";

// Test scenarios that might cause 422 error
$testCases = [
    [
        'name' => 'Empty email',
        'data' => ['email' => '', 'password' => 'password123']
    ],
    [
        'name' => 'Empty password',
        'data' => ['email' => 'admin@wit.id', 'password' => '']
    ],
    [
        'name' => 'Invalid email format',
        'data' => ['email' => 'not-an-email', 'password' => 'password123']
    ],
    [
        'name' => 'Wrong password',
        'data' => ['email' => 'admin@wit.id', 'password' => 'wrongpassword']
    ],
    [
        'name' => 'Non-existent email',
        'data' => ['email' => 'nonexistent@wit.id', 'password' => 'password123']
    ],
    [
        'name' => 'Extra fields',
        'data' => ['email' => 'admin@wit.id', 'password' => 'password123', 'extra' => 'field']
    ]
];

foreach ($testCases as $test) {
    echo "Testing: {$test['name']}\n";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://localhost:8001/api/login');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($test['data']));
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
    echo "   Response: " . substr($response, 0, 150) . "...\n\n";
}

echo "✅ Error scenario testing complete!\n";
