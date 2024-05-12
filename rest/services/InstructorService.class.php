<?php

require_once __DIR__ . '/../dao/InstructorDao.class.php';

class InstructorService {
    private $instructor_dao;

    public function __construct() {
        $this->instructor_dao = new InstructorDao();
    }

    public function add_instructor($instructor){
        return $this->instructor_dao->add_instructor($instructor);
    }

    public function delete_instructor_by_id($instructor_id) {
        $this->instructor_dao->delete_instructor_by_id($instructor_id);
    }

    public function get_instructor_by_id($instructor_id) {
        return $this->instructor_dao->get_instructor_by_id($instructor_id);
    }

    public function edit_instructor($instructor) {
        $id = $instructor['instructor_id'];
        unset($instructor['instructor_id']);
    
        $this->instructor_dao->edit_instructor($id, $instructor);
    }

    public function get_all_instructors() {
        return $this->instructor_dao->get_all_instructors();
    }
}
?>
