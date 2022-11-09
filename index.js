const inquirer = require("inquirer");
const mysql = require("mysql2");

require("console.table");
require("dotenv").config();

const connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user:"root",
    password: process.env.password,
    database: "organization_DB"
});

// connection.connect(function)

function viewDatabase() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "response",
                message: "What would you like to do?",
                choices: [
                    "View all Employess",
                    "View all Departments",
                    "View all Roles",
                    "Add Employee",
                    "Add Department",
                    "Add Role",
                    "Quit",
                ],
            },
        ])
        .then(function ({response}) {
            switch (response) {
                case "View all Employees":
                    viewEmployees();
                    break;
                case "View all Departments":
                    viewDepts();
                    break;
                case "View all Roles":
                    viewRoles();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Department":
                    addDepts();
                    break;
                case "Add Role":
                    addRole();
                    break;
            }
        })

};

function viewEmployees() {
    connection.query(
        `SELECT
        employee.id,
        CONCAT (employee.first_name, " ", employee.last_name) 
        AS name, role.title, role.salary,
        CONCAT (manager.first_name, " ", manager.last_name) 
        AS manager, department.name AS department
        FROM employee
        JOIN role on employee.role_id = role.id
        JOIN department on role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id`,
        function (err, result) {
            if (err) {
              console.log(err);  
            }
            console.table(result);
            viewDatabase();
        }
    );
}

function viewDepts() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        
        console.table(res);
        viewDatabase();
    });
}

function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        
        console.table(res);
        viewDatabase();
    });
}
