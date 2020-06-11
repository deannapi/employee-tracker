![GitHub repo size](https://img.shields.io/github/repo-size/deannapi/employee-tracker)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/deannapi/employee-tracker)
![GitHub last commit](https://img.shields.io/github/last-commit/deannapi/employee-tracker)


# Employee Tracker
A CMS interface that uses Node.js, Inquirer and MySQL to build a command-line application to manage a company's employee database.

## :hammer: Tools
* [Express.js](https://expressjs.com/)
* [Node.js](https://nodejs.org/en/)
* [MySQL2](https://www.npmjs.com/package/mysql2)
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [Insomnia](https://insomnia.rest/)
* [Console.table](https://www.npmjs.com/package/console.table)
* [Chalk](https://www.npmjs.com/package/chalk-table)


## :bulb: Description
        AS A business owner
        I WANT to be able to view and manage the departments, roles, and employees in my company
        SO THAT I can organize and plan my business

        GIVEN a command-line application that accepts user input
        WHEN I start the application
        THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
        WHEN I choose to view all departments
        THEN I am presented with a formatted table showing department names and department ids
        WHEN I choose to view all roles
        THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
        WHEN I choose to view all employees
        THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        WHEN I choose to add a department
        THEN I am prompted to enter the name of the department and that department is added to the database
        WHEN I choose to add a role
        THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
        WHEN I choose to add an employee
        THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
        WHEN I choose to update an employee role
        THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

  Extra App Capabilities:
  
        UPDATE employee managers.
        VIEW employees by manager.
        VIEW employees by department.
        DELETE employees, roles, and departments. 
        VIEW the total utilized budget of a departments - i.e., the combined salaries of all employees in that department. 

## :movie_camera: Demo


## :memo: Instructions
`npm init`

`npm install inquirer`

`npm install mysql2`

`npm install console-table`

`npm install chalk`

To run the application, use the following command:

`node index.js`