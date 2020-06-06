const inquirer = require('inquirer');
let Database = require("./async-db")
const cTable = require('console.table');

const db = new Databse({
    host: "localhost",
    port: "3001", 
    user: "root",
    password:"MochaBe@r16",
    database: "empTracker"
})

// Main prompt
async function startSel() {
    inquirer.prompt([{
        type: 'list',
        name: 'startSelection',
        message: 'Select an option to begin.'
        choices: [
            'View all departments.', 
            'View all roles.',
            'View all employees.',
            'Add a department',
            'Add a role.',
            'Add an employee.',
            'Update an employee role.',
            'Exit'
        ]
    }])
};

// When I choose to 'add a department'
async function addDept() {
    inquirer.prompt([{
        type: 'input',
        name: 'newDept';
        message: 'What is the name of the new department?'
    }])
    // then add new dept to database
};

// When I choose to 'add a role'
async function addRole() {
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
        message: 'Which department will this role belong to?'
    }
    ])
    // then add new role to database
};

// When I choose to 'add an employee'
async function addEmployee() {
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
        message: 'Who is the employee\'s manager?",
        choices: [
            // populate from db
            ...managers
        ]
    }
    ])
}