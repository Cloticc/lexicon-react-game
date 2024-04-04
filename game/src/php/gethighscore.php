<?php
require("db.php");

$response = array();

if(isset($_GET['level']) || isset($_POST['level'])) {
    if(isset($_GET['level'])) {
        $level = $_GET['level'];
    } else {
        $level = $_POST['level'];
    }

    try {
        // Prepare SQL query to select the 10 best high scores
        $stmt = $pdo->prepare("SELECT * FROM highscore WHERE level = :level ORDER BY steps ASC, time ASC LIMIT 10");
        $stmt->bindParam(':level', $level, PDO::PARAM_INT);
        $stmt->execute();
        $highscores = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response['success'] = true;
        $response['highscores'] = $highscores;
    } catch (PDOException $e) {
        // If an error occurs, set error message in response
        $response['success'] = false;
        $response['message'] = "Error: " . $e->getMessage();
    }
} else {
    // If no level specified, set error message in response
    $response['success'] = false;
    $response['message'] = "Error: No level specified";
}
header('Content-Type: application/json');
// Encode the response array as JSON and output it
echo json_encode($response);
?>
