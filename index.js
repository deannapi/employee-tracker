const inquirer = require("inquirer");
let cTable = require("console.table");
const view = require("./utils/view");
const update = require("./utils/update");
const remove = require("./utils/remove");
const add = require("./utils/add");
const db = require("./utils/connection");
const chalk = require("chalk");

db.connect((err) => {
  if (err) throw err;
  console.log(chalk.magenta('Employee Tracker'));
  init();
});

const startMenu = [
  "View all departments",
  "View all roles",
  "View all employees",
  "View employees by manager",
  "View employees by department",
  "View department budgets",
  "Add a department",
  "Add a role",
  "Add an employee",
  "Update an employee role",
  "Update a manager",
  "Remove an employee",
  "Remove a role",
  "Remove a department",
  "Exit",
];

const init = () => {
  console.log(``);
  inquirer
    .prompt([
      {
        type: "list",
        name: "startSelection",
        message: "Select an option to begin.",
        choices: startMenu,
      },
    ])
    .then((answer) => {
      switch (answer.startSelection) {
        case 'View all departments': 
          view.allDepts();
          break;

        case 'View all roles':
          view.allRoles();
          break;

        case 'View all employees':
          view.allEmployees();
          break;

        case 'View employees by manager':
          view.empByManager();
          break;

        case "View employees by department":
          view.empByDept();
          break;

        case "View department budgets":
          view.budgets();
          break;

        case "Add a department":
          add.addDept();
          break;

        case "Add a role":
          add.addRole();
          break;

        case "Add an employee":
          add.addEmployee();
          break;

        case "Update an employee role":
          update.updateRole();
          break;

        case "Update a manager":
          update.updateManager();
          break;

        case "Remove an employee":
          remove.removeEmp();
          break;

        case "Remove a role":
          remove.removeRole();
          break;

        case "Remove a department":
          remove.removeDept();
          break;

        case "Exit":
          db.end();
          break;
      }
    });
};

exports.init = init;

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
