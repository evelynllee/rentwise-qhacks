<?php
set_time_limit(0);

// Check if the uploads directory exists, create it if not
if (!is_dir("uploads")) {
    mkdir("uploads");
}

// Define allowed file extensions and maximum file size
$allowedExts = array("pdf", "docx", "doc");
$maxFileSize = 200000000000000; // Adjust as needed

// Get the file extension of the uploaded file
$extension = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);

// Check if the uploaded file meets the requirements
if (
    in_array($extension, $allowedExts)
    && $_FILES["file"]["size"] < $maxFileSize
) {
    if ($_FILES["file"]["error"] > 0) {
        echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
    } else {
        echo "Upload: " . $_FILES["file"]["name"] . "<br />";
        echo "Type: " . $_FILES["file"]["type"] . "<br />";
        echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
        echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";

        // Move the uploaded file to the uploads directory
        move_uploaded_file(
            $_FILES["file"]["tmp_name"],
            "uploads/" . $_FILES["file"]["name"]
        );
        echo "Stored in: " . "uploads/" . $_FILES["file"]["name"];
    }
} else {
    echo "Invalid file";
}
?>