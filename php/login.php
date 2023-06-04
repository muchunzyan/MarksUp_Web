<?php

$userEmailInput = $_POST['userEmailInput'];

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

$sql = "SELECT `id`, `password`, `profile_pic`, `language` FROM `users` WHERE
`mail` = '" . $userEmailInput . "'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo $row['password'] . ";" . $row['id'] . ";" . $row['profile_pic'] . ";"
    . $row['language'];
  }
} else {
  echo "0 results";
}
$conn->close();

?>
