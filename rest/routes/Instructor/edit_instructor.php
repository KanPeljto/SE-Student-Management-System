<?php
require_once __DIR__ . '/../services/InstructorService.class.php';

$instructor_service = new InstructorService();
$payload = json_decode(file_get_contents('php://input'), true);

$instructor_service->edit_instructor($payload);

echo json_encode($payload);
?>
