<?php
require_once __DIR__ . '/../../services/InstructorService.class.php';

$instructor_service = new InstructorService();
$raw_data = file_get_contents("php://input");
$payload = json_decode($raw_data, true);

$instructor = $instructor_service->add_instructor($payload);

echo json_encode(['message' => 'Instructor added successfully', 'data' => $instructor]);
?>
