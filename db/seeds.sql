USE empTracker;

-- First employee is manager
-- group 1
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("Kaylee", "Smith", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("John", "Weaver", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("Allysia", "Payen", 3, 1);

-- group 2
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("DeAnna", "Martinez", 4, null);
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("Sandy", "York", 5, 2);
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("Ben", "Dockers", 6, 2);
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("Sam", "King", 7, 2);

-- group 3
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("Adam", "Kriss", 8, null);
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("Derek", "Scott", 9, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("Judith", "Pence", 10, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("Mary", "Pointer", 11, 3);

INSERT into department (name) VALUES ("IT");
INSERT into department (name) VALUES ("Marketing");
INSERT into department (name) VALUES ("HR");
INSERT into department (name) VALUES ("Accounting");

INSERT into role (title, salary, department_id) 
VALUES ("Data Scientist", "120000", 1);
INSERT into role (title, salary, department_id) 
VALUES ("Data Analyst", "100000", 1);
INSERT into role (title, salary, department_id) 
VALUES ("Developer", "120000", 1);
INSERT into role (title, salary, department_id) 
VALUES ("Marketing Coordinator", "80000", 2);
INSERT into role (title, salary, department_id) 
VALUES ("Human Resources Director", "100000", 3);
INSERT into role (title, salary, department_id) 
VALUES ("Recruiter", "85000", 3);
INSERT into role (title, salary, department_id) 
VALUES ("Payroll Specialist", "70000", 4);
INSERT into role (title, salary, department_id) 
VALUES ("Accounts Recievable", "60000", 4);