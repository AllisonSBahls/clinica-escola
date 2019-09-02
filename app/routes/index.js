module.exports = function(application){
    //Inicio
    application.get('/', function(req, res){
        application.app.controllers.index.home(application, req, res);
        //res.render("home/index");

    });
}