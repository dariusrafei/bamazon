var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"root",
	database:"bamazon"
})

var makeTable = function(){
	connection.query('SELECT * FROM departments', function(err,res){
		console.table(res);
		addDepartment();
	})
}

var addDepartment = function(){
	inquirer.prompt([{
		type:"input",
		name:"name",
		message:"what is the name of the department?"
	},{
		type:"input",
		name:"overhead",
		message:"What is the overhead cost of the department?"
	}]).then(function(val){
		connection.query("INSERT INTO departments (departmentname,overheadcosts,productsales,totalsales) VALUES ('"+val.name+"',"+val.overhead+",0,0);", function(err,res){
			if(err)throw err;
			console.log("ADDED DEPARTMENT!");
			makeTable();
		})
	})
}

makeTable();