const inquirer = require("inquirer");
const mysql = require("mysql2");

require("console.table");
require("dotenv").config();

const connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: process.env.DB_PASSWORD,
    database: "organization_db"
});

//  "Home" function that is an outlet to view all other sub functions
function viewDatabase() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "response",
                message: "What would you like to do?",
                choices: [
                    "View all Employees",
                    "View all Departments",
                    "View all Roles",
                    "Add Employee",
                    "Add Department",
                    "Add Role",
                    "Update Employee Role",
                    "Quit",
                ],
            },
        ])
        // Switch cases to filter what is being inputed
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
                case "Update Employee Role":
                    updateRole();
                    break;
                case "Quit":
                    connection.end();
                    break;
            };
        });

};

// Sub function that selects specfic attributes to display in a table
function viewEmployees() {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, 
    role.title, role.salary, 
    department.name AS department, 
    CONCAT (manager.first_name, ' ', manager.last_name) 
    AS manager FROM employee LEFT JOIN role on employee.role_id = 
    role.id LEFT JOIN department on role.department_id = 
    department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`, 
    function (err, res) {
        if (err) throw err;  
            console.table(res);
            viewDatabase();
        });
};

function viewDepts() {
    // Data from Dept is displayed on the console
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        
        console.table(res);
        viewDatabase();
    });
};

function viewRoles() {
    // Data from roles is displayed on the console 
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        
        console.table(res);
        viewDatabase();
    });
};

function addEmployee() {
    inquirer
        .prompt([
            {
                type:"input",
                name:"first_name",
                message: "What is the new employee's first name?",
            },
            {
                type:"input",
                name:"last_name",
                message: "What is the new employee's last name?",
            },
            {
                type:"input",
                name:"role",
                message: "What position is this employee being hired for?",
            },
            {
                type:"input",
                name:"manager",
                message: "Who does the new employee report to? List by manager ID",
            },
        ])
        .then(function (data) {
            // After recieving data input, data is then placed into employee table
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
            [data.first_name, data.last_name, data.role, data.manager],
            function (err, result) {
                if (err) throw err;
                console.table(data);
                viewDatabase();
            });
        });   
};

function addDepts() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the new department called?",
            },
        ])
        .then(function (data) {
            // After recieving data input, data is then placed into dept table
            connection.query("INSERT INTO department (name) VALUES (?)",
            [data.name],
            function(err, res) {
                if (err) throw err;
               
            })
            // Updated data is then displayed onto the console log as a table
            connection.query("SELECT * FROM department", function (err, res) {
                if (err) throw err;
                console.table(res);
                viewDatabase();
            });
        });
};

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "What is the name of the new position?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the new position's base salary?"
            },
            {
                type: "input",
                name: "department_id",
                message: "Which department does this position belong to? Please enter Dept. ID"
            },
        ])
        .then(function (data) {
            // After recieving data input, data is then placed into role table
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?);",
            [data.title, data.salary, data.department_id],
            function(err, res) {
                if (err) throw err;
            })
            // Updated data is then displayed onto the console log as a table
            connection.query("SELECT * FROM role", function (err, res) {
                if (err) throw err;
                console.table(res);
                viewDatabase();
            });

        });
};

function updateRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "idEmp",
                message: "Which employee is being updated? Please enter ID."
            },
            {
                type: "input",
                name: "newRole",
                message: "Which position is the employee being updated to? Please enter ID."
            },
        ])
        .then(function (data) {
            connection.query(
                // SQL feature that will change the selected employee and update them with a new role
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [data.newRole, data.idEmp],
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    viewDatabase();
                }
            );
        });
};

viewDatabase();
