module.exports = function (application) {

	//Rota que retorna os usuários cadastrados
	application.get('/supervisores', function (req, res) {
		application.app.controllers.supervisores.supervisores(application, req, res);
	});

	//Rotas que leva a uma recepcionista
	application.get('/supervisor/profile', function (req, res) {
		application.app.controllers.supervisores.supervisor(application, req, res);
	});
	//Rotas para inserir
	application.post('/supervisor/save', function (req, res) {
		application.app.controllers.supervisores.supervisor_save(application, req, res);
	});
	//Rotas que leva a uma recepcionista
	application.get('/supervisor/adminsupervisor', function (req, res) {
		application.app.controllers.supervisores.form_admin_supervisor(application, req, res);
	});

	//Deletar
	application.get('/supervisor/delete', function (req, res) {
		application.app.controllers.supervisores.supervisor_delete(application, req, res);
	});

	//Alterar
	application.post('/supervisor/update', function (req, res, next) {
		application.app.controllers.supervisores.supervisor_update(application, req, res);
	});

}
