function SupervisorDAO(connection){
	this._connection = connection;
}

RecepcionistaDAO.prototype.getSupevisores= function(callback){
	this._connection.query('select * from supervisores', callback);
}

RecepcionistaDAO.prototype.getSupervisor = function(idSupervisor, callback){
	this._connection.query('select * from supervisores where idRececpionista = ' + idSupervisor.idSupervisor, callback);
}

RecepcionistaDAO.prototype.saveSupervisor = function(supervisor, callback){
	this._connection.query('insert into supervisores set ? ', supervisor, callback)
}

module.exports = function(){
	return RecepcionistaDAO;
}