<?php
require_once __DIR__ . '/../services/CourseService.class.php';

$payload = json_decode(file_get_contents('php://input'), true);

$course_service = new CourseService();
$course = $course_service->edit_course($payload);

echo json_encode($payload);
?>
