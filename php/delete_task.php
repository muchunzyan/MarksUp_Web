<?php

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

$sql = "DELETE FROM `tasks` WHERE `id`='" . $taskId . "'";

$result = $conn->query($sql);
if ($result === TRUE) {
    echo "Task deleted successfully!";
} else {
    echo "Error: " . $sql . $conn->error;
}

$conn->close();

?>
