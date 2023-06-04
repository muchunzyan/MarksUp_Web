<?php

$userEmail = $_POST['userEmail'];
$picName = $_POST['picName'];

$picPath = '../uploads/profile_photos/' . $picName;


if (unlink($picPath)) {
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

    $sql = "UPDATE `users` SET `profile_pic`=NULL WHERE `mail` = '" .
    $userEmail . "'";

    $result = $conn->query($sql);

    if($result){
        echo 'The picture was deleted successfully!';
    } else{
        echo 'There was a error deleting the file from database.';
    }

    $conn->close();

} else {
	echo 'There was a error deleting the file from server.';
}

?>
