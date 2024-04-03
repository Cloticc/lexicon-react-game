<?php
// save-json.php

if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') {
    // If not set to XMLHttpRequest, exit with an error message
    header('HTTP/1.1 403 Forbidden');
    echo 'Forbidden';
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

// Save the JSON data to the new file
file_put_contents($filePath, $jsonData);


?>
