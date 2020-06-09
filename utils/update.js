const inquirer = require('inquirer');
const cTable = require('console.table');
const app = require('../index');
const mysql = require('mysql2');

// Connection to server
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MochaBe@r16",
    database: "empTracker"
});

const update = {
    // When I choose to 'update an employee role'
      getRoleID() {
        let query = "SELECT * FROM role where role.title=?";
        let args = [roleName];
        const rows =  db.query(query, args);
        return rows[0].id;
    },

      updateRole(empInfo) {
        const roleID =  getRoleID(empInfo.role);
        const employee = getFullName(empInfo.employeeName);
        let query = 'UPDATE employee SET role_id=? WHERE employee.first_name=? AND employee.last_name=?';
        let args = [roleID, employee[0], employee[1]];
        const rows =  db.query(query,args);
        console.log(`${employee [0]} ${employee[1]}'s role has been updated to ${empInfo.role}`);
    },

    // When I choose to 'update a manager'
      updateManager(empInfo) {
        const manager =  getManagers();
        let query = "UPDATE employee SET "
    }
}

module.exports = update;