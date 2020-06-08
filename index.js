const inquirer = require('inquirer');
let cTable = require("console.table");
let Database = require('./async-db');
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
async function getRoles() {
    let query = "SELECT title FROM role";
    const rows = await db.query(query);
    let roles = [];
    for (const row of rows) {
        roles.push(row.title);
    }
    return roles;
};

async function getManagers() {
    let query = "SELECT * FROM employee WHERE manager_id IS NULL";
    const rows = await db.query(query);
    let managers = [];
    for (const manager of rows) {
        managers.push(manager.first_name + " " + manager.last_name);
    }
    return managers;
};

async function getDepartments() {
    let query = "SELECT name FROM department";
    const rows = await db.query(query);
    let departments = [];
    for (const department of rows) {
        departments.push(department.name);
    }
    return departments;
};

// Get ID's from all tables
// View All Roles
async function getRoleID(roleName) {
    let query = "SELECT * FROM role WHERE role.title=?";
    let args = [roleName];
    const rows = await db.query(query, args);
    return rows[0].id;
}

async function getFullName(fullName) {
    let employee = fullName.split(" ");
    if (employee.length ==2) {
        //  for people with 2 first names
        return employee;
    }
    const last_name = employee[employee.length -1];
    let first_name = " ";
    for (let i=0; i < employee.length; i++) {
        first_name = first_name + employee[i] + " ";
    }
    return [first_name.trim(), last_name];
}

async function getEmpID(fullName) {
    let employee = getFullName(fullName);
    let query = "SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?";
    let args = [employee[0], employee[1]];
    const rows = await db.query(query, args);
    return rows[0].id;
}

// async function getDeptID(deptName) {
//     let query = 'SELECT * FROM department WHERE department.name=?';
//     let args = [deptName];
//     const rows = await db.query(query,args);
//     return rows[0].id;
// }

// Get employee names 
async function getEmpNames() {
    let query = 'SELECT * FROM employee';
    const rows = await db.query(query);
    let employeeNames = [];
    for (const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}

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

// When I choose to 'add a department'
async function addDept() {
    inquirer.prompt([{
        type: 'input',
        name: 'newDept',
        message: 'What is the name of the new department?'
    }])
    // then add new dept to database
};

// When I choose to 'add a role'
async function addRole() {
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
};

// When I choose to 'add an employee'
async function addEmployee() {
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
};

// SQL queries based off inquirer selections
// The function for 'add an employee'
async function addEmployeeDB(empInfo) {
    let roleID = await getRoleID(empInfo.role);
    let managerID = await getEmpID(empInfo.employeeName);

    let query = 'INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
    let args = [empInfo.first_name, empInfo.last_name, roleID, managerID];
    const rows = await db.query(query, args);
    console.log(`${empInfo.first_name} ${empInfo.last_name} has been added.`);
}

// When I choose 'view all departments'
async function allDepts() {
    let query = "SELECT * FROM department";
    const rows = await db.query(query);
    console.table(rows);
};

// When I choose 'view all roles'
async function allRoles() {
    let query = 'SELECT * FROM role';
    const rows = await db.query(query);
    console.table(rows);
};

// When I choose 'view all employees'
async function allEmployees() {
    let query = 'SELECT * FROM employee';
    const rows = await db.query(query);
    console.table(rows);
}

// When I choose to 'update an employee role'
async function getRoleID() {
    let query = "SELECT * FROM role where role.title=?";
    let args = [roleName];
    const rows = await db.query(query, args);
    return rows[0].id;
}

async function updateRole(empInfo) {
    const roleID = await getRoleID(empInfo.role);
    const employee = getFullName(empInfo.employeeName);
    let query = 'UPDATE employee SET role_id=? WHERE employee.first_name=? AND employee.last_name=?';
    let args = [roleID, employee[0], employee[1]];
    const rows = await db.query(query,args);
    console.log(`${employee [0]} ${employee[1]}'s role has been updated to ${empInfo.role}`);
}

// When I choose to 'update a manager'
async function updateManager(empInfo) {
    const manager = await getManagers();
    let query = "UPDATE employee SET "
}


// When I choose to 'view employees by manager'
async function empByManager() {

}

// When I choose to 'view employees by department'
async function empByDept() {
    let query = "SELECT first_name, last_name department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);";
    const rows = await db.query(query);
    console.table(rows);
}

// When I choose to 'view total dept budgets'
async function budgets(){

}

// When I choose to 'remove an employee'
async function removeEmpInfo() {
    const employees = await getEmpNames();
    return inquirer.prompt([
        {
            type: 'list',
            name: 'removeName',
            message:'Which employee do you want to remove?',
            choices: [...employees]
        }
    ])
};

async function removeEmp(empInfo) {
    const employeeName = getEmpNames(empInfo.employeeName);

    let query = "DELETE FROM employee WHERE first_name=? AND last_name=?";
    let args = [employeeName[0], employeeName[1]];
    const rows = await db.query(query, args);
    console.log(`${employeeName[0]} ${employeeName[1]} has been removed.`);
}

// When I choose to 'remove a role'
async function removeRoleInfo() {
    const roles = await getRoles();
    return inquirer.prompt([
        {
            type:'list',
            name: 'removeRole',
            message: 'Which role do you want to remove?',
            choices: [...roles]
        }
    ])
}

async function removeRole(empInfo) {
    const role = getRoles();
}

// When I choose to 'remove a department'
async function removeDept() {
    const depts = await getDepartments();
    return inquirer.prompt([
        {
            type: 'list',
            name: 'removeDept',
            message: 'Which department do you want to remove?',
            choices: [...depts]
        }
    ])
}


// CASE functions for first inquirer prompt selections
async function main() {
    let exitLoop = false;
    while(!exitLoop) {
        // const prompt = await startSel();
        switch(startSel()) {
            case 'View all departments': 
                await allDepts();
                break;

            case 'View all roles': 
                await allRoles();
                break;

            case 'View all employees': 
                await allEmployees();
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