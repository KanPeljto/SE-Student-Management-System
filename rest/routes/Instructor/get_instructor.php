<?php
require_once __DIR__ . '/../services/InstructorService.class.php';

$instructor_service = new InstructorService();
$instructor_id = $_REQUEST['id'];

$instructor = $instructor_service->get_instructor_by_id($instructor_id);

header('Content-Type: application/json');
echo json_encode($instructor);
?>
