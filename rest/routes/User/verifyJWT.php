<?php

require_once __DIR__ .'/../../services/UserService.class.php';


$userService = new UserService();

$token = $_SERVER['HTTP_TOKEN'];
if($userService->checkJWT($token) === false){
    die('Invalid token');
}