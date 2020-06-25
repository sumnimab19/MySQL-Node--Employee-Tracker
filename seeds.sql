/* Seeds for SQL table. */
USE employee_DB;

/* Insert 3 Rows into your new table */
INSERT INTO department (dept_name)
VALUES ("IT");

INSERT INTO department (dept_name)
VALUES ("Finance");

INSERT INTO department (dept_name)
VALUES ("Networking");



INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 70000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales", 80000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer", 90000, 3);


/* OR */
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Daton","Noah", 1,1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sam","Smith", 2,2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Andi","Barton",3,3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Max","Deeter", 4,4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Nick","Tan", 5,5);

INSERT INTO manager (manager)
VALUES ("Ryan Skill");
INSERT INTO manager (manager)
VALUES ("Hou Smith");
INSERT INTO manager (manager)
VALUES ("");

