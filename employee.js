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
    const query = "SELECT  e.id, first_name, last_name, title, dept_name, salary, manager FROM employees e JOIN roles r ON (r.id = e.role_id) JOIN department d ON (r.department_id=d.id) JOIN manager m ON (e.role_id = m.id)";
    connection.query (query, (err,res) => {
        if(err) throw err;
        console.table(res);
        start();
    });   
}


function employeeByDeptSearch(){
    inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Which department would you like to search?",
    })

    .then(function(answer) {
        const query = `SELECT  e.id, first_name, last_name, title, dept_name, salary, manager FROM employees e JOIN roles r ON (r.id = e.role_id) JOIN department d ON (r.department_id=d.id) JOIN manager m ON (e.role_id = m.id)
        WHERE ?`;            
        connection.query (query, {dept_name: answer.department}, (err,res) => {
            if(err) throw err;
            console.table(res);
            start();
        });
    }
)}
   

function employeeByManagerSearch(){
    inquirer
    .prompt({
      name: "manager",
      type: "input",
      message: "Which manager would you like to search?",
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
}
            
function addEmployee(){
        // NEED TO WORK ON THIS FUNCTION

    inquirer.prompt([
        {
          type: "input",
          name: "firstname",
          message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastname",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "role",
            message: "What is the employee's role?",
            choices: [
                "Sales Lead",
                "Lead Engineer",
                "Software Engineer",
                "Account Manager",
                "Accountant",
                "Legal Team Lead"
              ]
        },
        {
          type: "list",
          message: "Who is employee's manager?",
          name: "manager",
          choices: [
              "a",
              "b"
          ]
        }
      ]).then(function(answer) {
        console.log("Adding a new employee...\n");
        // const query = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?)";
        // let empList = [
        //     answer.firstname,
        //     answer.lastname,
        //     3,
        //     4
        //     // answer.role,
        //     // answer.manager
        // ];

        // execute the insert statment
//         connection.query(query, [(empList)], (err, res) => {
//         if (err) throw err;
  
//         });
//         // INSERT INTO employees (first_name, last_name, role_id, manager_id)
//         // VALUES ("Daton","Noah", 1,1);
//         connection.query (query, {firstname:answer.first_name, lastname:answer.last_name, role:answer.role_id, manager_id: answer.manager_id}, (err,res) => {
//             if(err) throw err;
//             // console.log(Added Employee's First Name + Employee's Last Name to the database)
//             console.table(res);
//             start();
//     });
});
}


function removeEmployee() {
    // NEED TO WORK ON THIS FUNCTION
    const query = "SELECT first_name FROM employees";
    connection.query (query, (err,res) => {
    if(err) throw err;
    let empList = res;
    console.log(empList);
    })
    inquirer
    .prompt({
      name: "employee",
      type: "list",
      message: "Which employee would you like to remove?",
      choices: empList
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
        // NEED TO WORK ON THIS FUNCTION

//     console.log("Updating all Rocky Road quantities...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         quantity: 100
//       },
//       {
//         flavor: "Rocky Road"
//       }
//     ],
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );

  // logs the actual query being run
//   console.log(query.sql);

}

function updateEmpManager() {
  // NEED TO WORK ON THIS FUNCTION

    // Which employee's manager do you want to update?
    // List of names
    // Which employee do you want to set as manager for the selected employee?
    // List of names
    // console.log("Updated employee's manager")

}

function viewAllRoles() {
    const query = "SELECT id, title FROM roles ORDER BY id";
    connection.query (query, (err,res) => {
        if(err) throw err;
        console.table(res);
    });
}

