<?php

if(!empty($_FILES['file']['name'])){
    $file_name = $_FILES['file']['name'];
    $file_tmp = $_FILES['file']['tmp_name'];

    if (move_uploaded_file($file_tmp, "../uploads/files/" .
    $file_name)) {
        $pick_path = "https://marks-up.ru/uploads/files/" . $file_name;
        echo $pick_path;
    } else {
        echo "File upload to server failed, please try again.";
    }
} else {
    echo "No file selected.";
}

?>
