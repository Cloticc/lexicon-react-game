<?php 
require("db.php");


$response = array();

$isFetchRequest = isset($_SERVER['HTTP_FETCH_REQUEST']) && $_SERVER['HTTP_FETCH_REQUEST'] === 'true';

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
        $stmt = $pdo->prepare("SELECT steps, time FROM highscore WHERE alias = :alias AND level = :level");
        $stmt->bindParam(':level', $level, PDO::PARAM_INT);
        $stmt->bindParam(':alias', $alias, PDO::PARAM_STR);
        $stmt->execute();
        $existingScore = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$existingScore || ($steps < $existingScore['steps'] || ($steps == $existingScore['steps'] && $time < $existingScore['time']))) {

            // Remove all old high scores with the same alias
            $deleteStmt = $pdo->prepare("DELETE FROM highscore WHERE level = :level AND alias = :alias");
            $deleteStmt->bindParam(':level', $level, PDO::PARAM_INT);
            $deleteStmt->bindParam(':alias', $alias, PDO::PARAM_STR);
            $deleteStmt->execute();


            $insertStmt = $pdo->prepare("INSERT INTO highscore (level, alias, steps, time) VALUES (:level, :alias, :steps, :time)");
            $insertStmt->bindParam(':level', $level, PDO::PARAM_INT);
            $insertStmt->bindParam(':alias', $alias, PDO::PARAM_STR);
            $insertStmt->bindParam(':steps', $steps, PDO::PARAM_INT);
            $insertStmt->bindParam(':time', $time, PDO::PARAM_STR);
            $insertStmt->execute();

            $response['success'] = true;
            $response['message'] = "High score added successfully";


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
