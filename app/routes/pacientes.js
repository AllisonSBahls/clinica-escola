module.exports = function (application) {

	//Rota que retorna os usuários cadastrados
	application.get('/pacientes', function (req, res) {
		application.app.controllers.pacientes.pacientes(application, req, res);
	});

	//Rotas que leva a uma recepcionista
	application.get('/paciente/profile', function (req, res) {
		application.app.controllers.pacientes.paciente(application, req, res);
	});
	//Rotas para inserir
	application.post('/paciente/save', function (req, res) {
		application.app.controllers.pacientes.paciente_save(application, req, res);
	});
	//Recepcionista gegistra
	application.get('/paciente/adminpaciente', function (req, res) {
		application.app.controllers.pacientes.form_admin_paciente(application, req, res);
	});

	//Registrando pelo site
	application.get('/paciente/registerpaciente', function (req, res) {
		application.app.controllers.pacientes.form_register_paciente(application, req, res);
	});

	application.get('/paciente/delete', function (req, res) {
		application.app.controllers.pacientes.paciente_delete(application, req, res);
	});

	//Alterar
	application.post('/paciente/update', function (req, res, next) {
		application.app.controllers.pacientes.paciente_update(application, req, res);
	});
	
}