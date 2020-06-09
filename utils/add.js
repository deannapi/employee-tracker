const inquirer = require('inquirer');
const cTable = require('console.table');
const app = require('../index');
const mysql = require('mysql');

// Connection to server
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MochaBe@r16",
    database: "empTracker"
});

const add = {
    // When I choose to 'add a department'
    async addDept() {
        inquirer.prompt([{
            type: 'input',
            name: 'newDept',
            message: 'What is the name of the new department?'
        }])
        // then add new dept to database
    },

    // When I choose to 'add a role'
    async addRole() {
        const departments = await getDepartments();
        inquirer.prompt([{
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the new role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the yearly salary for the role.'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department will this role belong to?',
            choices: [...departments]
        }
        ])
        // then add new role to database
    },

    // When I choose to 'add an employee'
    async addEmployee() {
        const roles = await getRoles();
        const managers = await getManagers();
        inquirer.prompt([{
            type: 'input',
            name: 'firstName',
            message: 'Enter the employee\'s first name.'
        },
        {
            type: 'input',
            name: 'lastName',
            message: "Enter the employee\'s last name."
        },
        {
            type: 'list',
            name: 'roleName',
            message: 'What is the role of the employee?',
            choices: [
                // get from db
                ...roles
            ]
        },
        {
            type: 'list', 
            name: 'manager',
            message: 'Who is the employee\'s manager?',
            choices: [
                // populate from db
                ...managers
            ]
        }
        ])
    },

    // The function for 'add an employee'
    async addEmployeeDB(empInfo) {
        let roleID = await getRoleID(empInfo.role);
        let managerID = await getEmpID(empInfo.employeeName);

        let query = 'INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
        let args = [empInfo.first_name, empInfo.last_name, roleID, managerID];
        const rows = await db.query(query, args);
        console.log(`${empInfo.first_name} ${empInfo.last_name} has been added.`);
    }
}

module.exports = add;