<?php
require_once __DIR__ . '/../services/CourseService.class.php';

$course_id = $_REQUEST['id'];
if($course_id == NULL || $course_id == '') {
    header('HTTP/1.1 500 Bad Request');
    die(json_encode(['error' => "You have to provide valid course id!"]));
}

$course_service = new CourseService();
$course_service->delete_course_by_id($course_id);
echo json_encode(['message' => 'You have successfully deleted the course!']);
?>
