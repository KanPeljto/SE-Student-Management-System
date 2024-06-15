<?php
require_once __DIR__ . '/../../services/UserService.class.php';

$token = $_SERVER['HTTP_TOKEN'];
$user_service = new UserService();

if(!$user_service->verifyToken($token)){
    die('Invalid token');
}

$payload = json_decode(file_get_contents('php://input'), true);

$user = $user_service->edit_user($payload);

echo json_encode($payload);
?>
