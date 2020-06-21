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
    
    .then(function(answer){
        console.log(answer)
        if (answer.action === "View all Employees") {
            connection.query ("SELECT * FROM employees", (err,res) => {
            if(err) throw err;
            console.log(res);
        });
        } else if (answer.action === "View all Employees by Department") {
            const query = "SELECT * FROM employees e JOIN roles r ON (r.id = e.role_id) JOIN department d ON (r.department_id=d.id)";            
            connection.query (query, (err,res) => {
            if(err) throw err;
            console.log(res);
            connection.end();
        });
        } else if (answer.action === "View all Employees by Manager") {
            const query = "SELECT * FROM employees e JOIN roles r ON (r.id = e.role_id) JOIN department d ON (r.department_id=d.id)";            
            connection.query (query, (err,res) => {
            if(err) throw err;
            console.log(res);
            connection.end();
        });
    }
    });
}
