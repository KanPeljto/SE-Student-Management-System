<?php
require_once __DIR__ . '/../../services/CourseService.class.php';

$course_id = $_REQUEST['id'];
$course_service = new CourseService();
$course = $course_service->get_course_by_id($course_id);

header('Content-Type: application/json');
echo json_encode($course);
?>
