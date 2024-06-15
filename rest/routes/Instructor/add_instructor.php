<?php
require_once __DIR__ . '/../../services/InstructorService.class.php';

$instructor_service = new InstructorService();

$instructor_name = $_POST['instructor_name'];
$user_id = $_POST['user_id'];

if (empty($instructor_name) || empty($user_id)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required data']);
    exit;
}

$payload = [
    'instructor_name' => $instructor_name,
    'user_id' => $user_id
];

$instructor = $instructor_service->add_instructor($payload);

echo json_encode(['message' => 'Instructor added successfully', 'data' => $instructor]);
?>
