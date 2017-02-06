
var restify = require('restify');
var server = restify.createServer();
var setupcontroller = require('./controllers/setcontroller.js');
var usercontroller = require('./controllers/usercontroller.js');
var restifyvalidator = require('restify-validator');
var config = require('./config/dbconnection.js');
var mongoose = require('mongoose');



mongoose.createConnection(config.getMongoConnection());
setupcontroller(server, restify, restifyvalidator);
usercontroller(server);


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});