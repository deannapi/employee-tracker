DROP TABLE IF EXISTS empTracker;

CREATE database empTracker;

USE empTracker;

CREATE TABLE employee (
    id INTEGER PRIMARY KEY NOT NULL auto_increment,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES role(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE department (
    id INTEGER PRIMARY KEY auto_increment NOT NULL,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INTEGER PRIMARY KEY NOT NULL auto_increment,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES department(id)
);