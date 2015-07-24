var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null,null,null,
	{dialect: "sqlite", storage: "quiz.sqlite"}
);

// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz;	// exporta definicion de tabla Quiz

// sequeleze.sync() crea e inicializa tabla de preguntas BD
sequeleze.sync().success(function(){ // success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		if(count === 0) {	// la tabla se inicializa solo si está vacia
			Quiz.create({ pregunta: 'Capital de Italia',
							respuesta: 'Roma'
			})
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});
