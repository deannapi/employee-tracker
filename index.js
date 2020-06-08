const inquirer = require('inquirer');
let cTable = require("console.table");
let Database = require('./async-db');
const view = require('./utils/view');
const update = require('./utils/update');
const remove = require('./utils/remove');
const add = require('./utils/add');
// const mysql = require('sqlite3');

// Connection to server
const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MochaBe@r16",
    database: "empTracker"
});

// Get table data before calling inquirer prompts
// Get main data from tables
// async function getRoles() {
//     let query = "SELECT title FROM role";
//     const rows = await db.query(query);
//     let roles = [];
//     for (const row of rows) {
//         roles.push(row.title);
//     }
//     return roles;
// };

// async function getManagers() {
//     let query = "SELECT * FROM employee WHERE manager_id IS NULL";
//     const rows = await db.query(query);
//     let managers = [];
//     for (const manager of rows) {
//         managers.push(manager.first_name + " " + manager.last_name);
//     }
//     return managers;
// };

// async function getDepartments() {
//     let query = "SELECT name FROM department";
//     const rows = await db.query(query);
//     let departments = [];
//     for (const department of rows) {
//         departments.push(department.name);
//     }
//     return departments;
// };

// // Get ID's from all tables
// // View All Roles
// async function getRoleID(roleName) {
//     let query = "SELECT * FROM role WHERE role.title=?";
//     let args = [roleName];
//     const rows = await db.query(query, args);
//     return rows[0].id;
// }

// async function getFullName(fullName) {
//     let employee = fullName.split(" ");
//     if (employee.length ==2) {
//         //  for people with 2 first names
//         return employee;
//     }
//     const last_name = employee[employee.length -1];
//     let first_name = " ";
//     for (let i=0; i < employee.length; i++) {
//         first_name = first_name + employee[i] + " ";
//     }
//     return [first_name.trim(), last_name];
// }

// async function getEmpID(fullName) {
//     let employee = getFullName(fullName);
//     let query = "SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?";
//     let args = [employee[0], employee[1]];
//     const rows = await db.query(query, args);
//     return rows[0].id;
// }

// async function getDeptID(deptName) {
//     let query = 'SELECT * FROM department WHERE department.name=?';
//     let args = [deptName];
//     const rows = await db.query(query,args);
//     return rows[0].id;
// }

// Get employee names 
// async function getEmpNames() {
//     let query = 'SELECT * FROM employee';
//     const rows = await db.query(query);
//     let employeeNames = [];
//     for (const employee of rows) {
//         employeeNames.push(employee.first_name + " " + employee.last_name);
//     }
//     return employeeNames;
// }

// ALL INQUIRER PROMPTS
// Main prompt
async function startSel() {
    inquirer.prompt([{
        type: 'list',
        name: 'startSelection',
        message: 'Select an option to begin.',
        choices: [
            'View all departments.', 
            'View all roles.',
            'View all employees.',
            'View all employees by manager',
            'View all employees by departments',
            'View department budgets',
            'Add a department',
            'Add a role.',
            'Add an employee.',
            'Update an employee role.',
            'Update a manager.',
            'Remove an employee',
            'Remove a role',
            'Remove a department',
            'Exit'
        ]
    }])
};


// CASE functions for first inquirer prompt selections
async function main() {
    let exitLoop = false;
    while(!exitLoop) {
        // const prompt = await startSel();
        switch(startSel()) {
            case 'View all departments': 
                await view.allDepts();
                break;

            case 'View all roles': 
                await view.allRoles();
                break;

            case 'View all employees': 
                await view.allEmployees();
                break;

            case 'View all employees by manager':
                await view.
                break;
                
            case 'View all employees by departments':
                await view.
                break;

            case 'Add a department': 
                const newDept = await getDepartments();
                await addDept(newDept);
                break;

            case 'Add a role': 
                const newRole = await getRoles();
                await addRole(newRole);
                break;

            case 'Add an employee': 
                const newEmp = await addEmployee();
                await addEmployeeDB(newEmp);
                break;

            case 'Remove an employee': 
                const employee = await removeEmpInfo();
                await removeEmp(employee);
                break;

            case 'Remove a role': 
                const role = await removeRoleInfo();
                await removeRole(role);
                break;

            case 'Remove a department': 
                const dept = await getDepartments();
                await removeDept(dept);
                break;

            case 'View department budgets': 

                await budgets();
                break;

            case 'Exit': 
                exitLoop = true;
                process.exit(0);
        }
    }
}

// Close db connection when finished 
process.on("exit", async function(code) {
    await db.close();
    return console.log('Exiting with code ${code}.');
});

main();

// CHECK THAT ALL SELECTION OPTIONS HAVE BEEN GIVEN CODE
// View all departments
// View all roles
// View all employees
// Add a department
// Add a role
// Add an employee
// Update an employee role
// Update a manager
// View all employees by manager
// View all employees by departments
// Remove an employee
// Remove a role
// Remove a department
// View department budgets
// Exit