<?php

$userId = $_POST['userId'];
$customerId = $_POST['customerId'];
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

$sql = "INSERT INTO `deals`(`contributors`, `task_id`) VALUES ('" . $userId .
";" . $customerId . "', '" . $taskId . "')";
$result = $conn->query($sql);

if ($result === TRUE) {
    echo "Deal created successfully!";
} else {
    echo "Error: " . $sql . $conn->error;
}
$conn->close();

?>
