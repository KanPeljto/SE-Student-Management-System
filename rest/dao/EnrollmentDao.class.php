<?php

require_once __DIR__ . '/BaseDao.class.php';

class EnrollmentDao extends BaseDao {
    public function __construct() {
        parent::__construct('enrollments');
    }

    public function add_enrollment($enrollment){
        return $this->insert('enrollments', $enrollment);
    }

    public function get_all_enrollments() {
        $query = "SELECT * FROM enrollments";
        return $this->query($query, []);
    }

    public function delete_enrollment_by_id($id) {
        $query = "DELETE FROM enrollments WHERE enrollment_id = :id";
        $this->execute($query, [
            'id' => $id
        ]);
    }

    public function get_enrollment_by_id($enrollment_id){
        return $this->query_unique(
            "SELECT * FROM enrollments WHERE enrollment_id = :id",
            [
                'id' => $enrollment_id
            ]
        );
    }

    public function edit_enrollment($id, $enrollment) {
        $query = "UPDATE enrollments SET 
                  user_id = :user_id,
                  course_id = :course_id
                  WHERE enrollment_id = :id";
        $this->execute($query, [
            'user_id' => $enrollment['user_id'],
            'course_id' => $enrollment['course_id'],
            'id' => $id
        ]);
    }
}
?>
