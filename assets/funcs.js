const inquirer = require("inquirer");
const { db } = require("./connection");

function viewDep() {
  db.connect(function (err) {
    if (err) throw err;
    db.query("SELECT * FROM department", function (err, result, fields) {
      if (err) throw err;
      console.table(result);
      menu();
    });
  });
}

function viewRoles() {
  db.connect(function (err) {
    if (err) throw err;
    db.query("SELECT * FROM roles", function (err, result, fields) {
      if (err) throw err;
      console.table(result);
      menu();
    });
  });
}

function viewEmp() {
  db.connect(function (err) {
    if (err) throw err;
    db.query(
      `SELECT CONCAT(employee.first_name,' ', employee.last_name) AS name, roles.title AS role, roles.salary, department.names AS department, CONCAT(manager.first_name,' ', manager.last_name) AS manager 
      FROM employee 
      INNER JOIN roles ON employee.roleId = roles.id
      INNER JOIN department ON roles.departmentId = department.id
      LEFT JOIN employee manager ON employee.managerId = manager.id `, function (err, result, fields) {
      if (err) throw err;
      console.table(result);
      menu();
    });
  });
}

function addDep() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "menu",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      console.log(answers.menu);
      db.connect(function (err) {
        if (err) throw err;
        if (!isNaN(answers.menu)) {
          db.query(
            `INSERT INTO department (names) VALUES (?)`, answers.menu,
            function (err, result, fields) {
              if (err) throw err;
              console.log("Successfully added");
              menu();
        })
      } else {
        console.log('Can only contain letters')
        addDep();
      }
     
      })
    
      });
};


function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary?",
      },
    ])
    .then((answers) => {
      db.connect(
        function (err) {
          if (err) throw err;
          db.query("SELECT * FROM department", function (err, result) {
            if (err) throw err;
            console.table(result);
          });
        },
        inquirer
          .prompt([
            {
              type: "input",
              name: "dep",
              message: "Enter department ID number",
            },
          ])
          .then((answer) => {
            db.connect(function (err) {
              if (err) throw err;
              db.query(
                `INSERT INTO roles (title, salary, departmentId) VALUES ('${answers.role}','${answers.salary}', '${answer.dep}')`,
                function (err, result) {
                  if (err) throw err;
                  console.log("Successfully added");
                  menu();
                }
              );
            });
          })
      );
    });
}

function inqFunc() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "MENU: Choose an option",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "exit",
        ],
      },
      /* Pass your questions in here 

    */
    ])
    .then((answers) => {
      // Use user feedback for... whatever!!
      if (answers.menu == "view all departments") {
        viewDep();
      }

      if (answers.menu == "view all roles") {
        viewRoles();
      }

      if (answers.menu == "view all employees") {
        viewEmp();
      }

      if (answers.menu == "add a department") {
        addDep();
      }

      if (answers.menu == "add a role") {
        addRole();
      }

      if (answers.menu == "exit") {
        process.exit();
      }
    });
}

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "exit",
        message: "Return to Menu or Quit",
        choices: ["Menu", "Exit"],
      },
    ])
    .then((answers) => {
      if (answers.exit == "Menu") {
        inqFunc();
      }

      if (answers.exit == "Exit") {
        process.exit();
      }
    });
}

module.exports = {
  inqFunc,
};
