<?php

require_once __DIR__ . '/../dao/EnrollmentDao.class.php';

class EnrollmentService {
    private $enrollment_dao;

    public function __construct() {
        $this->enrollment_dao = new EnrollmentDao();
    }

    public function add_enrollment($enrollment){
        return $this->enrollment_dao->add_enrollment($enrollment);
    }

    public function delete_enrollment_by_id($enrollment_id) {
        $this->enrollment_dao->delete_enrollment_by_id($enrollment_id);
    }

    public function get_enrollment_by_id($enrollment_id) {
        return $this->enrollment_dao->get_enrollment_by_id($enrollment_id);
    }

    public function edit_enrollment($enrollment) {
        $id = $enrollment['enrollment_id'];
        unset($enrollment['enrollment_id']);
    
        $this->enrollment_dao->edit_enrollment($id, $enrollment);
    }

    public function get_all_enrollments() {
        return $this->enrollment_dao->get_all_enrollments();
    }
}
?>
