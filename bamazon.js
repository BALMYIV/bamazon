var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:'root',
	password: "",
	database:"bamazon",
});

connection.connect(function(err){
	if (err) throw err;
	console.log("\x1b[42m%s\x1b[0m", "\n       connecton successful!!!!\n");
	makeTable();
})

var makeTable = function(){
	connection.query("SELECT * FROM products" , function(err,res){
		for(var i=0; i<res.length; i++){
			console.log(res[i].itemid+" || "+res[i].productname+" || "+
				res[i].department+" || "+res[i].price+" || "+res[i].
				stockquantity+"\n");
		}
	promptCustomer(res);
	})
}

var promptCustomer = function(res){
	inquirer.prompt([{
		type:'input',
		name:'choice',
		message:'What do you want to buy? [Q to Quit]',
	}]).then(function(answer){
		var correct = false;
		if(answer.choice.toUpperCase()=="Q"){
			process.exit();
		}
		for(var i=0; i<res.length;i++){
			//console.log(answer);
			if(res[i].productname==answer.choice){
				correct=true;
				var product=answer.choice;
				var id=i;
				inquirer.prompt({
					type:"input",
					name:"quant",
					message:"How many you want, fella?",
					validate: function(value){
						if(isNaN(value)==false){
							return true;
						} else {
							return false;
						}
					}
				}).then(function(answer){
					//console.log(res);
					if((res[id].stockquantity-answer.quant)>=0){
						connection.query("UPDATE products SET \
							stockquantity='"+(res[id].stockquantity-
							answer.quant)+"' WHERE productname='"+product+"'", function(err,res2){
								connection.query("UPDATE departments SET productsales=productsales+"+(answer.quant*res[id].price)+
								", totalprofit=productsales-overheadcost WHERE departmentname='"+res[id].department+"';"	
								, function(err,res3){

									console.log("\x1b[42m%s\x1b[0m",(answer.quant*res[id].price));
									console.log("SALES FIGURES WERE ADDED TO APPROPRIATE DEPARTMENT!!");
								});
								console.log("Product Bought!");
								makeTable();
						})
					} else {
						console.log("We don't have that many of those!");
						promptCustomer(res);
					}
				})

			}
		}	
	if(i==res.length && correct==false){
		console.log("you're asking for something we don't have!");
		promptCustomer(res);
		
	}
	})
}