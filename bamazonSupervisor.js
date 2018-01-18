var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"",
	database:"bamazon"
});

var makeTable = function(){
	connection.query('SELECT * FROM departments', function(err,res){
		console.table(res);
		addDepartment();
	})

}

var addDepartment = function(){
	inquirer.prompt([{
		type:'input',
		name:'name',
		message:"enter name of new department"
	},{
		type:'input',
		name:'overheadcost',
		message:'enter overheadcost for new department'
	}]).then(function(val){
		connection.query("INSERT INTO departments (departmentname, overheadcost, productsales, totalprofit) VALUES\
			('"+val.name+"',"+val.overheadcost+", 0, 0);" ,function(err,res){
			if(err)throw err;
			console.log("department added");
			makeTable();
		})
	})
}

makeTable();