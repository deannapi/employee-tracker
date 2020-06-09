USE empTracker;

-- First employee is manager
-- group 1
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("Kaylee", "Smith", 1, null), ("John", "Weaver", 2, 1), ("Allysia", "Payen", 3, 1);

-- group 2
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("DeAnna", "Martinez", 4, null),("Sandy", "York", 5, 2), ("Ben", "Dockers", 6, 2), ("Sam", "King", 7, 2);

-- group 3
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("Adam", "Kriss", 8, null), ("Derek", "Scott", 9, 3), ("Judith", "Pence", 10, 3), ("Mary", "Pointer", 11, 3);

INSERT into department (name) VALUES ("IT"), ("Marketing"), ("HR"), ("Accounting");

INSERT into role (title, salary, department_id) 
VALUES ("Data Scientist", "120000", 1), ("Data Analyst", "100000", 1), ("Developer", "120000", 1), ("Marketing Coordinator", "80000", 2), ("Human Resources Director", "100000", 3), ("Recruiter", "85000", 3), ("Payroll Specialist", "70000", 4), ("Accounts Recievable", "60000", 4);