<?php
require_once 'config.php';

try {
    // Create a PDO instance
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);

    // Set PDO to throw exceptions on error
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Test query
    $stmt = $pdo->query("SELECT 1");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result['1'] == 1) {
        echo "Database connection successful!";
    } else {
        echo "Database connection failed!";
    }
} catch (PDOException $e) {
    // Handle connection errors
    echo 'Connection failed: ' . $e->getMessage();
}
