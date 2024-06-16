<?php
require_once __DIR__ . '/../../services/CourseService.class.php';

// $payload = json_decode(file_get_contents('php://input'), true);

$course_title = $_POST['course_title'];
$course_description = $_POST['course_description'];
$enrollment_Options = $_POST['enrollment_Options'];
$category = $_POST['category'];
$course_id = $_POST['course_id'];
$instructor_id = $_POST['instructor_id'];

$payload = [
    'title' => $course_title,
    'description' => $course_description,
    'enrollment_status' => $enrollment_Options,
    'category' => $category,
    'instructor_id' => $instructor_id
];

$course_service = new CourseService();
$course = $course_service->edit_course($course_id, $payload);

echo json_encode($course);
?>
