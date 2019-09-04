module.exports.pacientes = function (application, req, res) {
	var connection = application.config.dbConnection();
	var pacientesModel = new application.app.models.PacientesDAO(connection);

	pacientesModel.getPacientes(function (error, result) {
		res.render("users/pacientes", { pacientes: result });
	});
}

module.exports.paciente = function (application, req, res) {
	var connection = application.config.dbConnection();
	var pacientesModel = new application.app.models.PacientesDAO(connection);

	var idPaciente = req.query;

	pacientesModel.getPaciente(idPaciente, function (error, result) {
		res.render("forms/form_admin_paciente", { paciente: result[0] })
	})
}

module.exports.form_admin_paciente = function (application, req, res) {
	res.render("forms/form_admin_paciente", { paciente: {} });
}

module.exports.form_register_paciente = function (application, req, res) {
	res.render("forms/form_register_paciente", { paciente: {} });
}

module.exports.paciente_save = function (application, req, res) {
	var paciente = req.body;
	var connection = application.config.dbConnection();
	var pacientesModel = new application.app.models.PacientesDAO(connection);

	pacientesModel.savePaciente(paciente, function (error, result) {
		res.redirect('/pacientes');
	});
}

module.exports.paciente_delete = function (application, req, res) {
	var connection = application.config.dbConnection();
	var pacienteModel = new application.app.models.PacientesDAO(connection);

	var idPaciente = req.query;

	pacienteModel.deletePaciente(idPaciente, function (req, result) {
		res.redirect('/pacientes');
	});
}

module.exports.paciente_update = function (application, req, res) {

	var connection = application.config.dbConnection();
	var pacientesModel = new application.app.models.PacientesDAO(connection);	
	
	pacientesModel.updatePaciente(req.body.nomePaciente, req.body.emailPaciente, req.body.telefonePaciente, req.body.dataNascimento, req.body.sexo, req.body.idPaciente, function (error, result) {
		res.redirect('/pacientes');
	});
}




