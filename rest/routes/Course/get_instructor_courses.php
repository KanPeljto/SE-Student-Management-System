<?php
require_once __DIR__ . '/../../services/CourseService.class.php';
require_once __DIR__ . '/../../../vendor/autoload.php';
require_once __DIR__ . '/../../services/InstructorService.class.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$token = $_SERVER['HTTP_TOKEN'];
$decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
$user_id = $decoded->user_id;

if($decoded->role !== 'instructor'){
    http_response_code(401);
    echo 'User not instructor';
    exit;
}

$course_service = new CourseService();
$instructorService = new InstructorService();

$instructor = $instructorService->get_instructor_by_user_id($user_id);
$instructor_id = $instructor[0]['instructor_id'];

$courses = $course_service->get_instructor_courses($instructor_id);

header('Content-Type: application/json');
echo json_encode($courses);
?>
