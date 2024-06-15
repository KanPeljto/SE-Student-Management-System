<?php
require_once __DIR__ . '/../../services/UserService.class.php';

$email = $_POST['email'];
$password = $_POST['password'];
// $payload = json_decode($raw_data, true);
$user_service = new UserService();
$user = $user_service->loginUser($email, $password);

echo json_encode(['loggedIn' => $user]);