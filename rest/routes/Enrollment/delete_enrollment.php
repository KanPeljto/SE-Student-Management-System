<?php
require_once __DIR__ . '/../services/EnrollmentService.class.php';

$enrollment_service = new EnrollmentService();
$enrollment_id = $_REQUEST['id'];

$enrollment_service->delete_enrollment_by_id($enrollment_id);

echo json_encode(['message' => 'Enrollment deleted successfully']);
?>
