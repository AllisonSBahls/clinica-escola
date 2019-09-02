function EstagiarioDAO(connection){
	this._connection = connection;
}

EstagiarioDAO.prototype.getEstagiarios= function(callback){
	this._connection.query('select * from estagiarios', callback);
}

EstagiarioDAO.prototype.getEstagiario = function(idEstagiario, callback){
	this._connection.query('select * from estagiarios where idEstagiario = ' + idEstagiario.idEstagiario, callback);
}

EstagiarioDAO.prototype.saveEstagiarios = function(estagiario, callback){
	this._connection.query('insert into estagiarios set ? ', estagiario, callback)
}

module.exports = function(){
	return EstagiarioDAO;
}