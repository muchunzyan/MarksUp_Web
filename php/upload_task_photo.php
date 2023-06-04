<?php

if(!empty($_FILES['photoInput']['name'])){
    $file_name = $_FILES['photoInput']['name'];
    $file_tmp = $_FILES['photoInput']['tmp_name'];

    if (move_uploaded_file($file_tmp, "../uploads/tasks_photos/" .
    $file_name)) {
        $pick_path = "https://marks-up.ru/uploads/tasks_photos/" . $file_name;
        echo $pick_path;
    } else {
        echo "File upload to server failed, please try again.";
    }
} else {
    echo "No image selected.";
}

?>
