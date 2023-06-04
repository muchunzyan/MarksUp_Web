<?php

$imageName = $_POST['imageName'];

$imagePath = '../uploads/tasks_photos/' . $imageName;

if (unlink($imagePath)) {
    echo 'Image deleted.';
} else {
	echo 'There was a error deleting the image from server.';
}

?>
