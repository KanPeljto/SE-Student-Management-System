<?php

require_once __DIR__ . '/../dao/CourseDao.class.php';

class CourseService {
    private $course_dao;

    public function __construct() {
        $this->course_dao = new CourseDao();
    }

    public function add_course($course){
        return $this->course_dao->add_course($course);
    }

    public function delete_course_by_id($course_id) {
        $this->course_dao->delete_course_by_id($course_id);
    }

    public function get_course_by_id($course_id) {
        return $this->course_dao->get_course_by_id($course_id);
    }

    public function edit_course($course) {
        $id = $course['course_id'];
        unset($course['course_id']);
    
        $this->course_dao->edit_course($id, $course);
    }

    public function get_all_courses() {
        return $this->course_dao->get_all_courses();
    }
    public function get_instructor_by_course_id($course_id) {
        return $this->course_dao->get_instructor_by_course_id($course_id);
    }


    public function get_enrolled_users_by_course_id($course_id) {
        return $this->course_dao->get_enrolled_users_by_course_id($course_id);
    }

}
?>
