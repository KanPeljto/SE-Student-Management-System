<?php
require_once __DIR__ . '/../../services/UserService.class.php';

$payload = json_decode(file_get_contents('php://input'), true);

$user_service = new UserService();
$user = $user_service->edit_user($payload);

echo json_encode($payload);
?>
