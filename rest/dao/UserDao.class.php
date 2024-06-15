<?php

require_once __DIR__ . '/BaseDao.class.php';
require_once __DIR__ . '/../../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class UserDao extends BaseDao {
    public function __construct() {
        parent::__construct('users');
    }

    public function add_user($user) {
        return $this->insert('users', $user);
    }

    public function count_users_paginated($search) {
        $query = "SELECT COUNT(*) AS count
                  FROM users
                  WHERE LOWER(username) LIKE CONCAT('%', :search, '%');";
        return $this->query_unique($query, [
            'search' => $search
        ]);
    }

    public function get_users_paginated($offset, $limit, $search, $order_column, $order_direction) {
        $query = "SELECT *
                  FROM users
                  WHERE LOWER(username) LIKE CONCAT('%', :search, '%')
                  ORDER BY {$order_column} {$order_direction}
                  LIMIT {$offset}, {$limit}";
        return $this->query($query, [
            'search' => $search
        ]);
    }

    public function get_user_email($email){
        $query = 'SELECT * FROM users WHERE email = :email';
        return $user = $this->query($query, ['email' => $email]);
    }

    public function delete_user_by_id($id) {
        $query = "DELETE FROM users WHERE id = :id";
        $this->execute($query, [
            'id' => $id
        ]);
    }

    public function get_user_by_id($user_id) {
        return $this->query_unique('SELECT * FROM users WHERE user_id = :user_id', ['user_id' => $user_id]);
    }

    public function get_user_by_email($email) {
        return $this->query_unique('SELECT * FROM users WHERE email = :email', ['email' => $email]);
    }

    public function get_all_users(){
        $query = "SELECT * FROM users";
        return $this->query($query, []);
    }
   
    public function edit_user($id, $user) {
        $query = "UPDATE users SET 
                  username = :username,
                  password = :password,
                  role = :role
                  WHERE id = :id";
        $this->execute($query, [
            'username' => $user['username'],
            'password' => $user['password'],
            'role' => $user['role'],
            'id' => $id
        ]);
    }

    public function add_jwt_to_db($user_id, $jwt){
        $query = 'UPDATE users SET jwt_token = :jwt_token WHERE user_id = :user_id';
        $this->execute($query, ['jwt_token' => $jwt, 'user_id' => $user_id]);
    }

    public function login($email, $password){
        $user = $this->get_user_by_email($email);
        if(!$user){
            die('User not found');
        }

        if(!password_verify($password, $user['password'])){
            http_response_code(400);
            return 'Incorrect password';
        }

        if(password_verify($password, $user['password'])){
            $jwt = JWT::encode(['user_id' => $user['user_id'], 'role' => $user['role']], JWT_SECRET, 'HS256');
            $this->add_jwt_to_db($user['user_id'], $jwt);
            return $jwt;
        }
    }

    public function verifyToken($token){
        try {
            $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
        $user_id = $decoded->user_id;
        $query = 'SELECT jwt_token FROM users WHERE user_id = :user_id';
        $response = $this->execute($query, ['user_id' => $user_id]);
        if ($response != $token){
            return false;
        }
    
        } catch (\Exception $e){
            die('Invalid token');
        }
    }

    // public function loginUser($email, $password){
    //     $query = "SELECT email, password FROM users WHERE email = :email";
    //     $user = $this->execute($query, ['email' => $email]);
    //     if ($password === $user['password']){
    //         return true;
    //     }
    //     return false;
    // }
}

