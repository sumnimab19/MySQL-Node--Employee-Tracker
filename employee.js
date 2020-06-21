const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"MeroSQL@20",
    database:"employee_DB"
});

connection.connect(err => {
    if(err) throw err;
    console.log(`connected as id ${connection.threadId} \n`);
    start();
});

function start(){
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View all Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "View All Employees":
          allEmployeeSearch();
          break;
  
        case "View All Employees By Department":
          employeeByDeptSearch();
          break;
  
        case "FView all Employees by Manager":
          employeeByManagerSearch();
          break;
  
        case "Add Employee":
          addEmployee();
          break;
  
        case "Remove Employee":
          removeEmployee();
          break;
        
        case "Update Employee Role":
            updateEmployee();
            break;

        case "Update Employee Manager":
            updateEmpManager();
            break;

        case "View All Roles":
            viewAllRoles();
            break;
        }
    });
}
    
function allEmployeeSearch(){
    const query = "SELECT * FROM employees";
    connection.query (query, (err,res) => {
        if(err) throw err;
        console.table(res);
    });
}


function employeeByDeptSearch(){
    const query = "SELECT * FROM employees e JOIN roles r ON (r.id = e.role_id) JOIN department d ON (r.department_id=d.id)";            
    connection.query (query, (err,res) => {
        if(err) throw err;
        console.log(res);
    });
}
            
function employeeByManagerSearch(){
    const query = "SELECT * FROM employees e JOIN roles r ON (r.id = e.role_id) JOIN department d ON (r.department_id=d.id)";            
    connection.query (query, (err,res) => {
        if(err) throw err;
        console.log(res);
        connection.end();
    });
}
            
function addEmployee(){
    // What is the employee's first name?
    // What is the employee's last name?
    // What is employee's role?
    // list of roles goes here
    // Who is employee's manager?
    // List of manager goes here
    // console.log(Added Employee's First Name + Employee's Last Name to the database)

}

function removeEmployee() {
    inquirer
    .prompt({
      name: "employee",
      type: "input",
      message: "Which employee would you like to remove?"
    })
    .then(function(answer) {
        // list the first name of employees so selection can be made to delete it
      const query = "DELETE * FROM employees ?";
      connection.query(query, { employee: answer.first_name }, function(err, res) {
        console.log("Removed employee from database");
        console.table(res);   
        start();
      });
    });
}

function updateEmployee() {

}

function updateEmpManager() {
    // Which employee's manager do you want to update?
    // List of names
    // Which employee do you want to set as manager for the selected employee?
    // List of names
    // console.log("Updated employee's manager")

}

function viewAllRoles() {

}

