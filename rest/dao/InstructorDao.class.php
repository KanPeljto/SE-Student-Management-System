<?php

require_once __DIR__ . '/BaseDao.class.php';

class InstructorDao extends BaseDao {
    public function __construct() {
        parent::__construct('instructors');
    }

    public function add_instructor($instructor){
        return $this->insert('instructors', $instructor);
    }


    public function get_all_instructors() {
        $query = "SELECT * FROM instructors";
        return $this->query($query, []);
    }

    public function delete_instructor_by_id($id) {
        $query = "DELETE FROM instructors WHERE instructor_id = :id";
        $this->execute($query, [
            'id' => $id
        ]);
    }

    public function get_instructor_by_id($instructor_id){
        return $this->query_unique(
            "SELECT * FROM instructors WHERE instructor_id = :id",
            [
                'id' => $instructor_id
            ]
        );
    }

    public function get_instructor_by_user_id($user_id){
        $query = 'SELECT instructor_id FROM instructors WHERE user_id = :user_id';
        return $this->query($query, ['user_id' => $user_id]);
    }

    public function edit_instructor($id, $instructor) {
        $query = "UPDATE instructors SET 
                  instructor_name = :instructor_name,
                  user_id = :user_id
                  WHERE instructor_id = :id";
        $this->execute($query, [
            'instructor_name' => $instructor['instructor_name'],
            'user_id' => $instructor['user_id'],
            'id' => $id
        ]);
    }
}
?>
