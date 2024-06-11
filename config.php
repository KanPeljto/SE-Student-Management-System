<?php

// Set the reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

// Database access credentials
define('DB_NAME', 'sms');
define('DB_PORT', 3306);
define('DB_USER', 'seroot');
define('DB_PASSWORD', 'Root1234');
define('DB_HOST', 'sedb.mysql.database.azure.com'); 