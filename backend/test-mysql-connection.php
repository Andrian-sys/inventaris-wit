<?php

echo "🔍 Testing MySQL XAMPP Connection...\n\n";

try {
    // Test MySQL connection
    $pdo = new PDO('mysql:host=127.0.0.1;port=3306', 'root', '');
    echo "✅ MySQL connection successful!\n";
    
    // Check if database exists
    $stmt = $pdo->query("SHOW DATABASES LIKE 'inventaris_wit'");
    $databaseExists = $stmt->rowCount() > 0;
    
    if ($databaseExists) {
        echo "✅ Database 'inventaris_wit' exists!\n";
        
        // Check tables
        $pdo->exec("USE inventaris_wit");
        $stmt = $pdo->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        echo "📋 Existing tables:\n";
        foreach ($tables as $table) {
            echo "   - $table\n";
        }
        
        if (empty($tables)) {
            echo "⚠️  Database is empty, ready for migrations\n";
        }
        
    } else {
        echo "⚠️  Database 'inventaris_wit' does not exist\n";
        echo "💡 Creating database...\n";
        
        $pdo->exec("CREATE DATABASE inventaris_wit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        echo "✅ Database 'inventaris_wit' created successfully!\n";
    }
    
} catch (PDOException $e) {
    echo "❌ MySQL connection failed!\n";
    echo "Error: " . $e->getMessage() . "\n";
    echo "\n💡 Please check:\n";
    echo "   1. XAMPP MySQL is running\n";
    echo "   2. Port 3306 is not blocked\n";
    echo "   3. Username 'root' has no password\n";
}

echo "\n";
