
function validateFields(emailUser, email, name, password){

    var erros = [];
    if (emailUser.length > 0) {
        erros.push({ texto: 'E-mail já esta sendo utilizado' })
    }
    if (!name || typeof name == undefined || name == null) {
        erros.push({ texto: 'Nome invalido' })
    }
    if (!email || typeof email == undefined || email == null) {
        erros.push({ texto: 'E-mail invalido' })
    }
    if (!password || typeof password == undefined || password == null) {
        erros.push({ texto: 'Senha invalida' })
    }
    if (erros.length > 0) {
        return erros;
    }

}

function validateFieldsPassword(password, newPassowrd, passwordConfirm){
    var erros = [];
   
    if (erros.length > 0) {
        return erros;
    }
}

module.exports ={
    validateFields,
    validateFieldsPassword
} 