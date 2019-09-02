function PacienteDAO(connection){
	this._connection = connection;
}

PacienteDAO.prototype.getPacientes= function(callback){
	this._connection.query('select * from pacientes', callback);
}

PacienteDAO.prototype.getPaciente = function(idPaciente, callback){
	this._connection.query('select * from pacientes where idPaciente = ' + idPaciente.idPaciente, callback);
}

PacienteDAO.prototype.savePaciente = function(paciente, callback){
	this._connection.query('insert into pacientes set ? ', paciente, callback)
}

module.exports = function(){
	return PacienteDAO;
}