module.exports = function (application) {

	//Rota que retorna os usuários cadastrados
	application.get('/pacientes', function (req, res) {
		application.app.controllers.pacientes.pacientes(application, req, res);
	});

	//Rotas que leva a uma recepcionista
	application.get('/paciente', function (req, res) {
		application.app.controllers.pacientes.paciente(application, req, res);
	});
	//Rotas para inserir
	application.post('/paciente/save', function (req, res) {
		application.app.controllers.pacientes.paciente_save(application, req, res);
	});
	//Rotas que leva a uma recepcionista
	application.get('/paciente/form_include_pacien', function (req, res) {
		application.app.controllers.pacientes.form_include_pacien(application, req, res);
	});
}