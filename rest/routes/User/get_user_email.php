<?php
require_once __DIR__ . '/../../services/UserService.class.php';

$email = $_POST['email'];
if ($email === null){
    http_response_code(400);
    die(json_encode(['error' => 'Email field is missing']));
}


$userService = new UserService();
$user = $userService->get_user_email($email);
echo json_encode($user);
