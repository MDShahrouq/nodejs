module.exports = function(server, restify, restifyvalidator) {
	server.use(restify.acceptParser(server.acceptable));
	server.use(restify.queryParser());
	server.use(restify.bodyParser());
	server.use(restifyvalidator);


}