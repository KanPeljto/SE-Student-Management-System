<?php
require_once __DIR__ . '/../services/EnrollmentService.class.php';

$enrollment_service = new EnrollmentService();
$payload = json_decode(file_get_contents('php://input'), true);

$enrollment_service->edit_enrollment($payload);

echo json_encode($payload);
?>
