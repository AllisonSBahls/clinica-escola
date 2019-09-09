const express = require("express");
const path = require("path");
const bodyParser = require("body-parser"); 
const permissao = require('./app/routes/permissao');
const secretary = require('./app/routes/secretary');
const master = require('./app/routes/master');
const trainee = require('./app/routes/trainee');
const patient = require('./app/routes/patient');
const index = require('./app/routes/index');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./config/auth')(passport);

const app = express();

//Sessões
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
	app.locals.sucess_msg = req.flash('sucess_msg');
	app.locals.error_msg = req.flash('error_msg');
	next();
});

//Templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './app/views'));

//Globais
app.locals.moment = require('moment');

//Arquivos estáticos
app.use(express.static('./app/public'));

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.use('/', index);
app.use('/permissao', permissao);
app.use('/secretary', secretary);
app.use('/supervisor', master);
app.use('/estagiario', trainee);
app.use('/paciente', patient);

//Inicialização do Servidor
app.listen(3000, function(){
	console.log('Servidor ON');
});