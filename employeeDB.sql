-- createing and droping employeeDB
DROP DATABASE if exists employeeDB;

CREATE DATABASE employeeDB;


-- database
USE employeeDB;

CREATE TABLE department (
    id INT NOT NULL auto_increment PRIMARY KEY,
    name varchar(255)
);

CREATE TABLE role (
    id INT NOT NULL auto_increment PRIMARY KEY,
    title varchar(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employees (
    id INT NOT NULL auto_increment PRIMARY KEY,
    first_name varchar(30) not NULL,
    last_name varchar(30) not NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

-- seeding for department
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");

-- seeding for role
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 190000, 4);

-- seeding for employees
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Jessica", "Haze", null, 1);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Tiffany", "Patric", null, 2);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Mia","Lam",null,3);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Bently", "Lao", 1, 4);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Chris", "Melby", 4, 5);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Jason", "Baker", 1, 6);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Tom", "Nice", 2, 7);

-- sql workbench
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employees;