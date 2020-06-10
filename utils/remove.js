const inquirer = require('inquirer');
const cTable = require('console.table');
const app = require('../index');
const db = require('./connection');

const remove = {
    // When I choose to 'remove a role'
     removeRoleInfo() {
        const roles =  getRoles();
        return inquirer.prompt([
            {
                type:'list',
                name: 'removeRole',
                message: 'Which role do you want to remove?',
                choices: [...roles]
            }
        ])
    },

     removeRole(empInfo) {
        const role = getRoles();
    },

    // When I choose to 'remove a department'
     removeDept() {
        const depts =  getDepartments();
        return inquirer.prompt([
            {
                type: 'list',
                name: 'removeDept',
                message: 'Which department do you want to remove?',
                choices: [...depts]
            }
        ])
    },

    // When I choose to 'remove an employee'
     removeEmp(empInfo) {
        let query = `SELECT employee.id, employee.first_name, employee.last_name, FROM employee`;

        db.query(query, (err, res) => {
            let empNames = [];
            res.forEach((employee) => {
                empNames.push(`${employee.first_name} ${employee.last_name}`);
            });
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'selEmp',
                    message:'Which employee do you want to remove?',
                    choices: empNames
                }
            ]).then((answer) => {
                let empID;
                res.forEach((employee) => {
                    if (answer.selEmp === `${employee.first_name} ${employee.last_name}`) {
                        empID = employee.id;
                    }
                });
                let query = `DELETE FROM employee WHERE employee.id = ?`;
                db.query(query, [empID], (err, res) => {
                    console.log(`Employee has been added.`);
                    app.init();
                });
            });
        });
    }
}

module.exports = remove;