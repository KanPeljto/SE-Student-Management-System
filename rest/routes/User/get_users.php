<?php
require_once __DIR__ . '/../../services/UserService.class.php';

$user_service = new UserService();
$user = $user_service->get_all_users();

header('Content-Type: application/json');
echo json_encode($user);