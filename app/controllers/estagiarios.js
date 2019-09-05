module.exports.estagiarios = function (application, req, res) {
	var connection = application.config.dbConnection();
	var estagiariosModel = new application.app.models.EstagiariosDAO(connection);

	estagiariosModel.getEstagiarios(function (error, result) {
		res.render("users/estagiarios", { estagiarios: result });
	});
}

module.exports.estagiario = function (application, req, res) {
	var connection = application.config.dbConnection();
	var estagiariosModel = new application.app.models.EstagiariosDAO(connection);

	var idEstagiario = req.query;

	estagiariosModel.getEstagiario(idEstagiario, function (error, result) {
		res.render("forms/form_admin_estagiario", { estagiario: result[0] })
	})
}

module.exports.form_admin_estagiario = function (application, req, res) {
	res.render("forms/form_admin_estagiario", { estagiario: {} });
}

module.exports.estagiario_save = function (application, req, res) {
	var estagiario = req.body;
	var connection = application.config.dbConnection();
	var estagiariosModel = new application.app.models.EstagiariosDAO(connection);

	estagiariosModel.saveEstagiario(estagiario, function (error, result) {
		res.redirect('/estagiarios');
	});
}

module.exports.estagiario_delete = function (application, req, res) {
	var connection = application.config.dbConnection();
	var estagiarioModel = new application.app.models.EstagiariosDAO(connection);

	var idEstagiario = req.query;

	estagiarioModel.deleteEstagiario(idEstagiario, function (req, result) {
		res.redirect('/estagiarios');
	});
}

module.exports.estagiario_update = function (application, req, res) {

	var connection = application.config.dbConnection();
	var estagiariosModel = new application.app.models.EstagiariosDAO(connection);	
	
	estagiariosModel.updateEstagiario(req.body.nomeEstagiario, req.body.emailEstagiario, req.body.telefoneEstagiario, req.body.curso, req.body.periodo, req.body.idEstagiario, function (error, result) {
		res.redirect('/estagiarios');
	});
}




