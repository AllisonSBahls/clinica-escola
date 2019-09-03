function RecepcionistaDAO(connection){
	this._connection = connection;
}

RecepcionistaDAO.prototype.getRecepcionistas= function(callback){
	this._connection.query('select * from recepcionistas', callback);
}

RecepcionistaDAO.prototype.getRecepcionista = function(idRecepcionista, callback){
	this._connection.query('select * from recepcionistas where idRecepcionista = ' + idRecepcionista.idRecepcionista, callback);
}

RecepcionistaDAO.prototype.saveRecepcionista = function(recepcionista, callback){
	this._connection.query('insert into recepcionistas set ? ', recepcionista, callback);
}

RecepcionistaDAO.prototype.deleteRecepcionista = function(idRecepcionista, callback){
	this._connection.query('delete from recepcionistas where idRecepcionista = ' + idRecepcionista.idRecepcionista, callback);

}

RecepcionistaDAO.prototype.updateRecepcionista = function(nomeRecepcionista, emailRecepcionista, telefoneRecepcionista, idRecepcionista, callback){
	this._connection.query('update recepcionistas set nomeRecepcionista=?, emailRecepcionista=?, telefoneRecepcionista=? where idRecepcionista = ?',[nomeRecepcionista, emailRecepcionista, telefoneRecepcionista, idRecepcionista], callback)
}
	
module.exports = function(){
	return RecepcionistaDAO;
}