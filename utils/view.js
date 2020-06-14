const inquirer = require("inquirer");
const cTable = require("console.table");
const app = require("../index");
const db = require("./connection");
const chalk = require("chalk");

const view = {
  // When I choose 'View all Employees'
  allEmployees() {
    let query = `SELECT * FROM employee`;
    db.query(query, (err, res) => {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(chalk.blue(table));
      app.init();
    });
  },

  // When I choose "View all Roles"
  allRoles() {
    let query = `SELECT * FROM role`;
    db.query(query, (err, res) => {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(chalk.blue(table));
      app.init();
    });
  },

  // When I choose "View all Departments"
  allDepts() {
    let query = `SELECT * FROM department`;
    db.query(query, (err, res) => {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(chalk.blue(table));
      app.init();
    });
  },

  // When I choose to 'view employees by manager'
  empByManager() {
    let query = `SELECT employee.id, employee.first_name, employee.last_name FROM employee
                WHERE manager_id IS NULL`;

    db.query(query, (err, res) => {
      if (err) throw err;
      let employeeNamesArr = [];
      res.forEach((employee) => {
        employeeNamesArr.push(`${employee.first_name} ${employee.last_name}`);
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "selManager",
            message: "Choose a manager to view their employees.",
            choices: employeeNamesArr,
          },
        ])
        .then((answer) => {
          let managerID;
          res.forEach((employee) => {
            if (
              answer.selManager ===
              `${employee.first_name} ${employee.last_name}`
            ) {
              managerID = employee.id;
            }
          });

          let query = `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id
                        FROM employee 
                        WHERE employee.manager_id = ?`;
          db.query(query, [managerID], (error, response) => {
            if (error) throw error;
            const table = cTable.getTable(response);
            console.log(chalk.magenta(`Manager: ${answer.selManager} `));
            console.log(chalk.blue(table));
          });
          app.init();
        });
    });
  },

  // When I choose to 'view employees by department'
  empByDept() {
    let query = `SELECT employee.first_name, employee.last_name, employee.role_id, department.name FROM 
                ((employee INNER JOIN role ON employee.role_id = role.id) 
                INNER JOIN department ON department.id = role.department_id)`;
    db.query(query, (err, res) => {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(chalk.blue(table));
      app.init();
    });
  },

  // When I choose to 'view total dept budgets'
  budgets() {
    let query = `SELECT role.id, department.name, sum(salary) FROM role INNER JOIN department ON role.department_id = department.id GROUP BY department_id`;
    db.query(query, (err, res) => {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(chalk.blue(table));
      app.init();
    });
  },
};

module.exports = view;
