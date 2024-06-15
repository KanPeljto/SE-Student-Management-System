<?php
require_once __DIR__ . '/../../services/CourseService.class.php';

$course_name = $_POST['course_name'];

$courseService = new CourseService();
$course = $courseService->get_course_by_name($course_name);
echo json_encode($course);
