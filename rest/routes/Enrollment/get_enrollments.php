<?php
require_once __DIR__ . '/../services/EnrollmentService.class.php';

$enrollment_service = new EnrollmentService();
$enrollments = $enrollment_service->get_all_enrollments();

header('Content-Type: application/json');
echo json_encode($enrollments);
?>
