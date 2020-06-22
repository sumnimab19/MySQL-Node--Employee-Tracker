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

NSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sam","Smith", 2,2);

NSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Andi","Barton",3,3);