<?php
require_once __DIR__ . '/../services/EnrollmentService.class.php';

$enrollment_service = new EnrollmentService();
$enrollment_id = $_REQUEST['id'];

$enrollment = $enrollment_service->get_enrollment_by_id($enrollment_id);

header('Content-Type: application/json');
echo json_encode($enrollment);
?>
