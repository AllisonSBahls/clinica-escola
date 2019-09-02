module.exports = function (application) {

	//Rota que retorna os usuários cadastrados
	application.get('/recepcionistas', function (req, res) {
		application.app.controllers.recepcionistas.recepcionistas(application, req, res);
	});

	//Rotas que leva a uma recepcionista
	application.get('/recepcionista', function (req, res) {
		application.app.controllers.recepcionistas.recepcionista(application, req, res);
	});
	//Rotas para inserir
	application.post('/recepcionista/save', function (req, res) {
		application.app.controllers.recepcionistas.recepcionista_save(application, req, res);
	});
	//Rotas que leva a uma recepcionista
	application.get('/recepcionista/form_include_recep', function (req, res) {
		application.app.controllers.recepcionistas.form_include_recep(application, req, res);
	});
	
};