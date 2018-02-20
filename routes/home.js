var ejs = require("ejs");
var mysql = require('./mysql');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/users";
var passport = require("./passport");

function signin(req,res) {

	ejs.renderFile('./views/signin.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}

function calculator(req,res) {

	ejs.renderFile('./views/calculator.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}


function signup(req, res) {

		ejs.renderFile('./views/signup.ejs',{er: null}, function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });

}

function createUser(req, res) {

    mongo.connect(mongoURL, function(db) {
		console.log("create user--->")
		  var userobj = { username: req.param("inputUsername"), password: req.param("inputPassword"), fname: req.param("fname"), lname: req.param("lname"), dob: req.param("dob"), gender:req.param("gender")};
		 console.log("userobj",userobj) 
		  db.collection("users").insertOne(userobj, function(err, result) {
			db.close();
		    if (err) {
		    	ejs.renderFile('./views/signup.ejs' ,{er: err}, function(err, r) {
			        // render on success
			        if (!err) {
			            res.end(r);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
		    }
		    else {
		    	console.log("1 document inserted");
		       	ejs.renderFile('./views/user.ejs' , function(e, re) {
			        if (!e) {
			            res.end(re);
			        }
			        else {
			            res.end('An error occurred');
			            console.log(e);
			        }
			    });

		    }

		    
		  });
	});

}

function authenticate(req,res)
{

	let username = req.param("inputUsername");
	let password = req.param("inputPassword");
	console.log("username : "+username);

}

function getAllUsers(req,res)
{
	var getAllUsers = "select * from users";
	console.log("Query is:"+getAllUsers);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				
				var rows = results;
				var jsonString = JSON.stringify(results);
				var jsonParse = JSON.parse(jsonString);
				
				console.log("Results Type: "+(typeof results));
				console.log("Result Element Type:"+(typeof rows[0].emailid));
				console.log("Results Stringify Type:"+(typeof jsonString));
				console.log("Results Parse Type:"+(typeof jsString));
				
				console.log("Results: "+(results));
				console.log("Result Element:"+(rows[0].emailid));
				console.log("Results Stringify:"+(jsonString));
				console.log("Results Parse:"+(jsonParse));
				
				ejs.renderFile('./views/successLogin.ejs',{data:jsonParse},function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
			else {    
				
				console.log("No users found in database");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}  
	},getAllUsers);
}

exports.signin=signin;
exports.signup=signup;
exports.authenticate=authenticate;
exports.getAllUsers=getAllUsers;
exports.createUser=createUser;
exports.calculator=calculator;