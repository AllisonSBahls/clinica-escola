module.exports = function (application) {

	//Rota que retorna os usuários cadastrados
	application.get('/estagiarios', function (req, res) {
		application.app.controllers.estagiarios.estagiarios(application, req, res);
	});

	//Rotas que leva a uma recepcionista
	application.get('/estagiario', function (req, res) {
		application.app.controllers.estagiarios.estagiario(application, req, res);
	});
	//Rotas para inserir
	application.post('/estagiario/save', function (req, res) {
		application.app.controllers.estagiarios.estagiario_save(application, req, res);
	});
	//Rotas que leva a uma recepcionista
	application.get('/estagiario/form_include_estag', function (req, res) {
		application.app.controllers.estagiarios.form_include_estag(application, req, res);
	});
}