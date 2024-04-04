<?php
// save-json.php

$isFetchRequest = isset($_SERVER['HTTP_FETCH_REQUEST']) && $_SERVER['HTTP_FETCH_REQUEST'] === 'true';

$response = [];

if (!$isFetchRequest) {
    $response['success'] = false;
    $response['message'] = "Forbidden: Fetch request expected";
    echo json_encode($response);
    exit;
}

// Specify the directory where JSON files are stored
$directory = '../maps/';

// Get all files with names matching the pattern 'map*.json' in the specified directory
$files = glob($directory . 'map*.json');

// If no files found, start with map1.json
if (empty($files)) {
    $latestFileNumber = 0;
} else {
    // Extract the file numbers from the filenames and find the maximum
    $fileNumbers = array_map(function ($file) {
        return intval(preg_replace('/[^0-9]+/', '', basename($file, '.json')));
    }, $files);
    $latestFileNumber = max($fileNumbers);
}

// Increment the latest file number to generate the filename for the new file
$newFileName = 'map' . ($latestFileNumber + 1) . '.json';
$filePath = $directory . $newFileName;

// Get the JSON data from the request body
$jsonData = file_get_contents('php://input');

 try {
    $insertStmt = $pdo->prepare("INSERT INTO maps (mapdata) VALUES (:mapdata)");
    $insertStmt->bindParam(':mapdata', $jsonData, PDO::PARAM_STR);
    $insertStmt->execute();

 } catch (PDOException $e) {
    $response['message'] = "Error: " . $e->getMessage();
}

// Save the JSON data to the new file
if (file_put_contents($filePath, $jsonData) !== false) {
    // If successful, send success response
    $response['status'] = 'success';
    $response['file'] = $newFileName;
} else {
    // If error occurred, send error response
    $response['status'] = 'error';
    $response['message'] = 'Failed to save JSON data.';
}

echo json_encode($response);
?>
