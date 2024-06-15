<?php
require_once __DIR__ . '/../../../vendor/autoload.php';
require_once __DIR__ . '/../../services/UserService.class.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);


// Retrieve the user ID from the request
$token = $_SERVER['HTTP_TOKEN'];
if(!$token || $token === null){
    echo json_encode(['error' => 'Token missing or invalid']);
    http_response_code(401);
    exit;
}
$decoded_token = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
$user_id = $decoded_token->user_id;




// Check if the user ID is provided
if (empty($user_id)) {
    echo json_encode(['error' => 'User ID is missing or empty']);
    exit;
}

// Initialize the UserService
$user_service = new UserService();

try {
    // Fetch the user by ID
    $user = $user_service->get_user_by_id($user_id);

    

    // Check if the user was found
    if ($user === null) {
        echo json_encode(['error' => 'User not found']);
    } else {
        // Send the user data as JSON
        header('Content-Type: application/json');
        echo json_encode($user);
    }
} catch (Exception $e) {
    // Handle any exceptions and send the error message as JSON
    echo json_encode(['error' => $e->getMessage()]);

    
}
?>
