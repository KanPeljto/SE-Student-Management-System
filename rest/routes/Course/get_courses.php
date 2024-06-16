<?php
require_once __DIR__ . '/../../services/CourseService.class.php';

$course_service = new CourseService();
$courses = $course_service->get_all_courses(); 

foreach ($courses as &$course) {
    $instructor = $course_service->get_instructor_by_course_id($course['course_id']);
    // $course['instructor_id'] = 'asd';

    $enrollment_status = $course['enrollment_status'];

    
    $enrolled_users = $course_service->get_enrolled_users_by_course_id($course['course_id']);
    $enrolled_users_emails = array_column($enrolled_users, 'email');
    $course['enrolled_users'] = $enrolled_users_emails;
}

header('Content-Type: application/json');
echo json_encode($courses);
?>
