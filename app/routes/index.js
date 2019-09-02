module.exports = function(application){
    //Inicio
    application.get('/', function(req, res){
        application.app.controllers.home.index(application, req, res);
    });
}