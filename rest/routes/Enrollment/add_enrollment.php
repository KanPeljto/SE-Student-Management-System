<?php
require_once __DIR__ . '/../services/EnrollmentService.class.php';

$enrollment_service = new EnrollmentService();
$raw_data = file_get_contents("php://input");
$payload = json_decode($raw_data, true);

$enrollment = $enrollment_service->add_enrollment($payload);

echo json_encode(['message' => 'Enrollment added successfully', 'data' => $enrollment]);
?>
