const inquirer = require('inquirer');
const { db } = require('./connection');

function viewDep() {
    db.connect(function(err) {
        if (err) throw err;
        db.query("SELECT * FROM department", function (err, result, fields) {
            if (err) throw err;
            console.table(result);
            menu();
        });
    })};

function viewRoles() {
      db.connect(function(err) {
          if (err) throw err;
          db.query("SELECT * FROM roles", function (err, result, fields) {
              if (err) throw err;
              console.table(result);
              menu();
          });
      })};

function viewEmp() {
        db.connect(function(err) {
            if (err) throw err;
            db.query("SELECT * FROM employee", function (err, result, fields) {
                if (err) throw err;
                console.table(result);
                menu();
            });
        })};

function addDep() {
  inquirer
  .prompt([
        {
            type: 'input',
            name: 'menu',
            message: 'What is the name of the department?',
        },
  ])
  .then((answers) => {
    db.connect(function(err) {
      if (err) throw err;
        db.query("INSERT INTO department (names) VALUES ('blue')", function (err, result, fields) {
          if (err) throw err;
          console.log("Successfully added")
          menu();
      })}
      
      );
  })};

function inqFunc() {
  inquirer
  .prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'MENU: Choose an option',
            choices: ['view all departments', 'view all roles', 
            'view all employees', 'add a department', 'add a role', 'add an employee',
            'update an employee role', 'exit']
        },
    /* Pass your questions in here 

    */
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    if (answers.menu == 'view all departments') {
        viewDep();
      } 
    
    if (answers.menu == 'view all roles') {
      viewRoles();
    }
    
    if (answers.menu == 'view all employees') {
      viewEmp();
    }

    if (answers.menu == 'add a department') {
      addDep();

    }

    if (answers.menu == 'exit') {
      process.exit();
    }
  })
}

function menu() {
inquirer
    .prompt([
  {
    type: "list",
    name: "exit",
    message: "Return to Menu or Quit",
    choices: ['Menu', 'Exit']
},
]).then((answers) => {

if (answers.exit == "Menu") {
inqFunc();
}

if (answers.exit == 'Exit') {
  process.exit();
}
    
})
.catch((error) => {
  if (error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
  } else {
    // Something else went wrong
  }
});
}

module.exports = {
    inqFunc,
};