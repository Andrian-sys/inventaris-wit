<?php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "🔍 Checking users in database...\n\n";

try {
    $users = App\Models\User::all(['id', 'name', 'email', 'role']);
    
    if ($users->count() > 0) {
        echo "✅ Found " . $users->count() . " users:\n";
        foreach ($users as $user) {
            echo "   ID: {$user->id} | Name: {$user->name} | Email: {$user->email} | Role: {$user->role}\n";
        }
    } else {
        echo "❌ No users found in database!\n";
        echo "💡 Need to run: php artisan db:seed --class=UserSeeder\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}

echo "\n";
