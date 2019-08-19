module.exports = function(application) {
	
	application.get('/recepcionistas', function(req, res){
		application.app.controllers.recepcionistas.recepcionistas(application, req, res);		
	});
};