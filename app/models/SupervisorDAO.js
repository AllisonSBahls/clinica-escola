function SupervisorDAO(connection){
	this._connection = connection;
}

SupervisorDAO.prototype.getSupevisores= function(callback){
	this._connection.query('select * from supervisores', callback);
}

SupervisorDAO.prototype.getSupervisor = function(idSupervisor, callback){
	this._connection.query('select * from supervisores where idRececpionista = ' + idSupervisor.idSupervisor, callback);
}

SupervisorDAO.prototype.saveSupervisor = function(supervisor, callback){
	this._connection.query('insert into supervisores set ? ', supervisor, callback)
}

module.exports = function(){
	return SupervisorDAO;
}