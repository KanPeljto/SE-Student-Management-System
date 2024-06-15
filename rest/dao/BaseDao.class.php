<?php

require_once __DIR__ . "/../config.php";


class BaseDao{
    protected $connection;
    private $table;

    public function __construct($table){
        $this->table = $table;
        try {
            $this->connection = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";port=" . DB_PORT,
                DB_USER,
                DB_PASSWORD, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                ]
            );
        } catch(PDOException $e) {
            
            echo "Connection failed: " . $e->getMessage();
        }
    } 
        protected function query($query, $params) {
            $statement = $this->connection->prepare($query);
            $statement->execute($params);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }
    
        protected function query_unique($query, $params) {
            $results = $this->query($query, $params);
            return reset($results);
        }
    
        protected function execute($query, $params) {
            $prepared_statement = $this->connection->prepare($query);
            if ($params) {
            foreach ($params as $key => $param) {
                $prepared_statement->bindValue($key, $param);
            }
            }
            error_log("Generated query is : " . $prepared_statement->queryString);
            $prepared_statement->execute();

            if($prepared_statement){
                return $prepared_statement;
            } else {
                return null;
            }
        }
    
        public function insert($table, $entity) {
            $query = "INSERT INTO {$table} (";
            // INSERT INTO patients (
            foreach ($entity as $column => $value) {
            $query .= $column . ", ";
            }
            // INSERT INTO patients (first_name, last_name, 
            $query = substr($query, 0, -2);
            // INSERT INTO patients (first_name, last_name
            $query .= ") VALUES (";
            // INSERT INTO patients (first_name, last_name) VALUES (
            foreach ($entity as $column => $value) {
            $query .= ":" . $column . ", ";
            }
            // INSERT INTO patients (first_name, last_name) VALUES (:first_name, :last_name, 
            $query = substr($query, 0, -2);
            // INSERT INTO patients (first_name, last_name) VALUES (:first_name, :last_name
            $query .= ")";
            // INSERT INTO patients (first_name, last_name) VALUES (:first_name, :last_name)
    
            $statement = $this->connection->prepare($query);
            $statement->execute($entity); 
            $entity['id'] = $this->connection->lastInsertId();
            return $entity;
        }

       
        
    }
