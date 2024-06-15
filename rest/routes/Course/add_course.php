<?php
require_once __DIR__ . '/../../services/CourseService.class.php';

// $raw_data = file_get_contents("php://input");
// $payload = json_decode($raw_data, true);

$course_title = $_POST['course_title'];
$course_description = $_POST['course_description'];
$course_material = $_POST['course_material'];
$category = $_POST['category'];
$enrollment_options = $_POST['enrollment_options'];
$instructor_id = $_POST['instructor_id'];


$payload = [
    'title' => $course_title,
    'description'=>$course_description,
    'enrollment_status'=>$enrollment_options,
    'category' => $category,
    'instructor_id' => $instructor_id
];

$course_service = new CourseService();

if(empty($payload['title'])) {
    header('HTTP/1.1 400 Bad Request');
    die(json_encode(['error' => "Title field is missing"]));
}

$course = $course_service->add_course($payload);

echo json_encode(['message' => "You have successfully added the course", 'data' => $course]);
?>
