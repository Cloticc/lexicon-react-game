<?php
require("dbconfig.php");

try {

    // Create 'maps' table
    $pdo->exec("CREATE TABLE IF NOT EXISTS maps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        alias VARCHAR(255) NULL,
        mapdata LONGTEXT NULL,
        created DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // Create 'highscore' table
    $pdo->exec("CREATE TABLE IF NOT EXISTS highscore (
        id INT AUTO_INCREMENT PRIMARY KEY,
        level INT NULL,
        alias VARCHAR(255) NULL,
        steps INT NOT NULL,
        time INT NOT NULL,
        registered DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

   
} catch (PDOException $e) {
    // If an error occurs, display error message
    die("Error creating tables: " . $e->getMessage());
}
?>
