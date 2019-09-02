var app = require('./config/server');
var swaggerJSDoc = require('swagger-jsdoc');

var swaggerDefinition = {
	info: {
	  title: 'Sistema Clinica Escola API',
	  version: '1.0.0',
	  description: 'Documentação do sistema da clinica escola',
	},
	host: 'localhost:3000',
	basePath: '/',
  };

  var options = {
	swaggerDefinition: swaggerDefinition,
	apis: ['./config/UrlMapping.js'], 
  };
  
  // initialize swaggerJSDoc
  var swaggerSpec = swaggerJSDoc(options);

// route for swagger.json
app.get('/swagger.json', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});


app.listen(3000, function(){
	console.log('Servidor ON');
});