<?php

$host = 'localhost'; 
$dbname = 'diam_sokoban'; 
$username = 'diam_sokoban'; 
$password = 'xr5mCC6DJVFQCYxaJxqd';


try {
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    $pdo = new PDO($dsn, $username, $password, $options);
} catch (PDOException $e) {

    die("Connection failed: " . $e->getMessage());
}
?>
