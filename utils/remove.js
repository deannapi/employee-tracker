const inquirer = require("inquirer");
const cTable = require("console.table");
const app = require("../index");
const db = require("./connection");
const chalk = require("chalk");

const remove = {
  // When I choose to 'remove a role'
  removeRole() {
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
            name: "removeRole",
            message: "Which role do you want to remove?",
            choices: roles,
          },
        ])
        .then((answer) => {
          let roleID;
          res.forEach((role) => {
            if (answer.removeRole === role.title) {
              roleID = role.id;
            }
          });
          let query = `DELETE FROM role WHERE role.id = ?`;
          db.query(query, [roleID], (error, response) => {
            if (error) throw error;
            console.log(chalk.red(`Role has been removed.`));
            app.init();
          });
        });
      });
  },

  // When I choose to 'remove a department'
  removeDept() {
    let query = `SELECT department.id, department.name FROM department`;
    db.query(query, (err, res) => {
      if (err) throw err;
      let depts = [];
      res.forEach((dept) => {
        depts.push(dept.name);
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "removeDept",
            message: "Which department do you want to remove?",
            choices: depts,
          },
        ])
        .then((answer) => {
          let deptID;
          res.forEach((dept) => {
            if (answer.removeDept === dept.name) {
              deptID = dept.id;
            }
          });
          let query = `DELETE FROM department WHERE department.id = ?`;
          db.query(query, [deptID], (err, res) => {
            if (err) throw err;
            console.log(chalk.red(`Department has been removed.`));
            app.init();
          });
        });
    });
  },

  // When I choose to 'remove an employee'
  removeEmp() {
    let query = `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;

    db.query(query, (err, res) => {
      if (err) throw err;
      let empNames = [];
      res.forEach((employee) => {
        empNames.push(`${employee.first_name} ${employee.last_name}`);
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "selEmp",
            message: "Which employee do you want to remove?",
            choices: empNames,
          },
        ])
        .then((answer) => {
          let empID;
          res.forEach((employee) => {
            if (
              answer.selEmp === `${employee.first_name} ${employee.last_name}`
            ) {
              empID = employee.id;
            }
          });
          let query = `DELETE FROM employee WHERE employee.id = ?`;
          db.query(query, [empID], (err, res) => {
            console.log(chalk.red(`Employee has been added.`));
            app.init();
          });
        });
    });
  },
};

module.exports = remove;
