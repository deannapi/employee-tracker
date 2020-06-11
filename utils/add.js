const inquirer = require('inquirer');
const cTable = require('console.table');
const app = require('../index');
const db = require('./connection');
const chalk = require('chalk');

const add = {
    // When I choose to 'add a department'
    addDept() {
        inquirer.prompt([{
            type: 'input',
            name: 'newDept',
            message: 'What is the name of the new department?',
            validate: validation.validateString
        }])
        // then add new dept to database
        .then((answer) => {
            let query = `INSERT INTO department (department_name) VALUES (?)`;
            db.query(query, (err, res) => {
                if (err) throw err;
                console.log(chalk.blueBright('${department.department_name} has been added a new department.'));
            })
        })
    },

    // When I choose to 'add a role'
    addRole() {
        // get the current list of departments
        db.query('SELECT * FROM department', (err, res) => {
            if (err) throw err;
            let deptNames = [];
            res.forEach((dept) => {
                deptNames.push(dept.department_name);
            });
            deptNames.push('Add a Department');

            inquirer.prompt([
                {
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
                    choices: [...deptNames]
                }
            ]).then((answer) => {
                let addedRole = answer.roleName;
                let deptID;
                res.forEach((dept) => {
                    if (deptData.deptName === dept.department_name) {
                      deptID = dept.id;
                    }
                  });

                let params = [addedRole, answer.salary, deptID];
                db.query('INSERT INTO role (title, salary, department_id) VALUE (?,?,?)', params, (err, res) => {
                    if (err) throw err;
                    console.log(chalk.blueBright('New role has been added.'));
                    app.init();
                }
                )
            })
        })
    },

    // When I choose to 'add an employee'
    addEmployee() {
        // Get the roles to display for selection
        db.query('SELECT role.id, role.title FROM role', (err, res) => {
            let roles = [];
            res.forEach((role) => {
                roles.push(role.title);
            });
        });
        // Get managers to display for selection
        db.query('SELECT * FROM employee WHERE manager_id IS NULL', (err, res) => {
            let managers = [];
            res.forEach((manager) => {
                managers.push(managers.first_name + " " + managers.last_name);
            });
        });
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
                choices: roles
            },
            {
                type: 'list', 
                name: 'manager',
                message: 'Who is the employee\'s manager?',
                choices: managers
            }
            // the add to DB
        ]).then((answer) => {
            let roleID, managerID;
            res.forEach((role) => {
                if (answer.employeeRole === role.title) {
                  roleID = role.id;
                }
              });
  
            res.forEach((employee) => {
                if (
                  answer.managerName ===
                  `${employee.first_name} ${employee.last_name}`
                ) {
                  managerID = employee.id;
                }
              });
            let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            let params = [answer.firstName, answer.lastName, roleID, managerID];
            db.query(query, params, (err, res) => {
                if (err) throw err;
                console.log('Employee has been added.');
                app.init();
            });
        });
    },
}

module.exports = add;