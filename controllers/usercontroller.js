var helpers = require('../config/helperfunction.js');
var UserModel = require('../models/UserModel.js');
// Fake DB
var users = {};
var max_user_id = 0;


module.exports = function(server){
	
	server.get("/", function(req, res, next) {
		helpers.success(res, next, users);
	});

	server.get("/user/:id", function(req, res, next) {
		req.assert('id', 'ID is required and must be numeric').notEmpty().isInt();
		var errors = req.validationErrors();
		if (errors) {
			helpers.failure(res,next, errors[0], 400);
		}
		if (typeof(users[req.params.id]) === 'undefined') {
			helpers.failure(res, next, 'The specified user could not be found in the database', 404);
		}
		helpers.success(res, next, users[parseInt(req.params.id)]);
	});

	server.post("/user", function(req, res, next) {
		req.assert('first_name', 'First name is required').notEmpty();
		req.assert('last_name', 'Last name is required').notEmpty();
		req.assert('email', 'Email Adress is required and must be valid').notEmpty().isEmail();
		req.assert('career', 'Career must be Student  teacher or Professor').isIn(['student','teacher','professor']);
		var errors = req.validationErrors();
		if (errors) {
			helpers.failure(res,next, errors, 400);
		}
		var user = new UserModel();
		user.first_name = req.params.first_name;
		user.last_name = req.params.last_name;
		user.email = req.params.email;
		user.career = req.params.career;
		user.save(function(err){
			helpers.failure(res,next, 'Error Saving user to database', 500);
		});
		helpers.success(res, next, user);
	});

	server.put("/user/:id", function(req, res, next) {
		req.assert('id', 'ID is required and must be numeric').notEmpty().isInt();
		var errors = req.validationErrors();
		if (errors) {
			helpers.failure(res,next, errors[0], 400);
		}
		if (typeof(users[req.params.id]) === 'undefined') {
			helpers.failure(res, next, 'The specified user could not be found in the database', 404);
		}
		var user = users[parseInt(req.params.id)];
		var updates = req.params;
		for (var field in updates) {
			user[field] = updates[field];
		}
		helpers.success(res, next, user);
	});

	server.del("/user/:id", function(req, res, next) {
		req.assert('id', 'ID is required and must be numeric').notEmpty().isInt();
		var errors = req.validationErrors();
		if (errors) {
			helpers.failure(res,next, errors[0], 400);
		}
		if (typeof(users[req.params.id]) === 'undefined') {
			helpers.failure(res, next, 'The specified user could not be found in the database', 404);
		}
		delete users[parseInt(req.params.id)];
		helpers.success(res, next, []);
	});



}