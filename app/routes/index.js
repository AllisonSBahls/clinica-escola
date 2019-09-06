module.exports = function (application) {
    //Inicio
    application.get('/', function (req, res) {
        application.app.controllers.auth.home(application, req, res);
    });

    application.get('/register', function (req, res) {
        application.app.controllers.auth.register(application, req, res);
    });

    application.post('/register/save', function (req, res) {
        application.app.controllers.auth.register_save(application, req, res);
    });

    application.post('/login', function (req, res) {
        application.app.controllers.auth.login(application, req, res);
    });
}