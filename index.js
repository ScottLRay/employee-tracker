const inquirer = require('inquirer')



function init(){
    prompt([
        {
            type: 'list',
            message: 'what do you like to do?',
            name: 'menu',
            choices: [
                "View All Employees?", 
                "View All Employee's By Roles?",
                "View all Emplyees By Deparments", 
                "Update Employee",
                "Add Employee?",
                "Add Role?",
                "Add Department?"
              ]
        },
    ])
}
