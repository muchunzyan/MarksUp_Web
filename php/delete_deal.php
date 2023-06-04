<?php

$dealId = $_POST['dealId'];

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

$sql = "DELETE FROM `deals` WHERE `id`='" . $dealId . "'";
$result = $conn->query($sql);

if ($result === TRUE) {
    echo "Deal deleted successfully!";

    $sql = "DELETE FROM `messages` WHERE `deal_id`='" . $dealId . "'";
    $conn->query($sql);
} else {
    echo "Error: " . $sql . $conn->error;
}
$conn->close();

?>
