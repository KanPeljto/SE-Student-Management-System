<?php
require_once __DIR__ . '/../../services/EnrollmentService.class.php';

$enrollment_service = new EnrollmentService();
$user_id = $_POST['user_id'];
$course_id = $_POST['course_id'];

$payload = [
    'user_id' => $user_id,
    'course_id' => $course_id
];


$enrollment = $enrollment_service->add_enrollment($payload);

echo json_encode(['message' => 'Enrollment added successfully', 'data' => $enrollment]);
?>
