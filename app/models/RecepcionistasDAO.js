function RecepcionistaDAO(connection){
	this._connection = connection;
}

RecepcionistaDAO.prototype.getRecepcionistas= function(callback){
	this._connection.query('select * from recepcionistas', callback);
}

RecepcionistaDAO.prototype.getRecepcionista = function(idRecepcionista, callback){
	this._connection.query('select * from recepcionistas where idRecepionista = ' + idRecepcionista.idRecepcionista, callback);
}

RecepcionistaDAO.prototype.saveRecepcionista = function(recepcionista, callback){
	this._connection.query('insert into recepcionistas set ? ', recepcionista, callback)
}

module.exports = function(){
	return RecepcionistaDAO;
}