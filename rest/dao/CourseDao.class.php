<?php

require_once __DIR__ . '/BaseDao.class.php';

class CourseDao extends BaseDao {
    public function __construct() {
        parent::__construct('courses');
    }

    public function add_course($course){
        return $this->insert('courses', $course);
    }

    public function get_all_courses() {
        $query = "SELECT * FROM courses";
        return $this->query($query, []);
    }

    public function get_instructor_courses($user_id){
        $query = 'SELECT * FROM courses WHERE instructor_id = :instructor_id';
        return $this->execute($query, ['instructor_id' => $user_id]);
    }

    public function delete_course_by_id($id) {
        $query = "DELETE FROM courses WHERE course_id = :id";
        $this->execute($query, [
            'id' => $id
        ]);
    }

    public function get_course_by_id($course_id){
        return $this->query_unique(
            "SELECT * FROM courses WHERE course_id = :id",
            [
                'id' => $course_id
            ]
        );
    }

    public function edit_course($id, $course) {
        $query = "UPDATE courses SET 
                  title = :title,
                  description = :description,
                  instructor_id = :instructor_id,
                  enrollment_status = :enrollment_status,
                  category = :category
                  WHERE course_id = :id";
        $this->execute($query, [
            'title' => $course['title'],
            'description' => $course['description'],
            'instructor_id' => $course['instructor_id'],
            'enrollment_status' => $course['enrollment_status'],
            'category' => $course['category'],
            'id' => $id
        ]);
    }
    public function get_instructor_by_course_id($course_id) {
        $query = "SELECT * FROM instructors WHERE instructor_id = (
                    SELECT instructor_id FROM courses WHERE course_id = :course_id
                  )";
        return $this->query_unique($query, ['course_id' => $course_id]);
    }

        public function get_enrolled_users_by_course_id($course_id) {
        $query = "SELECT * FROM users WHERE user_id IN (
                    SELECT user_id FROM enrollments WHERE course_id = :course_id
                  )";
        return $this->query($query, ['course_id' => $course_id]);
    }
}
?>
