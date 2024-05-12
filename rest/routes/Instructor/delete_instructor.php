<?php
require_once __DIR__ . '/../services/InstructorService.class.php';

$instructor_service = new InstructorService();
$instructor_id = $_REQUEST['id'];

$instructor_service->delete_instructor_by_id($instructor_id);

echo json_encode(['message' => 'Instructor deleted successfully']);
?>
