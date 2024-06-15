<?php
require_once __DIR__ . '/../../services/InstructorService.class.php';

$user_id = $_POST['user_id'];

$instructorService = new InstructorService();
$user = $instructorService->get_instructor_by_user_id($user_id);
echo json_encode($user);
