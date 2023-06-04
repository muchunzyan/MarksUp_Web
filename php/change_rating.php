<?php

$userId = $_POST['userId'];
$rating = $_POST['rating'];

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

$sql = "SELECT `scores` FROM `users` WHERE `id`='" . $userId . "'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $userScores;
  while($row = $result->fetch_assoc()) {
    $userScoresWithQuotes = str_replace('}', '', explode(':', json_encode($row))[1]);
    $userScores = str_replace('"', '', $userScoresWithQuotes);
  }
  if ($userScores != NULL && $userScores != "null" && $userScores != "") {
    $scores = explode(';', $userScores);
    array_push($scores, $rating);

    $scoresSum = 0;
    for ($i = 0; $i < count($scores); $i++) {
        $scoresSum += $scores[$i];
    }

    $newRating = $scoresSum / count($scores);
    $newScores = implode(';', $scores);
  } else {
    $newRating = $rating;
    $newScores = $rating;
  }

  $sql = "UPDATE `users` SET `rating`='" . $newRating . "',
  `scores`='" . $newScores . "' WHERE `id`='" . $userId . "'";
  $result = $conn->query($sql);
} else {
  echo "0 results";
}
$conn->close();

?>
