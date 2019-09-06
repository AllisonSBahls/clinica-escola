//module.exports.home = function(application, res, req){
  //  res.render("home/index");
//}
module.exports.home = function(application, req, res){
	res.render("home/login");
}

module.exports.register = function(application, req, res){
	res.render("home/register");
}

//https://github.com/bradtraversy/node_passport_login