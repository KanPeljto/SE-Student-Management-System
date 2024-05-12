<?php
require_once __DIR__ . '/../services/CourseService.class.php';

$raw_data = file_get_contents("php://input");
$payload = json_decode($raw_data, true);

$course_service = new CourseService();

if(empty($payload['title'])) {
    header('HTTP/1.1 400 Bad Request');
    die(json_encode(['error' => "Title field is missing"]));
}

$course = $course_service->add_course($payload);

echo json_encode(['message' => "You have successfully added the course", 'data' => $course]);
?>
