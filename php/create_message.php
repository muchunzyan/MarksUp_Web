<?php

$messageText = $_POST['messageText'];
$fileLink = $_POST['fileLink'];
$senderId = $_POST['senderId'];
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

$sql = "INSERT INTO `messages` (`text`, `file_link`, `sender_id`, `deal_id`)
VALUES (";

if ($messageText != NULL && $messageText !="") {
    $sql .= "'" . $messageText . "',";
} else {
    $sql .= "NULL,";
}
if ($fileLink != NULL && $fileLink !="") {
    $sql .= "'" . $fileLink . "',";
} else {
    $sql .= "NULL,";
}
$sql .= "'" . $senderId . "','" . $dealId . "')";

$result = $conn->query($sql);

if ($result === TRUE) {
    echo "Message created successfully!";
} else {
    echo "Error: " . $sql . $conn->error;
}
$conn->close();

?>
