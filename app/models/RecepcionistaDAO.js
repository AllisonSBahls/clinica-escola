function RecepcionistaDAO(connection){
	this._connection = connection;
}

RecepcionistaDAO.prototype.getRecepcionistas= function(callback){
	this._connection.query('select * from recepcionistas', callback);
}

module.exports = function(){
	return RecepcionistaDAO;
}