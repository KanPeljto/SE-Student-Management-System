<?php
require 'vendor/autoload.php';
// require_once 'database.php';
// include all dao files;
require 'rest/dao/BaseDao.class.php';
require 'rest/dao/CourseDao.class.php';
require 'rest/dao/EnrollmentDao.class.php';
require 'rest/dao/InstructorDao.class.php';
require 'rest/dao/UserDao.class.php';

// include all services
require 'rest/services/CourseService.class.php';
require 'rest/services/EnrollmentService.class.php';
require 'rest/services/InstructorService.class.php';
require 'rest/services/UserService.class.php';

// instructor routes 

Flight::route('POST /instructor', function() {
    $instructor_service = new InstructorService;
    $body = Flight::request()->getBody();
    $json_decoded = json_decode($body);
    $instructor = $instructor_service->get_instructor_by_id($json_decoded->id);
    echo json_encode($instructor);
});

Flight::route('GET /instructors', function() {
    $instructor_service = new InstructorService;
    echo json_encode($instructor_service->get_all_instructors());
});

Flight::route('GET /test', function(){
    echo "Test";
});



Flight::start();
