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
	
	var idRecepcionista = req.query;

	recepcionistasModel.getRecepcionista(idRecepcionista, function(error, result){
		res.render("usuarios/recepcionista", {recepcionista : result})
})
}

module.exports.form_include_recep = function(application, req, res){
	res.render("forms/form_include_recep", {recepcionista : {}});
}

module.exports.recepcionista_save = function(application, req, res){
	var recepcionista = req.body;	
	var connection = application.config.dbConnection();
	var recepcionistasModel = new application.app.models.RecepcionistasDAO(connection);
	
	recepcionistasModel.saveRecepcionista(recepcionista, function (error, result){
		res.redirect('/recepcionistas');
	});
}

module.exports.recepcionista_delete = function(application, req, res){
	var connection = application.config.dbConnection();
	var recepcionistaModel = new application.app.models.RecepcionistasDAO(connection);
	
	var idRecepcionista = req.query;

	recepcionistaModel.deleteRecepcionista(idRecepcionista, function(req, result){
		res.redirect('/recepcionistas');
	});
}


