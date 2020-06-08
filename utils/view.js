const inquirer = require('inquirer');
const cTable = require('console.table');
const app = require('../index');
let Database = require('../async-db');

// Connection to server
const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MochaBe@r16",
    database: "empTracker"
});

// When I choose 'view all departments'
// async function allDepts() {
//     let query = "SELECT * FROM department";
//     const rows = await db.query(query);
//     console.table(rows);
// };

const view = {
    // When I choose 'View all Employees'
    async allEmployees() {
        let query = 'SELECT * FROM employee';
        const rows = await db.query(query);
        console.table(rows);
        app.init();
    },

    // When I choose "View all Roles"
    async allRoles() {
        let query = 'SELECT * FROM role';
        const rows = await db.query(query);
        console.table(rows);
        app.init();
    },

    // When I choose "View all Departments"
    async allDepts() {
        let query = "SELECT * FROM department";
        const rows = await db.query(query);
        console.table(rows);
        app.init();
    },

    // When I choose to 'view employees by manager'
    async  empByManager() {
        let query =     `SELECT employee.id, employee.first_name, employee.last_name, role.title, employee.manager_id 
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
            db.query(query, [managerID], (error, response) => {
                if (error) throw error;
                console.log(``);
                console.log(`Manager: ${answer.selManager} `);
                console.table(response);
                app.init();
            });
        });
    },

    // When I choose to 'view employees by department'
    async empByDept() {
        let query = "SELECT first_name, last_name department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);";
        const rows = await db.query(query);
        console.table(rows);
    },

    // When I choose to 'view total dept budgets'
    async budgets(){
        console.log("put budgets here.");
    }
}

module.exports = view;