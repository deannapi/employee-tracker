const inquirer = require("inquirer");
const cTable = require("console.table");
const app = require("../index");
const db = require("./connection");
const chalk = require("chalk");

const update = {
  // When I choose to 'update an employee role'
  updateRole() {
    let query = `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
    FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;

    db.query(query, (err, res) => {
      if (err) throw err;
      let empNames = [];
      res.forEach((employee) => {
        empNames.push(`${employee.first_name} ${employee.last_name}`);
      });
      let query = `SELECT role.id, role.title FROM role`;
      db.query(query, (err, res) => {
        if (err) throw err;
        let roles = [];
        res.forEach((role) => {
          roles.push(role.title);
        });
        inquirer
          .prompt([
            {
              type: "list",
              name: "selEmp",
              message: "Select an employee to update their role.",
              choices: empNames,
            },
            {
              type: "list",
              name: "selRole",
              message: "Select the new role.",
              choices: roles,
            },
          ])
          .then((answer) => {
            let newtitleID, employeeID;
            res.forEach((role) => {
              if (answer.selRole === role.title) {
                newtitleID = role.id;
              }
            });
            res.forEach((employee) => {
              if (
                answer.selEmp === `${employee.first_name} ${employee.last_name}`
              ) {
                employeeID = employee.id;
              }
            });
            let query = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
            db.query(query, [newtitleID, employeeID], (err, res) => {
              console.log(chalk.blue(`Role has been updated.`));
              app.init();
            });
          });
      });
    });
  },

  // When I choose to 'update a manager'
  updateManager() {
    let query = `SELECT employee.id, employee.first_name, employee.last_name FROM employee
                WHERE manager_id IS NULL`;

    db.query(query, (err, res) => {
      if (err) throw err;
      let managers = [];
      res.forEach((employee) => {
        managers.push(`${employee.first_name} ${employee.last_name}`);
      });
      // const table = cTable.getTable(managers);
      // console.log(chalk.redBright(table));
      inquirer
        .prompt([
          {
            type: "list",
            name: "selName",
            message: "Which employee needs a manager update?",
            choices: managers,
          },
          //  need to put a console.log here to show manager selection
          {
            type: "list",
            name: "newManager",
            message: "Select the new manager",
            choices: managers,
          },
        ])
        .then((answer) => {
          let managerID, employeeID;
          res.forEach((employee) => {
            if (
              answer.selName === `${employee.first_name} ${employee.last_name}`
            ) {
              employeeID = employee.id;
            }
            if (
              answer.newManager ===
              `${employee.first_name} ${employee.last_name}`
            ) {
              managerID = employee.id;
            }
            let query = `UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?`;
            db.query(query, [managerID, employeeID], (err, res) => {
              if (err) throw err;
              console.log(chalk.blue(`Manager has been updated.`));
              app.init();
            });
          });
        });
    });
  },
};

module.exports = update;
