<?php

$userId = $_POST['userId'];
$edInst = $_POST['edInst'];
$taskType = $_POST['taskType'];
$deadlineFrom = $_POST['deadlineFrom'];
$deadlineTo = $_POST['deadlineTo'];
$priceFrom = $_POST['priceFrom'];
$priceTo = $_POST['priceTo'];


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

$sql = "SELECT * FROM `tasks` WHERE `user_id`<>'" . $userId . "'";

if ($edInst != NULL && $edInst != "") {
    $sql .= " AND `educational_inst`='" . $edInst . "'";
}
if ($taskType != NULL && $taskType != "") {
    $sql .= " AND `task_type`='" . $taskType . "'";
}
if ($deadlineFrom != NULL && $deadlineFrom != "" &&
    $deadlineTo != NULL && $deadlineTo != "") {
    $sql .= " AND (`deadline` BETWEEN '" . $deadlineFrom . "' AND '" .
    $deadlineTo . "')";
} else if ($deadlineFrom != NULL && $deadlineFrom != "") {
    $sql .= " AND `deadline` >= '" . $deadlineFrom . "'";
} else if ($deadlineTo != NULL && $deadlineTo != "") {
    $sql .= " AND `deadline` <= '" . $deadlineTo . "'";
}
if ($priceFrom != NULL && $priceFrom != "" &&
    $priceTo != NULL && $priceTo != "") {
    $sql .= " AND (`price` BETWEEN '" . $priceFrom . "' AND '" . $priceTo .
    "')";
} else if ($priceFrom != NULL && $priceFrom != "") {
    $sql .= " AND `price` >= '" . $priceFrom . "'";
} else if ($priceTo != NULL && $priceTo != "") {
    $sql .= " AND `price` <= '" . $priceTo . "'";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo json_encode($row);
  }
} else {
  echo "0 results";
}
$conn->close();

?>
