var express = require('express');
var router = express.Router();
var User = require('../models/user');



var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	router.get('/new', function(req, res) {
		res.render('new', { user: req.user })
	});

	router.post('/addCourse', function(req, res) {
		console.log("DATA:", req.user.username, req.param("courseName"), req.param("courseCode"));

		req.user.data =
		{
			semesters:
			[
				{
					courses:
					[
						{
							name: req.param("courseName"),
							code: req.param("courseCode"),
							breakdown:
							[
							]
						}
					]
				}
			]
		};

		console.log(req.user);

		User.save({"username": req.user.username, req.user});

		var updatedUser = User.find({"username":req.user.username})
		console.log(updatedUser);
		res.render("home", { user: req.user })
	});

	return router;
}
