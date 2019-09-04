module.exports = function (application) {

	//Rota que retorna os usuários cadastrados
	application.get('/estagiarios', function (req, res) {
		application.app.controllers.estagiarios.estagiarios(application, req, res);
	});

	//Rotas que leva a uma recepcionista
	application.get('/estagiario/profile', function (req, res) {
		application.app.controllers.estagiarios.estagiario(application, req, res);
	});
	//Rotas para inserir
	application.post('/estagiario/save', function (req, res) {
		application.app.controllers.estagiarios.estagiario_save(application, req, res);
	});
	//Rotas que leva a uma recepcionista
	application.get('/estagiario/adminestagiario', function (req, res) {
		application.app.controllers.estagiarios.form_admin_estagiario(application, req, res);
	});

	//Deletar
	application.get('/estagiario/delete', function (req, res) {
		application.app.controllers.estagiarios.estagiario_delete(application, req, res);
	});

	//Alterar
	application.post('/estagiario/update', function (req, res, next) {
		application.app.controllers.estagiarios.estagiario_update(application, req, res);
	});
	
}