<?php
require_once __DIR__ . '/../services/UserService.class.php';

$raw_data = file_get_contents("php://input");
// $payload = json_decode($raw_data, true);
$user_service = new UserService();
$user = $user_service->loginUser($raw_data['email'], $raw_data['password']);

echo json_encode($user);