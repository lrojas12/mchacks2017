var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
//var uuid = require('node-uuid'); //to be able to access only one object via uri (e.g. .../students/2000001)
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//database
mongoose.connect('localhost:27017/users');
var Schema = mongoose.Schema;


var userSchema = new Schema({username: {type: String,
                                          unique: true,
                                          index: true},
                            email: String,
                            hashedPassword: String},
                            {collection: 'users'});
var User = mongoose.model('user', userSchema);

function getCurrUsername(req) {
    var username = '';
    var session = req.session;
    if (session.username) {
        username = session.username;
    }
    return username;
}

function userExists(username, hashedPassword) {

    User.find({username: username, hashedPassword: hashedPassword}, function(err, user) {

        if (err) {
            res.send(err);
        }
        console.log("User " + user.username + " found.");
        res.send(user);
    });
}

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});
