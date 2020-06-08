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

const remove = {
    // When I choose to 'remove a role'
    async removeRoleInfo() {
        const roles = await getRoles();
        return inquirer.prompt([
            {
                type:'list',
                name: 'removeRole',
                message: 'Which role do you want to remove?',
                choices: [...roles]
            }
        ])
    },

    async removeRole(empInfo) {
        const role = getRoles();
    },

    // When I choose to 'remove a department'
    async removeDept() {
        const depts = await getDepartments();
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
    async removeEmpInfo() {
        const employees = await getEmpNames();
        return inquirer.prompt([
            {
                type: 'list',
                name: 'removeName',
                message:'Which employee do you want to remove?',
                choices: [...employees]
            }
        ])
    },

    async removeEmp(empInfo) {
        const employeeName = getEmpNames(empInfo.employeeName);

        let query = "DELETE FROM employee WHERE first_name=? AND last_name=?";
        let args = [employeeName[0], employeeName[1]];
        const rows = await db.query(query, args);
        console.log(`${employeeName[0]} ${employeeName[1]} has been removed.`);
    }
}



module.exports = remove;