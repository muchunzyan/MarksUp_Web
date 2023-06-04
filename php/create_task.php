<?php

$subjectName = $_POST['subjectName'];
$deadline = $_POST['deadline'];
$price = $_POST['price'];
$educationalInst = $_POST['educationalInst'];
$taskType = $_POST['taskType'];
$description = $_POST['description'];
$imagesLinks = $_POST['imagesLinks'];
$userId = $_POST['userId'];
$taskId = $_POST['taskId'];


$servername = "*****";
$username = "*****";
$password = "*****";
$dbname = "*****";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$conn->query("SET NAMES utf8");

if ($taskId != NULL && $taskId != "") {
    $sql = "UPDATE `tasks` SET `subject_name`='" . $subjectName . "',
    `deadline`='" . $deadline . "',`price`='" . $price . "',
    `educational_inst`='" . $educationalInst . "',
    `task_type`='" . $taskType . "',`description`='" . $description . "',
    `images_links`='" . $imagesLinks . "'
    WHERE `id`='" . $taskId . "'";
} else {
    $sql = "INSERT INTO `tasks`(`subject_name`, `deadline`, `price`,
    `educational_inst`, `task_type`, `description`, `images_links`, `user_id`)
    VALUES ('" . $subjectName . "', '" . $deadline . "', '" . $price . "', '" .
    $educationalInst . "', '" . $taskType . "', '" . $description . "', '" .
    $imagesLinks . "', '" . $userId . "')";
}

$result = $conn->query($sql);
if ($result === TRUE) {
    echo "Task created successfully!";
} else {
    echo "Error: " . $sql . $conn->error;
}

$conn->close();

?>
