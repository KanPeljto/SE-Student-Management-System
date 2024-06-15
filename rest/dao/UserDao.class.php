<?php

require_once __DIR__ . '/BaseDao.class.php';

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

    public function login($email, $password){
        $user = $this->get_user_by_email($email);
        if(!$user){
            die('User not found');
        }

        if(!password_verify($password, $user['password'])){
            echo 'Incorrect password';
            die();
        }

        if(password_verify($password, $user['password'])){
            return true;
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

//$2y$10$WEdEacWHlG/rGtCQJqXO.Oxa70UElirWNyO.tZJXh1VzbkNO5Xoim$2y$10$E11UiFYSCu/nQkyeJzAc3Om75qiSzSgDU9i9EXiA5eGJv7hYbK6Ne 