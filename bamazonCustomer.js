// need this program calls mySql 
var mySql = require("mysql");
// also need this program calls inquire 
var inquirer = require("inquirer");

// this is my value 
const connectionParams = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "keiko123",
    database: "bamazon_db"
};

// connecting this value to my database
var connection = mySql.createConnection(connectionParams);


// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // print this message if its connected
    console.log('connected');
    // then call this function calls displayAll
    displayAll();
});

function displayAll() {
    // query/search the database for all items being selected.
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // if there is no error, show the table called results
        //   displaying the table
        console.table(results);

        // then call the function start()
        start();
    });
}

function start() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the ID number?",
                name: "id"
            },
            {
                type: "input",
                message: "How many items would you like to buy?",
                name: "units"
            }
        ])
        .then(function (answer) {
            // get the information of the chosen item
            console.log(answer);
            // check to see if user input, answer.units, is exist in the item_id 
            var query = connection.query(
                "SELECT * FROM products WHERE item_id=?", [answer.id], function (err, res) {
                if (err) throw err;
                console.log("res ", res);
                console.log("stock_quantity" + res[0].stock_quantity);
                console.log("answer " + answer.units);
                // compare how many items we store with how many items the user wants to buy
                if (res[0].stock_quantity >= parseInt(answer.units)) {
                    console.log('gonna work');
                    var newStockQuantity = res[0].stock_quantity - answer.units;
                    console.log(newStockQuantity);
                    // This means updating the SQL database to reflect the remaining quantity
                    updateProduct(newStockQuantity, answer.id);
                    // Once the update goes through, show the customer the total cost of their purchase.
                    var total = res[0].price*answer.units 
                    console.log("Here is your total cost $" + total);
                } else {
                    console.log("Insufficient quantity!")
                }
            })

        });
}

function updateProduct(newStockQuantity, item_id) {
    console.log("Updating database...\n");
    // updating product table and setting stock_quantity (column) to newStockQuantity which we passed into this function. where item_id because it is very specific to recognize which items 
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newStockQuantity
            },
            {
                item_id: item_id
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
            
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

