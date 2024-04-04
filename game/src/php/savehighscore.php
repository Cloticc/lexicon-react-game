<?php 
require("db.php");


$response = array();

// Set appropriate CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, X-Fetch-Request"); // Allow X-Fetch-Request header

$isFetchRequest = isset($_SERVER['HTTP_X_FETCH_REQUEST']) && $_SERVER['HTTP_X_FETCH_REQUEST'] === 'true';


if (!$isFetchRequest) {
    $response['success'] = false;
    $response['message'] = "Forbidden: Fetch request expected";
    echo json_encode($response);
    exit;
}

if(isset($_GET['level']) && isset($_GET['alias']) && isset($_GET['steps']) && isset($_GET['time']) 
|| isset($_POST['level']) && isset($_POST['alias']) && isset($_POST['steps']) && isset($_POST['time'])) {

    if(isset($_GET['level'])) {
        $level = $_GET['level'];
    } else {
        $level = $_POST['level'];
    }

    if(isset($_GET['alias'])) {
        $alias = urldecode($_GET['alias']);
    } else {
        $alias = urldecode($_POST['alias']);
    }

    if(isset($_GET['steps'])) {
        $steps = $_GET['steps'];
    } else {
        $steps = $_POST['steps'];
    }

    if(isset($_GET['time'])) {
        $time = urldecode($_GET['time']);
    } else {
        $time = urldecode($_POST['time']);
    }

    try {
    // Check if a record exists for the provided alias on the specified level
    $existingStmt = $pdo->prepare("SELECT steps, time FROM highscore WHERE BINARY alias = :alias AND level = :level");
    $existingStmt->bindParam(':level', $level, PDO::PARAM_INT);
    $existingStmt->bindParam(':alias', $alias, PDO::PARAM_STR);
    $existingStmt->execute();
    $existingScore = $existingStmt->fetch(PDO::FETCH_ASSOC);

    if (!$existingScore) {
        // If no existing record, insert the new score

        // Insert the new high score
        $insertStmt = $pdo->prepare("INSERT INTO highscore (level, alias, steps, time) VALUES (:level, :alias, :steps, :time)");
        $insertStmt->bindParam(':level', $level, PDO::PARAM_INT);
        $insertStmt->bindParam(':alias', $alias, PDO::PARAM_STR);
        $insertStmt->bindParam(':steps', $steps, PDO::PARAM_INT);
        $insertStmt->bindParam(':time', $time, PDO::PARAM_STR);
        $insertStmt->execute();

        $response['success'] = true;
        $response['message'] = "High score added successfully";
    } else {
        // If existing record, check if new score is better



        if (!$existingScore || $steps < $existingScore['steps'] || ($steps == $existingScore['steps'] && compareTimes($time, $existingScore['time']))) {
            // If new score is better, update the existing record

            // Update the existing high score
            $updateStmt = $pdo->prepare("UPDATE highscore SET steps = :steps, time = :time WHERE level = :level AND alias = :alias");
            $updateStmt->bindParam(':level', $level, PDO::PARAM_INT);
            $updateStmt->bindParam(':alias', $alias, PDO::PARAM_STR);
            $updateStmt->bindParam(':steps', $steps, PDO::PARAM_INT);
            $updateStmt->bindParam(':time', $time, PDO::PARAM_STR);
            $updateStmt->execute();

            $response['success'] = true;
            $response['message'] = "High score updated successfully";
        } else {
            // If new score is not better, do nothing

            $response['success'] = true;
            $response['message'] = "No high score added or updated";
        }

        // Function to compare times in the format '0:423'
        function compareTimes($newTime, $existingTime) {
            $newTimeParts = explode(':', $newTime);
            $existingTimeParts = explode(':', $existingTime);

            $newTimeSeconds = ($newTimeParts[0] * 60) + $newTimeParts[1];
            $existingTimeSeconds = ($existingTimeParts[0] * 60) + $existingTimeParts[1];

            return $newTimeSeconds < $existingTimeSeconds;
        }
    }
} catch (PDOException $e) {
    $response['success'] = false;
    $response['message'] = "Error: " . $e->getMessage();
}



    } else {

    $response['success'] = false;
    $response['message'] = "Error: Not enough data specified";
}



// Encode the response array as JSON and output it
echo json_encode($response);
?>
