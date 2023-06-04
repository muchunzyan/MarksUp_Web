<?php

$userNameInput = $_POST['userNameInput'];
$userEmailInput = $_POST['userEmailInput'];
$userPasswordInput = $_POST['userPasswordInput'];
$userLanguageInput = $_POST['userLanguageInput'];

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

$sql = "SELECT `mail` FROM `users` WHERE `mail` = '" . $userEmailInput . "'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  echo "Mail exists";
} else {
  $sql = "INSERT INTO `users`(`name`, `mail`, `password`, `language`) VALUES
  ('" . $userNameInput ."','" . $userEmailInput ."','" . $userPasswordInput .
   "','" . $userLanguageInput . "')";
  $result = $conn->query($sql);
  if ($result === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . $conn->error;
  }
}
$conn->close();

?>
