DROP DATABASE IF EXISTS empTracker;

CREATE DATABASE empTracker;

USE empTracker;

CREATE TABLE department (
    id INTEGER PRIMARY KEY NOT NULL auto_increment,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INTEGER PRIMARY KEY NOT NULL auto_increment,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INTEGER,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INTEGER NOT NULL auto_increment,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY(id)
);