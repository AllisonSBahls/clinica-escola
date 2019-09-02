module.exports = function (application) {

	//Rota que retorna os usuários cadastrados
	application.get('/supervisores', function (req, res) {
		application.app.controllers.supervisores.supervisores(application, req, res);
	});

	//Rotas que leva a uma recepcionista
	application.get('/supervisor', function (req, res) {
		application.app.controllers.supervisores.supervisor(application, req, res);
	});
	//Rotas para inserir
	application.post('/supervisor/save', function (req, res) {
		application.app.controllers.supervisores.supervisor_save(application, req, res);
	});
	//Rotas que leva a uma recepcionista
	application.get('/supervisor/form_include_superv', function (req, res) {
		application.app.controllers.supervisores.form_include_superv(application, req, res);
	});
}