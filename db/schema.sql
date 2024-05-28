DROP DATABASE IF EXISTS work_db;
CREATE DATABASE work_db;

USE work_db;

CREATE TABLE department 
(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
names VARCHAR(30) NOT NULL,
constraint names check (names not like '%[^a-z]%')
);

CREATE TABLE roles
(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
departmentId INT,
FOREIGN KEY (departmentId) 
REFERENCES department(id)
);

CREATE TABLE employee
(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
roleId INT,
managerId INT,
FOREIGN KEY (roleId) 
REFERENCES roles(id),
FOREIGN KEY (managerId)
REFERENCES employee(id)
ON DELETE SET NULL
);
