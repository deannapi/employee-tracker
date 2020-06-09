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

const view = {
    // When I choose 'View all Employees'
    allEmployees() {
        let query = `SELECT * FROM employee`;
        db.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            // cTable(res);
            app.init();
        });
    },

    // When I choose "View all Roles"
    allRoles() {
        let query = `SELECT * FROM role`;
        db.query(query, (err, res) => {
           if (err) throw err;
           console.table(res);
           app.init();
       });
    },

    // When I choose "View all Departments"
    allDepts() {
        let query = `SELECT * FROM department`;
        db.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            app.init();
        });
    },

    // When I choose to 'view employees by manager'
    empByManager() {
        let query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, employee.manager_id 
                    FROM employee, role, department 
                    WHERE department.id = role.department_id 
                    AND role.id = employee.role_id
                    ORDER BY employee.id ASC`;
        
        db.query(query, (err, res) => {
            if (err) throw err;
            let employeeNamesArr = [];
            res.forEach((employee) => {
                employeeNamesArr.push(`${employee.first_name} ${employee.last_name}`);
            })    ;
        })
        inquirer.prompt([
            {
                type:'list',
                name: 'selManager',
                message: 'Choose a manager to view their employees.',
                choices: employeeNamesArr
            }
        ]).then((answer) => {
            let managerID;
            res.forEach((employee) => {
                if (
                    answer.selManager === `${employee.first_name} ${employee.last_name}`
                ) {
                    managerID = employee.id;
                }
            });

            let query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary
                        FROM employee, role
                        WHERE role.id = employee.role_id
                        AND employee.manager_id = ?`;
            db.query(query, [managerID], (err, res) => {
                if (err) throw err;
                console.log(``);
                console.log(`Manager: ${answer.selManager} `);
                console.table(res);
                app.init();
            });
        });
    },

    // When I choose to 'view employees by department'
    empByDept() {
        let query = `SELECT first_name, last_name department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id)`;
        db.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            app.init();
        });
    },

    // When I choose to 'view total dept budgets'
    budgets() {
        let query = `SELECT * FROM department`;
        db.query(query, (err, res) => {
            if (err) throw err;
            let deptNames = [];
            res.forEach((depts) => {
                deptNames.push(depts.department_name);
            });
        
            inquirer.prompt([
            {
                name: 'deptName',
                type: 'list',
                message: 'Which department budget would you like to view?',
                choices: deptNamesArr
            }
            ]).then((answer) => {
                let deptID;
                res.forEach((dept) => {
                    if (answer.deptName === dept.department_name) {
                        deptID = dept.id;
                    }
                });
                let query = `SELECT employee.id, role.salary FROM employee, role, department
                            WHERE ? = role.department_id AND role.id = employee.role_id
                            GROUP BY employee.id`;

                db.query(query, (err, res) => {
                    if (err) throw err;
                    let yearly = 0;
                    res.forEach((employee) => {
                        yearly += employee.salary;
                    });
                console.table('Annual Budget: ' + yearly.toFixed(2));
                app.init();
                });
            });
        });
    }
};

module.exports = view;