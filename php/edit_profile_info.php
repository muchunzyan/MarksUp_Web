<?php

$userEmail = $_POST['userEmail'];
$userNameInput = $_POST['userNameInput'];
$userAgeInput = $_POST['userAgeInput'];
$userCityInput = $_POST['userCityInput'];
$userEducationalInstInput = $_POST['userEducationalInstInput'];
$userAboutMeInput = $_POST['userAboutMeInput'];
$languageSelect = $_POST['languageSelect'];


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

if(!empty($_FILES['userProfilePicInput']['name'])){
    $file_name = $_FILES['userProfilePicInput']['name'];
    $file_tmp = $_FILES['userProfilePicInput']['tmp_name'];

    if (move_uploaded_file($file_tmp, "../uploads/profile_photos/" .
    $file_name)) {
        $pick_path = "https://marks-up.ru/uploads/profile_photos/" . $file_name;
        echo $pick_path . ';';

        $sql = "UPDATE `users` SET `name`='" . $userNameInput ."',
        `profile_pic`='" . $pick_path . "', `age`='" . $userAgeInput . "',
        `city`='" . $userCityInput . "', `educational_inst`='" .
        $userEducationalInstInput . "', `about_me`='" . $userAboutMeInput ."'
         WHERE `mail` = '" . $userEmail . "', `language`='" . $languageSelect
          . "'";
    } else {
        echo "File upload to server failed, please try again.";
    }
} else {
    $sql = "UPDATE `users` SET `name`='" . $userNameInput ."', `age`='" .
    $userAgeInput . "', `city`='" . $userCityInput . "', `educational_inst`='" .
    $userEducationalInstInput . "', `language`='" . $languageSelect . "',
    `about_me`='" . $userAboutMeInput ."'WHERE `mail` = '" . $userEmail . "'";
}

$result = $conn->query($sql);

if($result){
    echo "Your data has been updated!";
} else{
    echo "File upload to database failed, please try again.";
}

$conn->close();

?>
