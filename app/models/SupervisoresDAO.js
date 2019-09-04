function SupervisorDAO(connection){
	this._connection = connection;
}

SupervisorDAO.prototype.getSupervisores= function(callback){
	this._connection.query('select * from supervisores', callback);
}

SupervisorDAO.prototype.getSupervisor = function(idSupervisor, callback){
	this._connection.query('select * from supervisores where idSupervisor = ' + idSupervisor.idSupervisor, callback);
}

SupervisorDAO.prototype.saveSupervisor = function(supervisor, callback){
	this._connection.query('insert into supervisores set ? ', supervisor, callback)
}


SupervisorDAO.prototype.deleteSupervisor = function(idSupervisor, callback){
	this._connection.query('delete from supervisores where idSupervisor = ' + idSupervisor.idSupervisor, callback);

}

SupervisorDAO.prototype.updateSupervisor = function(nomeSupervisor, emailSupervisor, telefoneSupervisor, idSupervisor, callback){
	this._connection.query('update supervisores set nomeSupervisor=?, emailSupervisor=?, telefoneSupervisor=? where idSupervisor = ?',[nomeSupervisor, emailSupervisor, telefoneSupervisor, idSupervisor], callback)
}
	

module.exports = function(){
	return SupervisorDAO;
}