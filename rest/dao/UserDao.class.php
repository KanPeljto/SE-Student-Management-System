<?php

require_once __DIR__ . '/BaseDao.class.php';

class UserDao extends BaseDao {
    public function __construct() {
        parent::__construct('users');
    }

    public function add_user($user) {
        return $this->user_dao->insert('users', $user);
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

    // public function loginUser($email, $password){
    //     $query = "SELECT email, password FROM users WHERE email = :email";
    //     $user = $this->execute($query, ['email' => $email]);
    //     if ($password === $user['password']){
    //         return true;
    //     }
    //     return false;
    // }
}