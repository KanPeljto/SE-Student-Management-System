<?php
require_once __DIR__ . '/../../services/UserService.class.php';

$user_id = $_REQUEST['id'];
if($user_id == NULL || $user_id == '') {
    header('HTTP/1.1 500 Bad Request');
    die(json_encode(['error' => "You have to provide valid user id!"]));
}

$user_service = new UserService();
$user_service->delete_user_by_id($user_id);
echo json_encode(['message' => 'You have successfully deleted the user!']);
?>
