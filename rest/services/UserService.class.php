<?php

require_once __DIR__ . '/../dao/UserDao.class.php';

class UserService {
    private $user_dao;

    public function __construct() {
        $this->user_dao = new UserDao();
    }

    public function add_user($user){
        return $this->user_dao->add_user($user);
    }

    public function delete_user_by_id($id) {
        $this->user_dao->delete_user_by_id($id);
    }

    public function get_user_by_id($id) {
        return $this->user_dao->get_user_by_id($id);
    }

    public function edit_user($user) {
        $id = $user['user_id'];
        unset($user['user_id']);

        $user_data = [
            'name' => $user['name'],
            'email' => $user['email'],
            'password' => $user['password'],
            'role' => $user['role']
        ];

        $this->user_dao->edit_user($id, $user_data);
    }

    public function get_all_users() {
        return $this->user_dao->get_all_users();
    }

    public function loginUser($email, $password){
        return $this->user_dao->login($email, $password);
    }

    public function verifyToken($token){
        return $this->user_dao->verifyToken($token);
    }

    public function get_user_email($email){
        return $this->user_dao->get_user_email($email);
    }

    public function checkJWT($token){
        return $this->user_dao->verifyToken($token);
    }
}
?>
