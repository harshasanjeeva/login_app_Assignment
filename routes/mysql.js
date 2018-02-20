var ejs= require('ejs');
var mysql = require('mysql');


function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'root',
	    database : 'demo',
	    port	 : 3306
	});
	return connection;
}


function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	

function createUser(callback,createQuery){
	
	var connection=getConnection();
	
	connection.query(createQuery, function(err, result) {
		if(err){
			console.log("ERROR: " + err.message);
			callback(err);
		}
		else 
		{	// return err or result
			console.log("Row Inserted");
			console.log(result);
			callback(err);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	

exports.fetchData=fetchData;
exports.createUser=createUser;