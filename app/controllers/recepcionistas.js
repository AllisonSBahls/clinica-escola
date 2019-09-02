module.exports.recepcionistas = function(application, req, res){
	var connection = application.config.dbConnection();
	var recepcionistasModel = new application.app.models.RecepcionistasDAO(connection);

	recepcionistasModel.getRecepcionistas(function(error, result){
		res.render("usuarios/recepcionistas", {recepcionistas : result});
	});	
}

module.exports.recepcionista = function(application, req, res){
	var connection = application.config.dbConnection();
	var recepcionistasModel = new application.app.models.RecepcionistasDAO(connection);
	
	var idRecepcionistas = req.query;

	recepcionistasModel.getRecepcionista(idRecepcionistas, function(error, result){
		res.render("usuarios/recepcionista", {recepcionista : result})
})

module.exports.recepcionista_save = function(application, req, res){
	var recepcionista = req.body;
	res.render("forms/form_include_recep", {recepcionista : recepcionista});
	
	var connection = application.config.dbConnection();
	var recepcionistasModel = new application.app.models.RecepcionistasDAO(connection);
	recepcionistasModel.saveRecepcionista(recepcionista, function (error, result){
		res.render("/recepcionistas");
	});	
}

module.exports.formulario_inclusao_noticia = function(application, req, res){
	res.render("forms/form_include_recep", {recepcionista : {}});
}
}
