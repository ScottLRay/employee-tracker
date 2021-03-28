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
  inquirer
    .prompt([
      {
        type: "list",
        message: "what do you like to do?",
        name: "menu",
        choices: [
          "View All Employees?",
          "View All Employee's By Roles?",
          "View all Emplyees By Departments",
          "Update Employee",
          "Add Employee?",
          "Add Role?",
          "Add Department?",
        ],
      },
    ])
    .then(function (val) {
      switch (val.menu) {
        case "View All Employees?":
          viewALLEmployees();
        break;
        case "View All Employee's By Roles?":
          viewALLRoles();
        break;
        case "View all Emplyees By Departments":
          viewALLDepartment();
        break
        case "Add Employee?":
            addEmployee();
        break
      }
    });
}

function viewALLEmployees() {
  connection.query("SELECT * FROM employees;", function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function viewALLRoles() {
  connection.query("SELECT * FROM role;", function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function viewALLDepartment() {
  connection.query("SELECT * FROM department;", function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

let roles = []
function selectRole(){
    connection.query("SELECT * FROM role", function (err, res){
        if (err) throw err
        for (var i = 0; i < res.length; i++){
            roles.push(res[i].title)
        }
    })
    return roles
}

let manager = []
function selectManager(){
    connection.query("SELECT first_name, last_name FROM employees WHERE manager_id IS NULL", function(err, res){
        if (err) throw err
        for (let i = 0; i < res.length; i++){
            manager.push(res[i].first_name)
        }
    })
    return manager
}

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            message: "what is the employee first name?",
            name: "firstName",
        },
        {
            type: "input",
            message: "what is the employee last name?",
            name: "lastName",
        },
        {
            type: "list",
            message: "what is the role?",
            name: "role",
            choices: selectRole()

        },
        {
            type: "rawlist",
            message: "who is the manager of this employee?",
            name: "manager",
            choices: selectManager()
        },
    ]).then(function(val){
        let roleId = selectRole().indexOf(val.role) + 1
        let managerId = selectManager().indexOf(val.manager) + 1
        connection.query("INSERT INTO employees set ?",
        {
            first_name: val.firstName,
            last_name: val.lastName,
            manager_id: managerId,
            role_id: roleId
        },function(err){
            if (err) throw(err)
            console.table(val)
            init()
        }
        )
    })
}