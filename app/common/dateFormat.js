const moment = require('moment');

function dateFormat(date){
    var newDt = moment(date, "YYYY-MM-DDTHH:mm")
    var datetime = moment(newDt).format('YYYY-MM-DD HH:mm');
    return datetime;
}

module.exports = dateFormat;