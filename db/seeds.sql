USE empTracker;

-- First employee is manager
-- group 1
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("Kaylee", "Smith", 1, null), ("John", "Weaver", 2, 1), ("Allysia", "Payen", 3, 1);

-- group 2
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("DeAnna", "Martinez", 5, null),("Sandy", "York", 5, 4), ("Ben", "Dockers", 6, 4), ("Sam", "King", 6, 4);

-- group 3
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("Adam", "Kriss", 7, null), ("Derek", "Scott", 8, 8), ("Judith", "Pence", 8, 8), ("Mary", "Pointer", 8, 8);

-- group 4
INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("Jon", "Barker", 4, null);

INSERT into department (name) VALUES ("IT"), ("Marketing"), ("HR"), ("Accounting");

INSERT into role (title, salary, department_id) 
VALUES ("Data Scientist", "120000", 1), ("Data Analyst", "100000", 1), ("Developer", "120000", 1), 
        ("Marketing Coordinator", "80000", 2), ("Human Resources Director", "100000", 3), ("Recruiter", "85000", 3), 
        ("Payroll Specialist", "70000", 4), ("Accounts Recievable", "60000", 4);