<?php
require_once __DIR__ . '/../../services/InstructorService.class.php';

$instructor_service = new InstructorService();
$instructors = $instructor_service->get_all_instructors();

header('Content-Type: application/json');
echo json_encode($instructors);
?>
