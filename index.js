const inquirer = require("inquirer");
const mysql = require("mysql");

//connecting to employeeDB.sql
const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "employeeDB",
});

//if cant connect then throw error
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  init();
});

function init() {
  inquirer.prompt([
    {
      type: "list",
      message: "what do you like to do?",
      name: "menu",
      choices: [
        "View All Employees?",
        "View All Employee's By Roles?",
        "View all Emplyees By Deparments",
        "Update Employee",
        "Add Employee?",
        "Add Role?",
        "Add Department?",
      ],
    },
  ]).then(function (val) {
    switch (val.menu) {
        case "View All Employees?":
            viewALLEmployees();
        break
        case "View All Employee's By Roles?":
            viewALLRoles();
        break
    }
  });
}

function viewALLEmployees() {
    connection.query("SELECT * FROM employees;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      init()
    })
}

function viewALLRoles() {
    connection.query("SELECT * FROM role;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      init()
    })
}