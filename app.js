const express = require("express");
const path = require("path");
const bodyParser = require("body-parser"); 
const permissao = require('./app/routes/permissao');
const secretary = require('./app/routes/secretary');
const master = require('./app/routes/master');

const app = express();

//Templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './app/views'));

//Arquivos estáticos
app.use(express.static('./app/public'));

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.use('/permissao', permissao);
app.use('/secretary', secretary);
app.use('/supervisor', master);

//Inicialização do Servidor
app.listen(3000, function(){
	console.log('Servidor ON');
});