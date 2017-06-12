//Initializes npm packages
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
//Initializes connection variable to sync with a mysql database 
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root", //Your username//
  password: "root", //Your password//
  database: "Bamazon_db"
})

//Creates connection with server and runs makeTable() upon connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  makeTable();
})

//Function to grab the products table from database and print results into concsole
var makeTable = function() {
  //Selects all of the data from the mysql products table 
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    //Prints table 
    var tab = "\t";
    console.log("ItemID\tProduct Name\tDepartment Name\tPrice\t# In Stock");
    console.log("--------------------------------------------------------");
    //FOR LOOP GOES THROUGH THE MYSQL TABLE AND PRINTS EACH INDIVIDUAL ROW ON A NEW LINE//
    for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + tab + res[i].product_name + tab + res[i].department_name + tab + res[i].price + tab + res[i].stock_quantity);
    }
    console.log("--------------------------------------------------------");
    //Runs customer's prompt after creating the table
    promptCustomer(res);
  });
};

//Function containing all customer prompts
var promptCustomer = function(res) {
  //Inquirer-Prompts user for what they'd like to buy
  inquirer.prompt([{
    type: 'input',
    name: 'choice',
    message: 'What would you like to buy?!'
  }]).then(function(val) {
    var correct = false;
    //Loops through mysql table to check if the product they wanted is in the db
    for (var i = 0; i < res.length; i++) {
      //If the product exists, set variables from columns in the tabke and correct=true. Ask user how many they would like to buy
      if (val.choice == res[i].product_name) {
        var quantity = res[i].stock_quantity;
        var id = res[i].item_id;
        var name = res[i].product_name;
        var price = res[i].price;
        correct = true;
        var checkQuantity = function() {
          inquirer.prompt([{
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to buy?'
          }]).then(function(response) {
            if (response.quantity < quantity) {
              connection.query(`UPDATE products SET stock_quantity=${quantity - response.quantity} WHERE item_id=${id}`, function(err, res) {
                if (err) throw err;

                console.log(`Yummy! You just bought ${response.quantity} ${name}(s), for the low low price of $${price * response.quantity}!!`);
                return;
              });
            } else {
              console.log("Sorry, please enter a quantity less than " + quantity);
              checkQuantity();
            };
          });
        };
        checkQuantity();
      };
    };
  });
};