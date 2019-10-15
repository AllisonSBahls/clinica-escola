const moment = require('moment');

function dateFormat(date){
    var newDt = moment(date, "DD/MM/YYYY HH:mm:ss")
    var datetime = moment(newDt).format('YYYY-MM-DD HH:mm:ss');
    return datetime;
}

module.exports = dateFormat;