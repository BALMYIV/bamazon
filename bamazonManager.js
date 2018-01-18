var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user: "root",
	password:"",
	database:"bamazon"
});



var promptManager = function() {
	connection.query("SELECT * FROM products", function(err,res){
		if(err) throw err;
		//console.log(res);
		inquirer.prompt([{
			type:"rawlist",
			name:"choice",
			message:"What would you like to do?",
			choices:["view low inventory","view all inventory", "add new item","add quantity to existing item",]
		}]).then(function(val){
			if(val.choice=="add new item"){
				addItem();
			}
			if(val.choice=="add quantity to existing item"){
				addQuantity(res);
			}
			if(val.choice=="view low inventory"){
				viewLow(res);
			}
			if(val.choice=="view all inventory"){
				makeTable(res);
			}
		})
	});
}

function addItem(){
	inquirer.prompt([{
		type:"input",
		name:"productname",
		message:"what is the product name?"
	},{
		type:"input",
		name:"department",
		message:"what is the department name of the item?"
	},{
		type:"input",
		name:"price",
		message:"what's this sucka cost per piece?"
	},{
		type:"input",
		name:"quantity",
		message:"how many these suckas you want to add to the stock?"

	}]).then(function(val){
		connection.query("INSERT INTO products (productname,department,price,stockquantity) \
			VALUES ('"+val.productname+"','"+val.department+"','"+val.price+"','"+val.quantity+"');"
			, function(err,res){
			if(err) throw err;
			console.log(val.productname+" ADDED TO bamazon DB!");
			promptManager();
		})

	})
}

function addQuantity(res){
	//console.log(res);
	inquirer.prompt([{
		type:"input",
		name:"productname",
		message:"what product are we updating?"
	},{
		type:"input",
		name:"added",
		message:"how many to add to stockquantity?"
	}]).then(function(val){
		for(i=0;i<res.length;i++){
			if(res[i].productname==val.productname){
				connection.query('UPDATE products SET stockquantity=stockquantity+'
					+val.added+' WHERE itemid='+res[i].itemid+';', function(err,res){
						if(err) throw err;
						if(res.affectedRows == 0){
							console.log("This item is not in the system, choose another \
								item or select addItem at prompt");
							promptManager();
						} else {
							console.log("The items have been added to the stockquantity");
							promptManager();
						}
				})
			}
		}
	})
}

function viewLow(res){
	//console.log(res);
	//console.log("ItemID\tProduct Name\tDepartment\tPrice\tNumber in Stock");
	for(i=0;i<res.length;i++){
		//console.log("got this far");
		if(res[i].stockquantity < 5){
			console.log("got to step 2");
			console.log(res[i].itemid+"\t"+res[i].productname+
				"\t"+res[i].department+"\t"+res[i].price+"\t"+res[i].stockquantity);			

		} 
	}
	promptManager();
}

var makeTable = function(res){
	
		//console.log("ItemID\tProduct Name\tDepartment\tPrice\tNumber in Stock");
		console.log("---------------------------------");
		//console.log(res);
		for(var x=0; x<res.length; x++){
			//console.log("??????")
			console.log(res[x].itemid+"\t"+res[x].productname+
				"\t"+res[x].department+"\t"+res[x].price+"\t"+res[x].stockquantity); 
		}
		console.log("---------------------------------");
		promptManager();
	
};


promptManager();