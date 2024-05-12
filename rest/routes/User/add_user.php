<?php
require_once __DIR__ . '/../../services/UserService.class.php';

$raw_data = file_get_contents("php://input");
$payload = json_decode($raw_data, true);

$user_service = new UserService();

if(empty($payload['name']) || empty($payload['email']) || empty($payload['password']) || empty($payload['role'])) {
    header('HTTP/1.1 400 Bad Request');
    die(json_encode(['error' => "Name, email, password, or role field is missing"]));
}

$user = $user_service->add_user($payload);

echo json_encode(['message' => "You have successfully added the user", 'data' => $user]);
?>
