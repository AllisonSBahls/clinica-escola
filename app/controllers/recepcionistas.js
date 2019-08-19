module.exports.recepcionistas = function(application, req, res){
	var connection = application.config.dbConnection();
	var recepcionistaModel = new application.app.models.RecepcionistaDAO(connection);

	recepcionistaModel.getRecepcionistas(function(error, result){
		res.render("usuarios/recepcionistas", {recepcionistas : result});
	});	
}
