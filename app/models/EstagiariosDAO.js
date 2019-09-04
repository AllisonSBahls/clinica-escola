function EstagiarioDAO(connection){
	this._connection = connection;
}

EstagiarioDAO.prototype.getEstagiarios= function(callback){
	this._connection.query('select * from estagiarios', callback);
}

EstagiarioDAO.prototype.getEstagiario = function(idEstagiario, callback){
	this._connection.query('select * from estagiarios where idEstagiario = ' + idEstagiario.idEstagiario, callback);
}

EstagiarioDAO.prototype.saveEstagiario = function(estagiario, callback){
	this._connection.query('insert into estagiarios set ? ', estagiario, callback)
}

EstagiarioDAO.prototype.deleteEstagiario = function(idEstagiario, callback){
	this._connection.query('delete from estagiarios where idEstagiario = ' + idEstagiario.idEstagiario, callback);

}

EstagiarioDAO.prototype.updateEstagiario = function(nomeEstagiario, emailEstagiario, telefoneEstagiario, periodo, idEstagiario, callback){
	this._connection.query('update estagiarios set nomeEstagiario=?, emailEstagiario=?, telefoneEstagiario=? where idEstagiario = ?',[nomeEstagiario, emailEstagiario, telefoneEstagiario, idEstagiario], callback)
}
	

module.exports = function(){
	return EstagiarioDAO;
}