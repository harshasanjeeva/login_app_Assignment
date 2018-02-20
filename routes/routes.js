var home = require('./home');
var ejs = require("ejs");

module.exports = function(app, passport) {


	app.get('/', home.signin);

	app.get('/signin', home.signin);
	app.get('/signup', home.signup);
	
	app.post('/authenticate', function(req, res) {
		
		passport.authenticate('local-login', function(err, user) {

			if(!err) {
					req.session.user = user.user.username;
			        console.log(req.session.user);
			        console.log("session initilized");
					ejs.renderFile('./views/successLogin.ejs', { user: user.user } , function(err, result) {
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

	    })(req, res);
	});

	app.post('/createUser', home.createUser);
	app.get('/getAllUsers', home.getAllUsers);

}