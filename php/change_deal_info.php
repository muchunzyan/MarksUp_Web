<?php

$dealId = $_POST['dealId'];
$dealStatus = $_POST['dealStatus'];
$customerPrice = $_POST['customerPrice'];
$executorPrice = $_POST['executorPrice'];

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

$sql = "UPDATE `deals` SET ";

if ($dealStatus != NULL && $dealStatus != "") {
    $sql .= "`status`='" . $dealStatus . "', ";
}
if ($customerPrice != NULL && $customerPrice != "") {
    $sql .= "`customer_price`='" . $customerPrice . "', ";
}
if ($executorPrice != NULL && $executorPrice != "") {
    $sql .= "`executor_price`='" . $executorPrice . "', ";
}

$sql = substr($sql, 0, -2);
$sql .= " WHERE `id`='" . $dealId . "'";
$result = $conn->query($sql);

if ($result === TRUE) {
    echo "Deal changed successfully!";
} else {
    echo "Error: " . $sql . $conn->error;
}
$conn->close();

?>
