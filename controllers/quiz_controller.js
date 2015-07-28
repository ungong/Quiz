var models = require('../models/models.js');

// Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req,res, next, quizId){
	models.Quiz.find(quizId).then( function(quiz) {
		if (quiz){
			req.quiz = quiz;
			next();
		}else{
			next( new Error('No existe quizId=' + quizId));
		}
	});
};

// GET /quizes
exports.index = function(req,res){
	// Si se ha buscado una pregunta
	if(req.query.search){
		busqueda = "%" + req.query.search + "%";	// Delimitar el string a buscar
		busqueda = busqueda.replace(/\s/g,"%"); 	// Remplazar blancos por %
		models.Quiz.findAll({where: ["pregunta like ?", busqueda],order: 'pregunta ASC'}).then(function(quizes) {
			res.render('quizes/index', { quizes: quizes, errors: [] });
		}).catch(function(error) {next(error);})

	}else{	
		// Devolvemos todas las preguntas
		models.Quiz.findAll().then( function(quizes){
			res.render('quizes/index', { quizes: quizes });
		}).catch( function(error){
			next(error);
		})
	}
};

// GET /quizes/:id
exports.show = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', { quiz: req.quiz });
	})
};

// GET /quizes/:id/answer
exports.answer = function(req,res){
	var resultado = 'Incorrecto';	
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado });
};


// GET autor
exports.autor = function(req,res){
	res.render('author');
};


