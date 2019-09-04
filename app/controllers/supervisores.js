module.exports.supervisores = function (application, req, res) {
	var connection = application.config.dbConnection();
	var supervisorModel = new application.app.models.SupervisoresDAO(connection);

	supervisorModel.getSupervisores(function (error, result) {
		res.render("usuarios/supervisores/supervisores", { supervisores: result });
	});
}

module.exports.supervisor = function (application, req, res) {
	var connection = application.config.dbConnection();
	var supervisorModel = new application.app.models.SupervisoresDAO(connection);

	var idSupervisor = req.query;

	supervisorModel.getSupervisor(idSupervisor, function (error, result) {
		res.render("forms/form_admin_supervisor", { supervisor: result[0] })
	})
}

module.exports.form_admin_supervisor = function (application, req, res) {
	res.render("forms/form_admin_supervisor", { supervisor: {} });
}

module.exports.supervisor_save = function (application, req, res) {
	var supervisor = req.body;

	var connection = application.config.dbConnection();
	var supervisorModel = new application.app.models.SupervisoresDAO(connection);

	supervisorModel.saveSupervisor(supervisor, function (error, result) {
		res.redirect('/recepcionistas');
	});
}

module.exports.recepcionista_delete = function (application, req, res) {
	var connection = application.config.dbConnection();
	var supervisorModel = new application.app.models.SupervisoresDAO(connection);

	var idSupervisor = req.query;

	supervisorModel.deleteSupervisor(idSupervisor, function (req, result) {
		res.redirect('/supervisores');
	});
}

module.exports.recepcionista_update = function (application, req, res) {

	var connection = application.config.dbConnection();
	var supervisorModel = new application.app.models.SupervisoresDAO(connection);

	supervisorModel.updateSupervisor(req.body.nomeSupervisor, req.body.emailSupervisor, req.body.telefoneSupervisor, req.body.idSupervisor, function (error, result) {
		res.redirect('/supervisores');
	});
}




