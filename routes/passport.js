var mongoURL = "mongodb://localhost:27017/users";
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("./mongo");

module.exports = function(passport) {

    passport.use('local-login', new LocalStrategy(function(username, password, done) {
        try {
            mongo.connect(mongoURL, function(db){
                console.log('mongo connected in URL: ' + mongoURL);
                console.log("username",username)
               
                db.collection("users").findOne({username: username, password:password}, function(err, user){
                    console.log("came heren",err,user)
                    if (user == null) {
                        err = 1;
                        console.log("came here error",err)
                        done(err);
                    }
                     else if (user){
                        console.log("user : "+user.username);
                        done(null, {user: {username:user.username, password: user.password, fname: user.fname, lname: user.lname, gender: user.gender, dob: user.dob}});

                    } else{
                        done(err);
                    }
                
                });
            });
        }
        catch (e){
            console.log("ss"+e);
            done(false, e);
        }
    }));

}