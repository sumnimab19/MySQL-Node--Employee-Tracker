const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"",
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
            "View All Roles",
            "Exit"
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
  
        case "View all Employees by Manager":
          employeeByManagerSearch();
          break;
  
        case "Add Employee":
          addEmployee();
          break;
  
        case "Remove Employee":
          removeEmployee();
          break;
        
        case "Update Employee Role":
            updateEmployeeRole();
            break;


        case "View All Roles":
            viewAllRoles();
            break;
        
        case "Exit":
            connection.end();
            break;
        }
    });
}
    
function allEmployeeSearch(){
    const query = "SELECT  e.id, first_name, last_name, title, dept_name, salary, manager FROM employees e JOIN roles r ON (r.id = e.role_id) JOIN department d ON (r.department_id=d.id) JOIN manager m ON (e.role_id = m.id)";
    connection.query (query, (err,res) => {
        if(err) throw err;
        console.table(res);
        start();
    });   
}


function employeeByDeptSearch(){
  let deptList = [];
  const query = "SELECT dept_name FROM department";
  connection.query (query, (err,res) => {
  if(err) throw err;
  for (let i = 0; i < res.length; i++){
    deptList.push(res[i].dept_name)
  }   

  inquirer
  .prompt({
    name: "department",
    type: "list",
    message: "Which department would you like to search?",
    choices: deptList
  })
    .then(function(answer) {
        const query = `SELECT  e.id, first_name, last_name, title, dept_name, salary, manager FROM employees e JOIN roles r ON (r.id = e.role_id) JOIN department d ON (r.department_id=d.id) JOIN manager m ON (e.role_id = m.id)
        WHERE ?`;            
        connection.query (query, {dept_name: answer.department}, (err,res) => {
            if(err) throw err;
            console.table(res);
            start();
        });
      });
    }
)}
   

function employeeByManagerSearch(){
  let managerList = [];
  const query = "SELECT manager FROM manager";
  connection.query (query, (err,res) => {
  if(err) throw err;
  for (let i = 0; i < res.length; i++){
    managerList.push(res[i].manager)
  }   

  inquirer
  .prompt({
    name: "manager",
    type: "list",
    message: "Which employee would you like to search?",
    choices: managerList
  })
    .then(function(answer) {
        const query = `SELECT  e.id, first_name, last_name, title, dept_name, salary, manager FROM employees e JOIN roles r ON (r.id = e.role_id) JOIN department d ON (r.department_id=d.id) JOIN manager m ON (e.role_id = m.id)
        WHERE ?`;  
        connection.query (query, {manager: answer.manager}, (err,res) => {
            if(err) throw err;
            console.table(res);
            start();
        });
    });
  });
}
            
function addEmployee(){
        let roleList = [];
        const query = "SELECT title FROM roles";
        connection.query (query, (err,res) => {
        if(err) throw err;
        for (let i = 0; i < res.length; i++){
          roleList.push(res[i].title)
        }   

        let managerList = [];
        const query = "SELECT manager FROM manager";
        connection.query (query, (err,res) => {
        if(err) throw err;
        for (let i = 0; i < res.length; i++){
          managerList.push(res[i].manager)
        }   

    inquirer.prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: roleList
        },
        {
          message: "Who is employee's manager?",
          type: "rawlist",
          name: "manager",
          choices: managerList
        }
      ]).then(function(answer) {
        let roleID;
        connection.query("SELECT * FROM roles WHERE title = '" + answer.role + "'", function (err, res) {
        if(err) throw err;
        roleID = res[0].id;

        let managerID;
        connection.query("SELECT * FROM manager WHERE manager = '" + answer.manager + "'", function (err, res) {
        if(err) throw err;
        managerID = res[0].id;

        console.log("Adding a new employee...\n");
        const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?)`;
        
        let empList = [
            answer.first_name,
            answer.last_name,
            roleID,
            managerID
        ];

        connection.query(query, [empList], (err, res) => {
        if (err) throw err;
            start();
        });
           
      });
    });
  });

  });
  });
}


function removeEmployee() {
  let empList = [];
    const query = "SELECT first_name FROM employees";
    connection.query (query, (err,res) => {
    if(err) throw err;
    for (let i = 0; i < res.length; i++){
      empList.push(res[i].first_name)
    }   

    inquirer
    .prompt({
      name: "firstname",
      type: "list",
      message: "Which employee would you like to remove?",
      choices: empList
    })
  
    .then(function(answer) {
      console.log(answer)
      const query = "DELETE FROM employees WHERE ?";
      connection.query(query, {first_name:answer.firstname}, (err, res) => {
        if (err) throw err;
        console.log("Removed employee from database");
        start();
      });
    });
  });
}



function updateEmployeeRole() {
  connection.query("SELECT department.dept_name, department.id FROM department", (err, res) => {
    let deptName = [];
    let deptId = [];
    for (let i = 0; i < res.length; i++) {
      deptName.push(res[i].dept_name);
      deptId.push(res[i].id);
    }
    inquirer
        .prompt([
            {
                name: "role",
                type: "input",
                message: "What Role would you like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for this role?"
            },
            {
                name: "department",
                type: "list",
                message: "What is the Department?",
                choices: deptName
            }
        ])
        .then(function (answer) {
            let newDept = answer.department;
            let deptIndex = deptName.indexOf(newDept);
            connection.query("INSERT INTO roles SET ?",
                {
                    title: answer.role,
                    salary: answer.salary,
                    department_id: deptId[deptIndex]
                },
                err=> {
                    if (err) throw err;
                    console.log("New Role has been added.");
                    start()
                });
        });
});
}


function viewAllRoles() {
    const query = "SELECT id, title FROM roles ORDER BY id";
    connection.query (query, (err,res) => {
        if(err) throw err;
        console.table(res);
        start();
    });
}

